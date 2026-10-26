import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listProjectFilesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    pattern: z.ZodOptional<z.ZodString>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const readProjectConfigSchema: {};
export declare const searchInProjectSchema: {
    query: z.ZodString;
    pattern: z.ZodOptional<z.ZodString>;
    max_results: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const readInputMapSchema: {};
export declare const deleteFileSchema: {
    path: z.ZodString;
};
export declare const moveFileSchema: {
    source: z.ZodString;
    destination: z.ZodString;
};
export declare const writeProjectConfigSchema: {
    section: z.ZodString;
    key: z.ZodString;
    value: z.ZodString;
};
export declare const generateProjectReportSchema: {};
export declare const listAutoloadsSchema: {};
export declare const addAutoloadSchema: {
    name: z.ZodString;
    path: z.ZodString;
};
export declare const removeAutoloadSchema: {
    name: z.ZodString;
};
export declare const findUnusedAssetsSchema: {};
export declare const validateProjectSchema: {};
export declare const listGroupsSchema: {};
export declare const duplicateSceneSchema: {
    source: z.ZodString;
    destination: z.ZodString;
};
export declare const duplicateResourceSchema: {
    source: z.ZodString;
    destination: z.ZodString;
};
export declare function handleListProjectFiles(projectRoot: string, args: {
    path?: string;
    pattern?: string;
    recursive?: boolean;
}): ToolResult;
export declare function handleReadProjectConfig(projectRoot: string): ToolResult;
export declare function handleSearchInProject(projectRoot: string, args: {
    query: string;
    pattern?: string;
    max_results?: number;
}): ToolResult;
export declare function handleReadInputMap(projectRoot: string): ToolResult;
export declare const writeInputActionSchema: {
    action: z.ZodString;
    deadzone: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const removeInputActionSchema: {
    action: z.ZodString;
};
export declare const addInputBindingSchema: {
    action: z.ZodString;
    key: z.ZodOptional<z.ZodString>;
    mouse_button: z.ZodOptional<z.ZodNumber>;
    joypad_button: z.ZodOptional<z.ZodNumber>;
    joypad_axis: z.ZodOptional<z.ZodString>;
    device: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleWriteInputAction(projectRoot: string, args: {
    action: string;
    deadzone?: number;
}): ToolResult;
export declare function handleRemoveInputAction(projectRoot: string, args: {
    action: string;
}): ToolResult;
export declare function handleAddInputBinding(projectRoot: string, args: {
    action: string;
    key?: string;
    mouse_button?: number;
    joypad_button?: number;
    joypad_axis?: string;
    device?: number;
}): ToolResult;
export declare function handleDeleteFile(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleMoveFile(projectRoot: string, args: {
    source: string;
    destination: string;
}): ToolResult;
export declare function handleWriteProjectConfig(projectRoot: string, args: {
    section: string;
    key: string;
    value: string;
}): ToolResult;
export declare function handleGenerateProjectReport(projectRoot: string): ToolResult;
export declare function handleListAutoloads(projectRoot: string): ToolResult;
export declare function handleAddAutoload(projectRoot: string, args: {
    name: string;
    path: string;
}): ToolResult;
export declare function handleRemoveAutoload(projectRoot: string, args: {
    name: string;
}): ToolResult;
export declare function handleFindUnusedAssets(projectRoot: string): ToolResult;
export declare function handleValidateProject(projectRoot: string): ToolResult;
export declare function handleListGroups(projectRoot: string): ToolResult;
export declare function handleDuplicateScene(projectRoot: string, args: {
    source: string;
    destination: string;
}): ToolResult;
export declare function handleDuplicateResource(projectRoot: string, args: {
    source: string;
    destination: string;
}): ToolResult;
export declare const createDirectorySchema: {
    path: z.ZodString;
};
export declare function handleCreateDirectory(projectRoot: string, args: {
    path: string;
}): ToolResult;
