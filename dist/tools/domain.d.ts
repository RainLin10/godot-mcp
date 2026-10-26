import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readCurveSchema: {
    path: z.ZodString;
};
export declare const createCurveSchema: {
    path: z.ZodString;
    points: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">>;
    bake_resolution: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const readGradientSchema: {
    path: z.ZodString;
};
export declare const createGradientSchema: {
    path: z.ZodString;
    colors: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>, "many">>;
    interpolation_mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["linear", "constant", "cubic"]>>>;
};
export declare const listPathsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readPathSchema: {
    scene_path: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
};
export declare const listSkeletonsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readSkeletonSchema: {
    scene_path: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
};
export declare const readReflectionProbeSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readMultiMeshSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const createNoiseTextureSchema: {
    path: z.ZodString;
    width: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    height: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    seamless: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    noise_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["simplex", "cellular", "perlin", "value"]>>>;
};
export declare function handleReadCurve(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleCreateCurve(projectRoot: string, args: {
    path: string;
    points?: number[][];
    bake_resolution?: number;
}): ToolResult;
export declare function handleReadGradient(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleCreateGradient(projectRoot: string, args: {
    path: string;
    colors?: Record<string, string>[];
    interpolation_mode?: string;
}): ToolResult;
export declare function handleListPaths(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadPath(projectRoot: string, args: {
    scene_path: string;
    name?: string;
}): ToolResult;
export declare function handleListSkeletons(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadSkeleton(projectRoot: string, args: {
    scene_path: string;
    name?: string;
}): ToolResult;
export declare function handleReadReflectionProbe(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadMultiMesh(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleCreateNoiseTexture(projectRoot: string, args: {
    path: string;
    width?: number;
    height?: number;
    seamless?: boolean;
    noise_type?: string;
}): ToolResult;
export declare const createMultimeshSchema: {
    path: z.ZodString;
    instance_count: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    mesh_path: z.ZodOptional<z.ZodString>;
    transform_mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["none", "transform_2d", "transform_3d"]>>>;
};
export declare function handleCreateMultimesh(projectRoot: string, args: {
    path: string;
    instance_count?: number;
    mesh_path?: string;
    transform_mode?: string;
}): ToolResult;
export declare const setSkeletonBonePoseSchema: {
    scene_path: z.ZodString;
    skeleton: z.ZodOptional<z.ZodString>;
    bone: z.ZodString;
    position: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    rotation: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    scale: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
};
export declare function handleSetSkeletonBonePose(projectRoot: string, args: {
    scene_path: string;
    skeleton?: string;
    bone: string;
    position?: number[];
    rotation?: number[];
    scale?: number[];
}): ToolResult;
export declare const writePathCurveSchema: {
    scene_path: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
    points: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    closed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    bake_resolution: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleWritePathCurve(projectRoot: string, args: {
    scene_path: string;
    path?: string;
    points: number[][];
    closed?: boolean;
    bake_resolution?: number;
}): ToolResult;
