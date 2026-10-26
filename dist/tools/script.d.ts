import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readScriptSchema: {
    path: z.ZodString;
    line_start: z.ZodOptional<z.ZodNumber>;
    line_count: z.ZodOptional<z.ZodNumber>;
};
export declare const writeScriptSchema: {
    path: z.ZodString;
    content: z.ZodString;
    create_backup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const createScriptSchema: {
    path: z.ZodString;
    type: z.ZodEnum<["gdscript", "csharp"]>;
    template: z.ZodDefault<z.ZodOptional<z.ZodEnum<["empty", "node_script", "resource_script", "autoload"]>>>;
    class_name: z.ZodOptional<z.ZodString>;
};
export declare const listScriptsSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["gdscript", "csharp", "all"]>>>;
};
export declare function handleReadScript(projectRoot: string, args: {
    path: string;
    line_start?: number;
    line_count?: number;
}): ToolResult;
export declare function handleWriteScript(projectRoot: string, args: {
    path: string;
    content: string;
    create_backup?: boolean;
}): ToolResult;
export declare function handleCreateScript(projectRoot: string, args: {
    path: string;
    type: string;
    template?: string;
    class_name?: string;
}): ToolResult;
export declare function handleListScripts(projectRoot: string, args: {
    path?: string;
    recursive?: boolean;
    type?: string;
}): ToolResult;
export declare const readShaderSchema: {
    path: z.ZodString;
    line_start: z.ZodOptional<z.ZodNumber>;
    line_count: z.ZodOptional<z.ZodNumber>;
};
export declare const createShaderSchema: {
    path: z.ZodString;
    type: z.ZodEnum<["spatial", "canvas_item", "particles", "sky", "fog"]>;
};
export declare const listShadersSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const writeShaderSchema: {
    path: z.ZodString;
    content: z.ZodString;
    create_backup: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const validateScriptSchema: {
    path: z.ZodString;
};
export declare const readScriptStructureSchema: {
    path: z.ZodString;
};
export declare const searchInScriptsSchema: {
    query: z.ZodString;
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["gdscript", "csharp", "all"]>>>;
    max_results: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const listVisualShadersSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const readVisualShaderSchema: {
    path: z.ZodString;
};
export declare const readShaderIncludeSchema: {
    path: z.ZodString;
};
export declare const createShaderIncludeSchema: {
    path: z.ZodString;
};
export declare const listShaderIncludesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleReadShader(projectRoot: string, args: {
    path: string;
    line_start?: number;
    line_count?: number;
}): ToolResult;
export declare function handleCreateShader(projectRoot: string, args: {
    path: string;
    type: string;
}): ToolResult;
export declare function handleListShaders(projectRoot: string, args: {
    path?: string;
    recursive?: boolean;
}): ToolResult;
export declare function handleWriteShader(projectRoot: string, args: {
    path: string;
    content: string;
    create_backup?: boolean;
}): ToolResult;
export declare function handleValidateScript(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleReadScriptStructure(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleSearchInScripts(projectRoot: string, args: {
    query: string;
    type?: string;
    max_results?: number;
}): ToolResult;
export declare function handleListVisualShaders(projectRoot: string, args: {
    path?: string;
    recursive?: boolean;
}): ToolResult;
export declare function handleReadVisualShader(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleReadShaderInclude(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleCreateShaderInclude(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleListShaderIncludes(projectRoot: string, args: {
    path?: string;
    recursive?: boolean;
}): ToolResult;
export declare const addScriptFunctionSchema: {
    path: z.ZodString;
    func_name: z.ZodEffects<z.ZodString, string, string>;
    params: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
    return_type: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    body: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    after_func: z.ZodOptional<z.ZodString>;
};
export declare const addScriptSignalSchema: {
    path: z.ZodString;
    signal_name: z.ZodEffects<z.ZodString, string, string>;
    params: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>, string[], string[] | undefined>;
};
export declare const addScriptExportSchema: {
    path: z.ZodString;
    var_name: z.ZodEffects<z.ZodString, string, string>;
    var_type: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    default_value: z.ZodOptional<z.ZodString>;
    export_hint: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
};
export declare function handleAddScriptFunction(projectRoot: string, args: {
    path: string;
    func_name: string;
    params?: string[];
    return_type?: string;
    body?: string;
    after_func?: string;
}): ToolResult;
export declare function handleAddScriptSignal(projectRoot: string, args: {
    path: string;
    signal_name: string;
    params?: string[];
}): ToolResult;
export declare function handleAddScriptExport(projectRoot: string, args: {
    path: string;
    var_name: string;
    var_type?: string;
    default_value?: string;
    export_hint?: string;
}): ToolResult;
export declare const validateShaderSchema: {
    path: z.ZodString;
};
export declare const compileShaderSchema: {
    path: z.ZodString;
};
export declare function handleValidateShader(projectRoot: string, args: {
    path: string;
}): ToolResult;
/**
 * Compile (reimport) a shader via the Godot editor plugin.
 * This triggers Godot's built-in shader compiler and reports any compilation errors.
 */
export declare function handleCompileShader(projectRoot: string, args: {
    path: string;
}): Promise<ToolResult>;
