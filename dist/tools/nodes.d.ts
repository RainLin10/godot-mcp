import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readCharacterBodySchema: {
    scene_path: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
};
export declare const readAnimatedSpriteSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
};
export declare const readAudioPlayerSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readVideoPlayerSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readParallaxSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readRichTextSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
};
export declare const readContainerSchema: {
    scene_path: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
};
export declare const readTabContainerSchema: {
    scene_path: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
};
export declare function handleReadCharacterBody(projectRoot: string, args: {
    scene_path: string;
    name?: string;
}): ToolResult;
export declare function handleReadAnimatedSprite(projectRoot: string, args: {
    scene_path?: string;
    name?: string;
}): ToolResult;
export declare function handleReadAudioPlayer(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadVideoPlayer(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadParallax(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadRichText(projectRoot: string, args: {
    scene_path?: string;
    name?: string;
}): ToolResult;
export declare function handleReadContainer(projectRoot: string, args: {
    scene_path: string;
    name?: string;
}): ToolResult;
export declare function handleReadTabContainer(projectRoot: string, args: {
    scene_path: string;
    name?: string;
}): ToolResult;
