import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const runtimePingSchema: {};
export declare const runtimeGetTreeSchema: {};
export declare const runtimeGetNodeSchema: {
    path: z.ZodString;
};
export declare const runtimeSetNodeSchema: {
    path: z.ZodString;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
};
export declare const runtimeCallMethodSchema: {
    path: z.ZodString;
    method: z.ZodString;
    args: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
};
export declare const runtimeEmitSignalSchema: {
    path: z.ZodString;
    signal: z.ZodString;
    args: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
};
export declare const runtimeInputSchema: {
    keycode: z.ZodNumber;
    action: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const runtimeFreezeSchema: {};
export declare const runtimeResumeSchema: {};
export declare const runtimeStepSchema: {
    frames: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const runtimeScreenshotSchema: {
    path: z.ZodOptional<z.ZodString>;
};
export declare function handleRuntimePing(): Promise<ToolResult>;
export declare function handleRuntimeGetTree(): Promise<ToolResult>;
export declare function handleRuntimeGetNode(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleRuntimeSetNode(args: {
    path: string;
    properties: Record<string, string>;
}): Promise<ToolResult>;
export declare function handleRuntimeCallMethod(args: {
    path: string;
    method: string;
    args?: any[];
}): Promise<ToolResult>;
export declare function handleRuntimeEmitSignal(args: {
    path: string;
    signal: string;
    args?: any[];
}): Promise<ToolResult>;
export declare function handleRuntimeInput(args: {
    keycode: number;
    action?: string;
}): Promise<ToolResult>;
export declare function handleRuntimeFreeze(): Promise<ToolResult>;
export declare function handleRuntimeResume(): Promise<ToolResult>;
export declare function handleRuntimeStep(args: {
    frames?: number;
}): Promise<ToolResult>;
export declare function handleRuntimeScreenshot(args: {
    path?: string;
}): Promise<ToolResult>;
