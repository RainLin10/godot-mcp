import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readTextureInfoSchema: {
    path: z.ZodString;
};
export declare const listTexturesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const createImageTextureSchema: {
    path: z.ZodString;
    source: z.ZodString;
};
export declare const setTextureImportFlagsSchema: {
    path: z.ZodString;
    flags: z.ZodRecord<z.ZodString, z.ZodString>;
};
export declare function handleReadTextureInfo(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleListTextures(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleCreateImageTexture(projectRoot: string, args: {
    path: string;
    source: string;
}): ToolResult;
export declare function handleSetTextureImportFlags(projectRoot: string, args: {
    path: string;
    flags: Record<string, string>;
}): ToolResult;
