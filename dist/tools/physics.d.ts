import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listPhysicsMaterialsSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const readPhysicsMaterialSchema: {
    path: z.ZodString;
};
export declare const createPhysicsMaterialSchema: {
    path: z.ZodString;
    friction: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    bounce: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    absorb: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    rough: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const readCollisionLayersSchema: {};
export declare const writeCollisionLayersSchema: {
    layers_2d: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    layers_3d: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare function handleListPhysicsMaterials(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleReadPhysicsMaterial(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleCreatePhysicsMaterial(projectRoot: string, args: {
    path: string;
    friction?: number;
    bounce?: number;
    absorb?: boolean;
    rough?: boolean;
}): ToolResult;
export declare function handleReadCollisionLayers(projectRoot: string): ToolResult;
export declare function handleWriteCollisionLayers(projectRoot: string, args: {
    layers_2d?: Record<string, string>;
    layers_3d?: Record<string, string>;
}): ToolResult;
