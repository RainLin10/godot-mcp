import { FileEntry, SearchMatch } from './types.js';
/**
 * 报告一处「被跳过的路径」。文件遍历里单个目录/文件不可读时跳过本身是合理的
 * （一个坏子目录不该让整次列举失败），但**不能静默**——否则权限/IO 错误会被
 * 伪装成「目录里什么都没有」，用户拿到少了一半的结果还以为成功了。
 * 走 stderr（MCP 的 stdout 是 JSON-RPC 通道，绝不能污染）。
 */
export declare function warnSkippedPath(target: string, err: unknown, what?: string): void;
/**
 * Find the Godot project root by looking for project.godot
 * Searches cwd first, then parent directories, then subdirectories.
 */
export declare function findProjectRoot(startDir?: string): string | null;
/**
 * Resolve a project-relative path to an absolute path.
 */
export declare function resolveProjectPath(projectRoot: string, relativePath: string): string;
/**
 * 判断 target 是否落在 root 之内（两侧都按真实路径比较，符号链接、大小写、
 * /var↔/private/var 都会被正确归一到同一形态）。
 */
export declare function isPathWithin(root: string, target: string): boolean;
/**
 * 把「用户数据目录」下的路径限制在该目录内（供日志等 user:// 场景复用）。
 * 与 resolveProjectPath 同样的思路：拒绝绝对路径、解析真实路径后校验前缀。
 */
export declare function resolveWithin(root: string, relativePath: string, label?: string): string;
/**
 * List files in a directory with optional glob filtering.
 */
export declare function listFiles(projectRoot: string, subPath?: string, pattern?: string, recursive?: boolean): FileEntry[];
/**
 * Search for text across all files in the project.
 */
export declare function searchInProject(projectRoot: string, query: string, pattern?: string, maxResults?: number): SearchMatch[];
/**
 * Read a text file, returning content and metadata.
 */
export declare function readTextFile(absolutePath: string): {
    content: string;
    totalLines: number;
    size: number;
};
/**
 * Get lines from a file, optionally with start/limit.
 */
export declare function readFileLines(absolutePath: string, lineStart?: number, lineCount?: number): {
    lines: string[];
    totalLines: number;
};
/**
 * Normalise a user-supplied resource path to the `res://` form Godot stores.
 *
 * Every MCP tool takes project-relative paths, but `[ext_resource path=...]`
 * is resolved by the engine RELATIVE TO THE REFERRING FILE when it lacks the
 * `res://` prefix. Writing "resources/mat.tres" into "scenes/main.tscn" therefore
 * silently points at "res://scenes/resources/mat.tres" and the reference dies.
 * Always run external references through this.
 */
export declare function toResPath(inputPath: string): string;
/**
 * Write content to a file, optionally creating a backup.
 */
export declare function writeTextFile(absolutePath: string, content: string, createBackup?: boolean): void;
/**
 * Recursively find files matching an extension.
 */
export declare function findFilesByExtension(projectRoot: string, extensions: string[], subPath?: string, recursive?: boolean): string[];
/**
 * Safely delete a file with backup.
 */
export declare function deleteFile(projectRoot: string, relativePath: string): void;
/**
 * Move/rename a file within the project.
 */
export declare function moveFile(projectRoot: string, sourcePath: string, destPath: string): void;
