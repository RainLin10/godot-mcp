import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readGdextensionSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const listCsprojSchema: {};
export declare const createWorldSchema: {
    path: z.ZodString;
    environment_path: z.ZodOptional<z.ZodString>;
};
export declare function handleReadGdextension(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleListCsproj(projectRoot: string): ToolResult;
export declare function handleCreateWorld(projectRoot: string, args: {
    path: string;
    environment_path?: string;
}): ToolResult;
export declare const createGdextensionSchema: {
    path: z.ZodString;
    entry_symbol: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    library_path: z.ZodOptional<z.ZodString>;
};
export declare function handleCreateGdextension(projectRoot: string, args: {
    path: string;
    entry_symbol?: string;
    library_path?: string;
}): ToolResult;
export declare const readCsprojSchema: {
    path: z.ZodString;
};
export declare function handleReadCsproj(projectRoot: string, args: {
    path: string;
}): ToolResult;
