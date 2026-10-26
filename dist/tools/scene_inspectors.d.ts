import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readLight2dSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    light_type: z.ZodOptional<z.ZodString>;
};
export declare const setLight2dParamSchema: {
    scene_path: z.ZodString;
    light_name: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare function handleReadLight2d(projectRoot: string, args: {
    scene_path?: string;
    light_type?: string;
}): ToolResult;
export declare function handleSetLight2dParam(projectRoot: string, args: {
    scene_path: string;
    light_name: string;
    param: string;
    value: string;
}): ToolResult;
export declare const createVehicleBodySchema: {
    scene_path: z.ZodString;
    name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    wheels: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        position: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        suspension: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        suspension: number;
        position?: number[] | undefined;
    }, {
        name: string;
        position?: number[] | undefined;
        suspension?: number | undefined;
    }>, "many">>;
};
export declare const readVehicleBodySchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleCreateVehicleBody(projectRoot: string, args: {
    scene_path: string;
    name?: string;
    parent?: string;
    wheels?: {
        name: string;
        position?: number[];
        suspension?: number;
    }[];
}): ToolResult;
export declare function handleReadVehicleBody(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare const createSpringArmSchema: {
    scene_path: z.ZodString;
    name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    length: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const readSpringArmSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleCreateSpringArm(projectRoot: string, args: {
    scene_path: string;
    name?: string;
    parent?: string;
    length?: number;
}): ToolResult;
export declare function handleReadSpringArm(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare const readDecalSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleReadDecal(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare const readOccluderSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleReadOccluder(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare const readMarkerSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    marker_type: z.ZodOptional<z.ZodString>;
};
export declare function handleReadMarker(projectRoot: string, args: {
    scene_path?: string;
    marker_type?: string;
}): ToolResult;
export declare const readAudioStreamSchema: {
    path: z.ZodString;
};
export declare function handleReadAudioStream(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare const createCameraAttributesSchema: {
    path: z.ZodString;
    preset: z.ZodDefault<z.ZodOptional<z.ZodEnum<["practical", "physical"]>>>;
};
export declare function handleCreateCameraAttributes(projectRoot: string, args: {
    path: string;
    preset?: string;
}): ToolResult;
export declare const createSpriteFramesSchema: {
    path: z.ZodString;
    animations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        fps: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        loop: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        loop: boolean;
        fps: number;
    }, {
        name?: string | undefined;
        loop?: boolean | undefined;
        fps?: number | undefined;
    }>, "many">>;
};
export declare const readSpriteFramesSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleCreateSpriteFrames(projectRoot: string, args: {
    path: string;
    animations?: {
        name?: string;
        fps?: number;
        loop?: boolean;
    }[];
}): ToolResult;
export declare function handleReadSpriteFrames(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare const readSoftBodySchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleReadSoftBody(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare const readGridMapSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const createGridMapSchema: {
    scene_path: z.ZodString;
    name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare function handleReadGridMap(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleCreateGridMap(projectRoot: string, args: {
    scene_path: string;
    name?: string;
    parent?: string;
}): ToolResult;
export declare const readAudioListenerSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare function handleReadAudioListener(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
