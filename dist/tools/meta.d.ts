import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const searchToolsSchema: {
    keyword: z.ZodString;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    write_only: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const getStatusSchema: {
    probe_runtime: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleSearchTools(args: {
    keyword: string;
    limit?: number;
    write_only?: boolean;
}): ToolResult;
export declare function handleGetStatus(args: {
    probe_runtime?: boolean;
}): Promise<ToolResult>;
