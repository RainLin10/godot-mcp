import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const getUidSchema: {
    path: z.ZodString;
};
export declare const updateProjectUidsSchema: {
    check_only: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const listMissingUidsSchema: {};
export declare function handleGetUid(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleUpdateProjectUids(projectRoot: string, args: {
    check_only?: boolean;
}): ToolResult;
export declare function handleListMissingUids(projectRoot: string): ToolResult;
export declare const fixMissingUidsSchema: {};
export declare function handleFixMissingUids(projectRoot: string): ToolResult;
