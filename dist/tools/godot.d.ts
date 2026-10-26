import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const getGodotVersionSchema: {};
export declare const launchEditorSchema: {
    project_path: z.ZodOptional<z.ZodString>;
    scene: z.ZodOptional<z.ZodString>;
};
export declare const runProjectSchema: {
    project_path: z.ZodOptional<z.ZodString>;
    scene: z.ZodOptional<z.ZodString>;
    headless: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    debug: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    window_size: z.ZodOptional<z.ZodString>;
};
export declare const monitorOutputSchema: {
    clear: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const exportProjectSchema: {
    preset: z.ZodString;
    output_path: z.ZodString;
    project_path: z.ZodOptional<z.ZodString>;
};
export declare const captureScreenshotSchema: {
    output_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    window_title: z.ZodOptional<z.ZodString>;
    delay: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const stopProjectSchema: {};
export declare const isEditorRunningSchema: {};
export declare function handleGetGodotVersion(): Promise<ToolResult>;
export declare function handleLaunchEditor(projectRoot: string, args: {
    project_path?: string;
    scene?: string;
}): ToolResult;
export declare function handleRunProject(projectRoot: string, args: {
    project_path?: string;
    scene?: string;
    headless?: boolean;
    debug?: boolean;
    window_size?: string;
}): ToolResult;
export declare function handleMonitorOutput(args: {
    clear?: boolean;
}): Promise<ToolResult>;
export declare function handleExportProject(projectRoot: string, args: {
    preset: string;
    output_path: string;
    project_path?: string;
}): ToolResult;
export declare function handleCaptureScreenshot(projectRoot: string, args: {
    output_path?: string;
    window_title?: string;
    delay?: number;
}): Promise<ToolResult>;
export declare function handleStopProject(): ToolResult;
export declare function handleIsEditorRunning(): Promise<ToolResult>;
export declare const listProjectsSchema: {
    directory: z.ZodOptional<z.ZodString>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleListProjects(projectRoot: string, args: {
    directory?: string;
    recursive?: boolean;
}): ToolResult;
