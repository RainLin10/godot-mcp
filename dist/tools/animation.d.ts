import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listAnimationsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readAnimationSchema: {
    scene_path: z.ZodString;
    animation_name: z.ZodOptional<z.ZodString>;
};
export declare const createAnimationSchema: {
    path: z.ZodString;
    length: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    loop_mode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["none", "linear", "ping_pong"]>>>;
};
export declare const setAnimationParamSchema: {
    scene_path: z.ZodString;
    animation_name: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const addAnimationLibrarySchema: {
    scene_path: z.ZodString;
    animation_name: z.ZodString;
    animations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
};
/**
 * List all AnimationPlayer nodes and their animations across scenes.
 */
export declare function handleListAnimations(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
/**
 * Read detailed animation data from a scene's AnimationPlayer.
 */
export declare function handleReadAnimation(projectRoot: string, args: {
    scene_path: string;
    animation_name?: string;
}): ToolResult;
/**
 * Create a new Animation .tres resource file.
 */
export declare function handleCreateAnimation(projectRoot: string, args: {
    path: string;
    length?: number;
    loop_mode?: string;
}): ToolResult;
/**
 * Set a parameter on an animation embedded in a scene.
 */
export declare function handleSetAnimationParam(projectRoot: string, args: {
    scene_path: string;
    animation_name: string;
    param: string;
    value: string;
}): ToolResult;
/**
 * Add an AnimationLibrary reference to an AnimationPlayer node.
 */
export declare function handleAddAnimationLibrary(projectRoot: string, args: {
    scene_path: string;
    animation_name: string;
    animations?: string[];
}): ToolResult;
export declare const addAnimationTrackSchema: {
    scene_path: z.ZodString;
    animation_name: z.ZodString;
    track_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["value", "method", "bezier", "audio", "animation", "blend_shape"]>>>;
    track_path: z.ZodString;
    interp: z.ZodDefault<z.ZodOptional<z.ZodEnum<["linear", "cubic", "nearest"]>>>;
};
export declare const setKeyframeSchema: {
    scene_path: z.ZodString;
    animation_name: z.ZodString;
    track_index: z.ZodNumber;
    time: z.ZodNumber;
    value: z.ZodString;
    easing: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const removeAnimationTrackSchema: {
    scene_path: z.ZodString;
    animation_name: z.ZodString;
    track_index: z.ZodNumber;
};
export declare function handleAddAnimationTrack(projectRoot: string, args: {
    scene_path: string;
    animation_name: string;
    track_type?: string;
    track_path: string;
    interp?: string;
}): ToolResult;
export declare function handleSetKeyframe(projectRoot: string, args: {
    scene_path: string;
    animation_name: string;
    track_index: number;
    time: number;
    value: string;
    easing?: number;
}): ToolResult;
export declare function handleRemoveAnimationTrack(projectRoot: string, args: {
    scene_path: string;
    animation_name: string;
    track_index: number;
}): ToolResult;
export declare const readAnimationTreeSchema: {
    scene_path: z.ZodString;
};
export declare const setAnimationTreeParamSchema: {
    scene_path: z.ZodString;
    tree_name: z.ZodOptional<z.ZodString>;
    param: z.ZodString;
    value: z.ZodString;
};
export declare function handleReadAnimationTree(projectRoot: string, args: {
    scene_path: string;
}): ToolResult;
export declare function handleSetAnimationTreeParam(projectRoot: string, args: {
    scene_path: string;
    tree_name?: string;
    param: string;
    value: string;
}): ToolResult;
