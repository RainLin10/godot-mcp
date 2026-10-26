// Copyright (c) 2026 FairYan
// SPDX-License-Identifier: AGPL-3.0-or-later
// ============================================================
// Godot MCP Server - Scene File Iteration Helper
// ============================================================
// 「列出 .tscn → resolveProjectPath → readTextFile → parseScene → 用 doc 做事」
// 这四行在 20 多个工具里逐字重复（唯一区别是循环变量叫 s / relPath / scenePath）。
// 抽成一处后：
//   - 路径沙箱只在这里发生（新增工具不可能忘记 resolveProjectPath）
//   - 解析失败的处理策略集中在一处，而不是散落的 try/catch
//   - 将来给场景读取加缓存/并发限制只需改这里
import { readTextFile, resolveProjectPath, findFilesByExtension } from './file_utils.js';
import { parseScene } from '../parsers/scene_parser.js';
import { parseResource } from '../parsers/resource_parser.js';
/** 解析成文本的场景文档（.tscn）。 */
export function forEachScene(projectRoot, options, visit) {
    const extensions = options.extensions ?? ['.tscn'];
    const files = options.scenePath
        ? [options.scenePath]
        : findFilesByExtension(projectRoot, extensions, options.subPath ?? '', options.recursive ?? true);
    for (const relPath of files) {
        const parsed = options.skipErrors ? tryParse(projectRoot, relPath) : parseOne(projectRoot, relPath);
        if (parsed)
            visit(parsed, relPath);
    }
}
/** 解析成文本的资源文档（.tres）。 */
export function forEachResource(projectRoot, options, visit) {
    const extensions = options.extensions ?? ['.tres'];
    const files = options.scenePath
        ? [options.scenePath]
        : findFilesByExtension(projectRoot, extensions, options.subPath ?? '', options.recursive ?? true);
    for (const relPath of files) {
        try {
            const absPath = resolveProjectPath(projectRoot, relPath);
            visit(parseResource(readTextFile(absPath).content), relPath);
        }
        catch (err) {
            if (!options.skipErrors)
                throw err;
            warnSkip(relPath, err);
        }
    }
}
function parseOne(projectRoot, relPath) {
    const absPath = resolveProjectPath(projectRoot, relPath);
    return parseScene(readTextFile(absPath).content);
}
function tryParse(projectRoot, relPath) {
    try {
        return parseOne(projectRoot, relPath);
    }
    catch (err) {
        warnSkip(relPath, err);
        return null;
    }
}
function warnSkip(relPath, err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[Godot MCP] Skipped scene "${relPath}": ${msg}`);
}
