import { z } from 'zod';
import { ToolResult, ResourceTemplateType } from '../utils/types.js';
export declare const readResourceSchema: {
    path: z.ZodString;
};
export declare const listResourcesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    type_filter: z.ZodOptional<z.ZodString>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const createResourceSchema: {
    path: z.ZodString;
    type: z.ZodEnum<["StandardMaterial3D", "ORMMaterial3D", "ShaderMaterial", "CanvasItemMaterial", "PhysicalSkyMaterial", "ParticleProcessMaterial", "VisualShader", "FontFile", "StyleBoxFlat", "NavigationMesh", "Animation", "Theme", "Script", "Resource"]>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const writeResourceSchema: {
    path: z.ZodString;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
    create_backup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleReadResource(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleListResources(projectRoot: string, args: {
    path?: string;
    type_filter?: string;
    recursive?: boolean;
}): ToolResult;
export declare function handleCreateResource(projectRoot: string, args: {
    path: string;
    type: ResourceTemplateType;
    properties?: Record<string, string>;
}): ToolResult;
export declare function handleWriteResource(projectRoot: string, args: {
    path: string;
    properties: Record<string, string>;
    create_backup?: boolean;
}): ToolResult;
export declare const listMaterialsSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    type_filter: z.ZodOptional<z.ZodString>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const readMaterialSchema: {
    path: z.ZodString;
};
export declare const setMaterialParamSchema: {
    path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const readThemeSchema: {
    path: z.ZodString;
};
export declare function handleListMaterials(projectRoot: string, args: {
    path?: string;
    type_filter?: string;
    recursive?: boolean;
}): ToolResult;
export declare function handleReadMaterial(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleSetMaterialParam(projectRoot: string, args: {
    path: string;
    param: string;
    value: string;
}): ToolResult;
export declare function handleReadTheme(projectRoot: string, args: {
    path: string;
}): ToolResult;
