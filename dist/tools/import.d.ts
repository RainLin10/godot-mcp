import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readImportConfigSchema: {
    asset_path: z.ZodString;
};
export declare const listImportFilesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    type_filter: z.ZodOptional<z.ZodString>;
};
export declare const writeImportConfigSchema: {
    asset_path: z.ZodString;
    settings: z.ZodRecord<z.ZodString, z.ZodString>;
};
/**
 * Read .import configuration for a specific asset.
 */
export declare function handleReadImportConfig(projectRoot: string, args: {
    asset_path: string;
}): ToolResult;
/**
 * List all .import files in the project, grouped by asset type.
 */
export declare function handleListImportFiles(projectRoot: string, args: {
    path?: string;
    type_filter?: string;
}): ToolResult;
/**
 * Write settings to an asset's .import file.
 */
export declare function handleWriteImportConfig(projectRoot: string, args: {
    asset_path: string;
    settings: Record<string, string>;
}): ToolResult;
