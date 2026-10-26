import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readEnvironmentSchema: {
    path: z.ZodString;
};
export declare const listEnvironmentsSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const createEnvironmentSchema: {
    path: z.ZodString;
    preset: z.ZodDefault<z.ZodOptional<z.ZodEnum<["default", "stylized", "dark", "bright"]>>>;
};
export declare const setEnvironmentParamSchema: {
    path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare function handleReadEnvironment(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleListEnvironments(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleCreateEnvironment(projectRoot: string, args: {
    path: string;
    preset?: string;
}): ToolResult;
export declare function handleSetEnvironmentParam(projectRoot: string, args: {
    path: string;
    param: string;
    value: string;
}): ToolResult;
export declare const createSkySchema: {
    path: z.ZodString;
    material: z.ZodDefault<z.ZodOptional<z.ZodEnum<["procedural", "panorama"]>>>;
};
export declare function handleCreateSky(projectRoot: string, args: {
    path: string;
    material?: string;
}): ToolResult;
export declare const createWorldEnvironmentSchema: {
    path: z.ZodString;
    environment_path: z.ZodOptional<z.ZodString>;
};
export declare function handleCreateWorldEnvironment(projectRoot: string, args: {
    path: string;
    environment_path?: string;
}): ToolResult;
