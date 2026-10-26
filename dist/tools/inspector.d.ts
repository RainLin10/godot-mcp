import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listCamerasSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readCameraSchema: {
    scene_path: z.ZodString;
    camera_name: z.ZodOptional<z.ZodString>;
};
export declare const listLightsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    light_type: z.ZodOptional<z.ZodString>;
};
export declare const setLightParamSchema: {
    scene_path: z.ZodString;
    light_name: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const readParticlesSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    particle_type: z.ZodOptional<z.ZodString>;
};
export declare function handleListCameras(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadCamera(projectRoot: string, args: {
    scene_path: string;
    camera_name?: string;
}): ToolResult;
export declare function handleListLights(projectRoot: string, args: {
    scene_path?: string;
    light_type?: string;
}): ToolResult;
export declare function handleSetLightParam(projectRoot: string, args: {
    scene_path: string;
    light_name: string;
    param: string;
    value: string;
}): ToolResult;
export declare function handleReadParticles(projectRoot: string, args: {
    scene_path?: string;
    particle_type?: string;
}): ToolResult;
