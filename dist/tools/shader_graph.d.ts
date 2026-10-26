import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
/** Shader.Mode enum values as serialized into `mode = N`. */
export declare const SHADER_MODES: Record<string, number>;
/** VisualShader.Type -> serialized stage key, in engine declaration order. */
export declare const STAGE_KEYS: string[];
/** Which stages are legal for each shader mode. */
export declare const MODE_STAGES: Record<number, string[]>;
export declare const createVisualShaderSchema: {
    path: z.ZodString;
    shader_type: z.ZodEnum<["CanvasItem", "Spatial", "Particles", "Sky", "Fog"]>;
};
export declare const addShaderGraphNodeSchema: {
    path: z.ZodString;
    node_type: z.ZodString;
    position: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    shader_stage: z.ZodOptional<z.ZodString>;
};
export declare const removeShaderGraphNodeSchema: {
    path: z.ZodString;
    node_index: z.ZodNumber;
    shader_stage: z.ZodOptional<z.ZodString>;
};
export declare const connectShaderGraphNodesSchema: {
    path: z.ZodString;
    from_node: z.ZodNumber;
    from_port: z.ZodNumber;
    to_node: z.ZodNumber;
    to_port: z.ZodNumber;
    shader_stage: z.ZodOptional<z.ZodString>;
};
export declare const disconnectShaderGraphNodesSchema: {
    path: z.ZodString;
    from_node: z.ZodNumber;
    from_port: z.ZodNumber;
    to_node: z.ZodNumber;
    to_port: z.ZodNumber;
    shader_stage: z.ZodOptional<z.ZodString>;
};
export declare const setShaderNodeParamSchema: {
    path: z.ZodString;
    node_index: z.ZodNumber;
    param: z.ZodString;
    value: z.ZodString;
    shader_stage: z.ZodOptional<z.ZodString>;
};
export declare const listShaderNodeTypesSchema: {
    category: z.ZodOptional<z.ZodString>;
};
export declare const getShaderNodeDefaultsSchema: {
    node_type: z.ZodString;
};
export interface VisualShaderSub {
    type: string;
    id: string;
    props: Record<string, string>;
    order: string[];
}
export interface VisualShaderDoc {
    format: number;
    uid?: string;
    subs: VisualShaderSub[];
    res: Record<string, string>;
    resOrder: string[];
}
/**
 * Parse a VisualShader `.tres` into an editable model.
 * Multi-line property values (e.g. an Expression body) are folded back
 * into a single logical value using bracket/quote balancing.
 */
export declare function parseVisualShaderDoc(content: string): VisualShaderDoc;
/** Serialize back to Godot's exact `.tres` layout. */
export declare function serializeVisualShaderDoc(doc: VisualShaderDoc): string;
export declare function parseConnectionArray(value: string | undefined): number[];
export declare function handleCreateVisualShader(projectRoot: string, args: {
    path: string;
    shader_type: string;
}): ToolResult;
export declare function handleAddShaderGraphNode(projectRoot: string, args: {
    path: string;
    node_type: string;
    position?: number[];
    params?: Record<string, string>;
    shader_stage?: string;
}): ToolResult;
export declare function handleRemoveShaderGraphNode(projectRoot: string, args: {
    path: string;
    node_index: number;
    shader_stage?: string;
}): ToolResult;
export declare function handleConnectShaderGraphNodes(projectRoot: string, args: {
    path: string;
    from_node: number;
    from_port: number;
    to_node: number;
    to_port: number;
    shader_stage?: string;
}): ToolResult;
export declare function handleDisconnectShaderGraphNodes(projectRoot: string, args: {
    path: string;
    from_node: number;
    from_port: number;
    to_node: number;
    to_port: number;
    shader_stage?: string;
}): ToolResult;
export declare function handleSetShaderNodeParam(projectRoot: string, args: {
    path: string;
    node_index: number;
    param: string;
    value: string;
    shader_stage?: string;
}): ToolResult;
export declare function handleListShaderNodeTypes(args: {
    category?: string;
}): ToolResult;
export declare function handleGetShaderNodeDefaults(_projectRoot: string, args: {
    node_type: string;
}): ToolResult;
/** Shared renderer used by `read_visual_shader`. */
export declare function describeVisualShaderDoc(path: string, doc: VisualShaderDoc): string;
