import { z } from 'zod';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { sendEditorCommand } from './editor_bridge.js';
import { WRITE_TOOLS } from '../utils/registry.js';

const jobs = new Map();
const recentTimings = [];
const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
export function recordToolTiming(name, timing) {
    recentTimings.push({ tool: name, ...timing });
    if (recentTimings.length > 64) recentTimings.shift();
}
function reply(data, isError = false) {
    return { content: [{ type: 'text', text: JSON.stringify(data) }],
        structuredContent: data, isError };
}
function snapshot(job) {
    return { id: job.id, type: job.type, status: job.status, completed: job.completed,
        total: job.total, results: job.results, error: job.error ?? null,
        elapsed_ms: job.elapsed_ms ?? Math.round(performance.now() - job.started),
        cancel_requested: job.cancelRequested, saved: job.saved ?? false };
}
function startJob(type, total, work) {
    for (const [id, job] of jobs) {
        if (job.finished && Date.now() - job.finished > 600000) jobs.delete(id);
    }
    if (jobs.size >= 64) {
        const old = [...jobs.values()].find(job => job.finished);
        if (old) jobs.delete(old.id); else throw new Error('Too many active jobs');
    }
    const job = { id: randomUUID(), type, status: 'running', completed: 0, total,
        results: [], cancelRequested: false, started: performance.now(), nativeId: null };
    jobs.set(job.id, job);
    setImmediate(async () => {
        try {
            await work(job);
            job.status = job.cancelRequested ? 'cancelled' : 'completed';
        } catch (error) {
            job.status = job.cancelRequested ? 'cancelled' : 'failed';
            job.error = String(error.message ?? error);
        } finally { job.elapsed_ms = Math.round(performance.now() - job.started); job.finished = Date.now(); }
    });
    return reply(snapshot(job));
}
function getJob(id) {
    const job = jobs.get(id);
    if (!job) throw new Error('Unknown or expired job: ' + id);
    return job;
}
async function nativeJob(job, command, args) {
    const started = await sendEditorCommand(command, args);
    job.nativeId = started.job_id;
    for (;;) {
        if (job.cancelRequested) {
            await sendEditorCommand('workflow_job_cancel', { job_id: job.nativeId });
            return;
        }
        const state = await sendEditorCommand('workflow_job_status', { job_id: job.nativeId });
        job.completed = state.completed ?? job.completed;
        if (state.status === 'completed') {
            job.results.push(state.result); job.completed = job.total; return state.result;
        }
        if (state.status === 'failed') { if(state.result) job.results.push(state.result); throw new Error(state.error ?? 'Godot job failed'); }
        if (state.status === 'cancelled') { job.cancelRequested = true; return; }
        await wait(50);
    }
}
const batchCommands = {
    editor_get_node_properties: 'get_node_properties',
    editor_set_node_properties: 'set_node_properties',
    editor_add_node: 'add_node', editor_remove_node: 'remove_node',
    editor_move_node: 'move_node', editor_rename_node: 'rename_node',
    editor_reparent_node: 'reparent_node', editor_instantiate_scene: 'instantiate_scene'
};
export function registerWorkflowTools(registry) {
    const replace = (name, schema, handler, description) => {
        const tool = registry.find(name);
        if (!tool) throw new Error('Missing baseline tool: ' + name);
        Object.assign(tool, { schema, handler, ...(description ? { description } : {}) });
    };
    replace('editor_run_gdscript', {
        code: z.string().min(1),
        mode: z.enum(['expression', 'script']).default('expression'),
        args: z.record(z.unknown()).default({}),
        expected_scene: z.string().optional()
    }, async (_, args) => {
        try { return reply(await sendEditorCommand('run_gdscript', args)); }
        catch (error) { return reply({ error: error.message, details: error.details ?? null }, true); }
    }, 'Execute an expression, or a full RefCounted GDScript with run(context). Context: root, editor, undo, args. Synchronous; scripts must register their own undo actions.');
    replace('editor_take_screenshot', {
        path: z.string().optional(),
        mode: z.enum(['editor', 'viewport_2d', 'region_2d']).default('editor'),
        rect: z.object({ x: z.number(), y: z.number(), width: z.number().positive(), height: z.number().positive() }).optional(),
        size: z.object({ width: z.number().int().min(1).max(2048), height: z.number().int().min(1).max(2048) }).optional()
    }, async (_, args) => {
        try {
            if (args.mode === 'region_2d' && !args.rect) throw new Error('region_2d requires a world-pixel rect');
            const output = args.path ?? path.join(os.tmpdir(), 'godot-mcp', 'screenshots', randomUUID() + '.png');
            if (output.startsWith('res://') || output.startsWith('user://')) {
                args.path = output;
            } else {
                args.path = path.resolve(output); fs.mkdirSync(path.dirname(args.path), { recursive: true });
            }
            const first = await sendEditorCommand('workflow_capture_start', args);
            let state;
            const deadline = performance.now() + 30000;
            do {
                state = await sendEditorCommand('workflow_job_status', { job_id: first.job_id });
                if (state.status !== 'running') break;
                await wait(25);
            } while (performance.now() < deadline);
            if (state.status === 'running') {
                await sendEditorCommand('workflow_job_cancel', { job_id: first.job_id });
                throw new Error('Screenshot timed out');
            }
            if (state.status !== 'completed') throw new Error(state.error ?? state.status);
            const result = reply(state.result);
            result.content.push({ type: 'image', mimeType: 'image/png', data: fs.readFileSync(state.result.path).toString('base64') });
            return result;
        } catch (error) { return reply({ error: error.message }, true); }
    }, 'Capture editor, 2D viewport, or a world-pixel region. Shares the live 2D world without cloning the scene. Returns PNG image and path; defaults to system temp.');
    registry.setCategory('Workflow');
    registry.register({ name: 'editor_batch', description: 'Start ordered editor operations. Stops at the first failure or between steps when cancelled. Keeps existing per-command undo; suppresses per-step autosave. Use save_after to save once at completion. Returns a job id.',
        schema: { save_after: z.boolean().default(false), operations: z.array(z.object({ tool: z.enum(Object.keys(batchCommands)), arguments: z.record(z.unknown()).default({}) })).min(1).max(1000) },
        handler: (_, args) => {
            const operations = args.operations.map(operation => {
                if (!registry.canCall(operation.tool)) throw new Error('Read-only mode blocks ' + operation.tool);
                const tool = registry.find(operation.tool);
                return { tool: operation.tool, args: z.object(tool.schema).parse(operation.arguments) };
            });
            return startJob('batch', operations.length, async job => {
                for (let index = 0; index < operations.length; index++) {
                    if (job.cancelRequested) break;
                    const operation = operations[index];
                    let command = batchCommands[operation.tool];
                    if (operation.tool === 'editor_move_node' && operation.args.position.includes('Vector3')) command = 'move_node_3d';
                    try {
                        const result = await sendEditorCommand(command, { ...operation.args, save: false });
                        if (result.failed_properties?.length) throw new Error('Invalid properties: ' + result.failed_properties.join(', '));
                        job.results.push({ index, tool: operation.tool, result });
                        job.completed++;
                    } catch (error) {
                        job.results.push({ index, tool: operation.tool, error: error.message, may_have_partial_changes: true });
                        throw error;
                    }
                    await wait(0);
                }
                if (!job.cancelRequested && args.save_after) {
                    await sendEditorCommand('save_scene'); job.saved = true;
                }
            });
        } });
    registry.register({ name: 'editor_job_status', description: 'Read batch/import progress and completed results. Jobs expire after ten minutes.',
        schema: { job_id: z.string(), wait_ms: z.number().int().min(0).max(2000).default(0) },
        handler: async (_, args) => { const job = getJob(args.job_id); if (!job.finished && args.wait_ms) await wait(args.wait_ms); return reply(snapshot(job)); } });
    registry.register({ name: 'editor_job_cancel', description: 'Request cancellation between steps. An in-flight Godot command finishes first; already applied operations remain undoable.',
        schema: { job_id: z.string() }, handler: async (_, args) => {
            const job = getJob(args.job_id);
            if (!job.finished) {
                job.cancelRequested = true; job.status = 'cancelling';
                if (job.nativeId) await sendEditorCommand('workflow_job_cancel', { job_id: job.nativeId });
            }
            return reply(snapshot(job));
        } });
    registry.register({ name: 'editor_import_assets', description: 'Scan once and wait for existing res:// assets to become loadable. Returns a cancellable job id and per-path readiness.',
        schema: { paths: z.array(z.string().startsWith('res://')).min(1).max(1000), timeout_ms: z.number().int().min(100).max(60000).default(30000) },
        handler: (_, args) => startJob('import', args.paths.length, job => nativeJob(job, 'workflow_import_start', args)) });
    registry.register({ name: 'editor_tilemap_summary', description: 'Read only a tile rectangle: occupied count, source counts, missing tiles and bounds. At most 65536 cells.',
        schema: { node_path: z.string(), rect: z.object({ x: z.number().int(), y: z.number().int(), width: z.number().int().positive(), height: z.number().int().positive() }) },
        handler: async (_, args) => reply(await sendEditorCommand('workflow_tilemap_summary', args)) });
    registry.register({ name: 'editor_workflow_info', description: 'Read active godot-mcp installation/version/PID, workflow capabilities and recent timing summaries.',
        schema: {}, handler: async () => reply({
            name: 'godot-mcp', version: '1.12.9-workflow.1', source_path: base, pid: process.pid,
            editor: await sendEditorCommand('workflow_info'), recent_timings: recentTimings.slice(-20),
            active_jobs: [...jobs.values()].filter(job => !job.finished).map(snapshot)
        }) });
    for (const name of ['editor_batch', 'editor_job_cancel', 'editor_import_assets']) WRITE_TOOLS.add(name);
}
