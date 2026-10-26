import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export interface UserDirInfo {
    dir: string;
    appName: string;
    custom: boolean;
    customName: string;
    logPath: string;
    logFileAbs: string;
    logDirAbs: string;
    loggingEnabled: boolean;
    maxLogFiles: number;
    /**
     * 非 null 表示 project.godot 里的 log_path 指向沙箱之外（工程根与用户数据目录
     * 都不包含它），已拒绝读取。值是那个被拒绝的原始路径，用于向用户解释。
     */
    sandboxViolation: string | null;
}
/**
 * Resolve everything about a project's user:// directory + log configuration
 * from project.godot alone (no running engine required).
 */
export declare function resolveUserDir(projectRoot: string): UserDirInfo;
export declare const readGameLogSchema: {
    lines: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    level: z.ZodDefault<z.ZodOptional<z.ZodEnum<["all", "error", "warning", "script", "shader"]>>>;
    pattern: z.ZodOptional<z.ZodString>;
    file: z.ZodOptional<z.ZodString>;
    from_start: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const listGameLogsSchema: {};
export declare const clearGameLogsSchema: {
    include_current: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const getUserDataDirSchema: {
    list: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const configureFileLoggingSchema: {
    enabled: z.ZodOptional<z.ZodBoolean>;
    log_path: z.ZodOptional<z.ZodString>;
    max_log_files: z.ZodOptional<z.ZodNumber>;
};
export declare function handleReadGameLog(projectRoot: string, args: {
    lines?: number;
    level?: string;
    pattern?: string;
    file?: string;
    from_start?: boolean;
}): ToolResult;
export declare function handleListGameLogs(projectRoot: string): ToolResult;
export declare function handleClearGameLogs(projectRoot: string, args: {
    include_current?: boolean;
}): ToolResult;
export declare function handleGetUserDataDir(projectRoot: string, args: {
    list?: boolean;
}): ToolResult;
export declare function handleConfigureFileLogging(projectRoot: string, args: {
    enabled?: boolean;
    log_path?: string;
    max_log_files?: number;
}): ToolResult;
