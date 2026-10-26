import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const diffSceneSchema: {
    path_a: z.ZodString;
    path_b: z.ZodString;
    ignore_whitespace: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const diffResourceSchema: {
    path_a: z.ZodString;
    path_b: z.ZodString;
    context_lines: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleDiffScene(projectRoot: string, args: {
    path_a: string;
    path_b: string;
    ignore_whitespace?: boolean;
}): ToolResult;
export declare function handleDiffResource(projectRoot: string, args: {
    path_a: string;
    path_b: string;
    context_lines?: number;
}): ToolResult;
export declare const diffScriptSchema: {
    path_a: z.ZodString;
    path_b: z.ZodString;
};
export declare const diffProjectConfigSchema: {
    path_a: z.ZodString;
    path_b: z.ZodString;
};
export declare const diffAnimationSchema: {
    path_a: z.ZodString;
    path_b: z.ZodString;
};
export declare function handleDiffScript(projectRoot: string, args: {
    path_a: string;
    path_b: string;
}): ToolResult;
export declare function handleDiffProjectConfig(projectRoot: string, args: {
    path_a: string;
    path_b: string;
}): ToolResult;
export declare function handleDiffAnimation(projectRoot: string, args: {
    path_a: string;
    path_b: string;
}): ToolResult;
