import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readMeshInstanceSchema: {
    scene_path: z.ZodString;
    node_name: z.ZodOptional<z.ZodString>;
};
export declare const setMeshSurfaceMaterialSchema: {
    scene_path: z.ZodString;
    node_name: z.ZodString;
    surface_index: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    material_path: z.ZodString;
};
export declare const readViewportSchema: {
    scene_path: z.ZodString;
    node_name: z.ZodOptional<z.ZodString>;
};
export declare const readAreaSchema: {
    scene_path: z.ZodString;
    node_name: z.ZodOptional<z.ZodString>;
};
export declare const readRaycastSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    ray_type: z.ZodOptional<z.ZodString>;
};
export declare function handleReadMeshInstance(projectRoot: string, args: {
    scene_path: string;
    node_name?: string;
}): ToolResult;
export declare function handleSetMeshSurfaceMaterial(projectRoot: string, args: {
    scene_path: string;
    node_name: string;
    surface_index?: number;
    material_path: string;
}): ToolResult;
export declare function handleReadViewport(projectRoot: string, args: {
    scene_path: string;
    node_name?: string;
}): ToolResult;
export declare function handleReadArea(projectRoot: string, args: {
    scene_path: string;
    node_name?: string;
}): ToolResult;
export declare function handleReadRaycast(projectRoot: string, args: {
    scene_path?: string;
    ray_type?: string;
}): ToolResult;
