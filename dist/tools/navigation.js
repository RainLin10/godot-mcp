// Copyright (c) 2026 FairYan
// SPDX-License-Identifier: AGPL-3.0-or-later
// ============================================================
// Godot MCP Server - Navigation Tools
// ============================================================
//
// NavigationRegion2D/3D nodes and NavigationMesh/2D resources.
import { z } from 'zod';
import { toolError, ErrorCode } from '../utils/errors.js';
import { forEachScene } from '../utils/scene_files.js';
import { forEachNode } from '../utils/scene_walk.js';
import { readTextFile, resolveProjectPath, writeTextFile } from '../utils/file_utils.js';
import { parseScene, serializeScene } from '../parsers/scene_parser.js';
// ---- Tool Schemas ----
export const listNavRegionsSchema = {
    scene_path: z.string().optional().describe('Filter to a specific scene'),
};
export const readNavRegionSchema = {
    scene_path: z.string().describe('Path to .tscn scene'),
    region_name: z.string().optional().describe('Specific NavigationRegion node name'),
};
export const createNavMeshSchema = {
    path: z.string().describe('Output path for NavigationMesh .tres'),
    agent_radius: z.number().optional().default(0.5).describe('Agent radius'),
    agent_height: z.number().optional().default(2.0).describe('Agent height'),
    cell_size: z.number().optional().default(0.25).describe('Voxel cell size'),
    cell_height: z.number().optional().default(0.25).describe('Voxel cell height'),
};
// ---- Tool Handlers ----
export function handleListNavRegions(projectRoot, args) {
    try {
        const regions = [];
        const navMeshRefs = [];
        forEachScene(projectRoot, { scenePath: args.scene_path }, (doc, relPath) => {
            forEachNode(doc.nodes, (node) => {
                if (node.type === 'NavigationRegion3D' || node.type === 'NavigationRegion2D') {
                    const baked = node.properties['bake_navigation_mesh'] === 'true' ||
                        node.properties['navigation_mesh'] !== undefined;
                    regions.push({ scene: relPath, name: node.name, type: node.type, baked });
                    // Check for NavigationMesh reference
                    if (node.properties['navigation_mesh']) {
                        navMeshRefs.push({
                            scene: relPath,
                            name: node.name,
                            meshPath: node.properties['navigation_mesh'],
                        });
                    }
                }
            });
        });
        if (regions.length === 0) {
            return { content: [{ type: 'text', text: 'No NavigationRegion nodes found.' }] };
        }
        const lines = [`Navigation Regions (${regions.length}):`, ''];
        regions.forEach(r => {
            const bakedLabel = r.baked ? ' [baked]' : ' [no mesh]';
            lines.push(`  ${r.scene} → ${r.name} (${r.type})${bakedLabel}`);
        });
        if (navMeshRefs.length > 0) {
            lines.push('');
            lines.push('Navigation Mesh References:');
            navMeshRefs.forEach(m => {
                lines.push(`  ${m.scene}/${m.name} → ${m.meshPath}`);
            });
        }
        return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
    catch (err) {
        return toolError(ErrorCode.INTERNAL_ERROR, `Error: ${err.message}`);
    }
}
export function handleReadNavRegion(projectRoot, args) {
    try {
        const absPath = resolveProjectPath(projectRoot, args.scene_path);
        const { content } = readTextFile(absPath);
        const doc = parseScene(content);
        const regions = [];
        forEachNode(doc.nodes, (node) => {
            if (node.type === 'NavigationRegion3D' || node.type === 'NavigationRegion2D') {
                regions.push(node);
            }
        });
        const region = args.region_name
            ? regions.find(r => r.name === args.region_name)
            : regions[0];
        if (!region) {
            return toolError(ErrorCode.FILE_NOT_FOUND, `Navigation region not found in ${args.scene_path}`);
        }
        const lines = [];
        lines.push(`Navigation Region: ${region.name} (${region.type})`);
        lines.push(`Scene: ${args.scene_path}`);
        lines.push('');
        const is3D = region.type === 'NavigationRegion3D';
        lines.push('Properties:');
        const labels = {
            navigation_layers: 'Navigation layers bitmask',
            bake_navigation_mesh: 'Auto-bake',
            navigation_mesh: is3D ? 'NavigationMesh resource' : 'NavigationPolygon resource',
            enabled: 'Enabled',
            avoidance_enabled: 'Avoidance enabled',
            avoidance_layers: 'Avoidance layers',
        };
        for (const [key, val] of Object.entries(region.properties)) {
            const label = labels[key] ? `  # ${labels[key]}` : '';
            lines.push(`  ${key} = ${val}${label}`);
        }
        // If there's a navigation_mesh ext_resource, try to read it
        const meshRef = region.properties['navigation_mesh'];
        if (meshRef) {
            const extMatch = meshRef.match(/ExtResource\("([^"]+)"\)/);
            if (extMatch) {
                const extResource = doc.extResources.find(e => e.id === extMatch[1]);
                if (extResource) {
                    lines.push('');
                    lines.push(`Mesh Resource: ${extResource.path}`);
                    lines.push(`  Type: ${extResource.type}`);
                }
            }
        }
        return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
    catch (err) {
        return toolError(ErrorCode.INTERNAL_ERROR, `Error: ${err.message}`);
    }
}
export function handleCreateNavMesh(projectRoot, args) {
    try {
        const template = `[gd_resource type="NavigationMesh" format=3 uid=""]

[resource]
agent_radius = ${args.agent_radius ?? 0.5}
agent_height = ${args.agent_height ?? 2.0}
cell_size = ${args.cell_size ?? 0.25}
cell_height = ${args.cell_height ?? 0.25}
`;
        const absPath = resolveProjectPath(projectRoot, args.path);
        writeTextFile(absPath, template, false);
        return {
            content: [{ type: 'text', text: `NavigationMesh created: ${args.path}\n  agent_radius=${args.agent_radius ?? 0.5} agent_height=${args.agent_height ?? 2.0}` }],
        };
    }
    catch (err) {
        return toolError(ErrorCode.INTERNAL_ERROR, `Error: ${err.message}`);
    }
}
// ---- Additional navigation tools (Tier1) ----
export const readNavAgentSchema = {
    scene_path: z.string().describe('Path to .tscn scene'),
    agent_name: z.string().optional().describe('Specific NavigationAgent node name'),
};
export const createNavLinkSchema = {
    scene_path: z.string().describe('Path to .tscn scene file'),
    link_type: z.enum(['NavigationLink3D', 'NavigationLink2D']).optional().default('NavigationLink3D').describe('Link node type'),
    parent_path: z.string().optional().default('.').describe('Parent node path'),
    name: z.string().optional().default('NavigationLink3D').describe('Node name'),
    start: z.array(z.number()).optional().default([0, 0, 0]).describe('Start point [x, y] or [x, y, z]'),
    end: z.array(z.number()).optional().default([0, 0, 0]).describe('End point [x, y] or [x, y, z]'),
};
export const readNavObstacleSchema = {
    scene_path: z.string().describe('Path to .tscn scene'),
    obstacle_name: z.string().optional().describe('Specific NavigationObstacle node name'),
};
const NAV_AGENT_TYPES = ['NavigationAgent2D', 'NavigationAgent3D'];
const NAV_OBSTACLE_TYPES = ['NavigationObstacle2D', 'NavigationObstacle3D'];
function vecLiteral(coords, is3D) {
    if (is3D)
        return `Vector3(${coords[0] ?? 0}, ${coords[1] ?? 0}, ${coords[2] ?? 0})`;
    return `Vector2(${coords[0] ?? 0}, ${coords[1] ?? 0})`;
}
export function handleReadNavAgent(projectRoot, args) {
    try {
        const absPath = resolveProjectPath(projectRoot, args.scene_path);
        const { content } = readTextFile(absPath);
        const doc = parseScene(content);
        const agents = [];
        forEachNode(doc.nodes, (node) => {
            if (NAV_AGENT_TYPES.includes(node.type)) {
                if (!args.agent_name || node.name === args.agent_name)
                    agents.push(node);
            }
        });
        if (agents.length === 0) {
            return { content: [{ type: 'text', text: `No NavigationAgent nodes found${args.agent_name ? ` matching "${args.agent_name}"` : ''}.` }] };
        }
        const labels = {
            pathfinding_layers: 'Pathfinding layers bitmask',
            navigation_layers: 'Navigation layers bitmask',
            avoidance_enabled: 'Avoidance enabled',
            avoidance_layers: 'Avoidance layers',
            radius: 'Agent radius',
            height: 'Agent height',
            max_speed: 'Max speed',
        };
        const lines = [`Navigation Agents (${agents.length}):`, ''];
        for (const a of agents) {
            lines.push(`  ${a.name} (${a.type})`);
            for (const [key, val] of Object.entries(a.properties)) {
                const label = labels[key] ? `  # ${labels[key]}` : '';
                lines.push(`    ${key} = ${val}${label}`);
            }
            lines.push('');
        }
        return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
    catch (err) {
        return toolError(ErrorCode.INTERNAL_ERROR, `Error: ${err.message}`);
    }
}
export function handleCreateNavLink(projectRoot, args) {
    try {
        const absPath = resolveProjectPath(projectRoot, args.scene_path);
        const { content } = readTextFile(absPath);
        const doc = parseScene(content);
        const is3D = args.link_type !== 'NavigationLink2D';
        const newNode = {
            name: args.name || 'NavigationLink3D',
            type: args.link_type || 'NavigationLink3D',
            parent: args.parent_path || '.',
            properties: {
                start: vecLiteral(args.start || [0, 0, 0], is3D),
                end: vecLiteral(args.end || [0, 0, 0], is3D),
            },
            children: [],
        };
        if (!args.parent_path || args.parent_path === '.') {
            doc.nodes.push(newNode);
        }
        else {
            function findAndAdd(nodes, target) {
                for (const node of nodes) {
                    if (node.name === target) {
                        node.children.push(newNode);
                        return true;
                    }
                    if (node.children && findAndAdd(node.children, target))
                        return true;
                }
                return false;
            }
            if (!findAndAdd(doc.nodes, args.parent_path))
                doc.nodes.push(newNode);
        }
        writeTextFile(absPath, serializeScene(doc), true);
        return { content: [{ type: 'text', text: `Navigation link created: ${newNode.name} (${newNode.type}) start=${JSON.stringify(args.start)} end=${JSON.stringify(args.end)}` }] };
    }
    catch (err) {
        return toolError(ErrorCode.INTERNAL_ERROR, `Error: ${err.message}`);
    }
}
export function handleReadNavObstacle(projectRoot, args) {
    try {
        const absPath = resolveProjectPath(projectRoot, args.scene_path);
        const { content } = readTextFile(absPath);
        const doc = parseScene(content);
        const obstacles = [];
        forEachNode(doc.nodes, (node) => {
            if (NAV_OBSTACLE_TYPES.includes(node.type)) {
                if (!args.obstacle_name || node.name === args.obstacle_name)
                    obstacles.push(node);
            }
        });
        if (obstacles.length === 0) {
            return { content: [{ type: 'text', text: `No NavigationObstacle nodes found${args.obstacle_name ? ` matching "${args.obstacle_name}"` : ''}.` }] };
        }
        const lines = [`Navigation Obstacles (${obstacles.length}):`, ''];
        for (const o of obstacles) {
            lines.push(`  ${o.name} (${o.type})`);
            for (const [key, val] of Object.entries(o.properties)) {
                lines.push(`    ${key} = ${val}`);
            }
            lines.push('');
        }
        return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
    catch (err) {
        return toolError(ErrorCode.INTERNAL_ERROR, `Error: ${err.message}`);
    }
}
