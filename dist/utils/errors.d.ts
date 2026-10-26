import { ToolResult } from './types.js';
export declare enum ErrorCode {
    FILE_NOT_FOUND = "FILE_NOT_FOUND",
    PARSE_ERROR = "PARSE_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    PATH_TRAVERSAL = "PATH_TRAVERSAL",
    BINARY_UNSUPPORTED = "BINARY_UNSUPPORTED",
    GODOT_NOT_FOUND = "GODOT_NOT_FOUND",
    GODOT_CLI_ERROR = "GODOT_CLI_ERROR",
    PROCESS_ERROR = "PROCESS_ERROR",
    EDITOR_NOT_REACHABLE = "EDITOR_NOT_REACHABLE",
    EDITOR_COMMAND_FAILED = "EDITOR_COMMAND_FAILED",
    RUNTIME_NOT_REACHABLE = "RUNTIME_NOT_REACHABLE",
    INVALID_ARGUMENT = "INVALID_ARGUMENT",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    READ_ONLY = "READ_ONLY"
}
export interface StructuredError {
    code: ErrorCode;
    message: string;
    detail?: string;
    retry?: boolean;
}
/**
 * Create a structured ToolResult error.
 */
export declare function toolError(code: ErrorCode, message: string, detail?: string): ToolResult;
/**
 * Wrap a caught error in a tool error.
 */
export declare function wrapError(code: ErrorCode, err: unknown, prefix?: string): ToolResult;
/** 标记：由 Godot 侧返回的命令级失败（而非传输/连接失败）。 */
export declare const EDITOR_COMMAND_FAILURE: unique symbol;
export declare function isEditorCommandFailure(err: unknown): boolean;
/** 把 Godot 返回的 `{ error: "..." }` 包装成带标记的 Error。 */
export declare function editorCommandError(method: string, message: string): Error;
/**
 * Create a plain (unstructured) error ToolResult.
 *
 * Keeps the historical `{ content: [{ type: 'text', text }], isError: true }`
 * shape but centralizes construction, so tool handlers don't hand-roll error
 * objects. Prefer `toolError`/`wrapError` (structured, with an ErrorCode) for
 * new code; `plainError` is the drop-in replacement for legacy bare errors.
 */
export declare function plainError(message: string, detail?: string): ToolResult;
