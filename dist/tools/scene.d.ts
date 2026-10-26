import { z } from 'zod';
import { ToolResult, SceneOperation, SceneTemplateType } from '../utils/types.js';
export declare const readSceneSchema: {
    path: z.ZodString;
};
export declare const createSceneSchema: {
    path: z.ZodString;
    template: z.ZodEnum<["Node2D", "Control", "Node3D"]>;
    root_name: z.ZodOptional<z.ZodString>;
};
export declare const editSceneSchema: {
    path: z.ZodString;
    operations: z.ZodArray<z.ZodObject<{
        action: z.ZodEnum<["add_node", "modify_node", "remove_node", "add_connection", "remove_connection"]>;
        parent_path: z.ZodOptional<z.ZodString>;
        node_path: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        groups: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        new_name: z.ZodOptional<z.ZodString>;
        signal: z.ZodOptional<z.ZodString>;
        from_node: z.ZodOptional<z.ZodString>;
        to_node: z.ZodOptional<z.ZodString>;
        method_name: z.ZodOptional<z.ZodString>;
        flags: z.ZodOptional<z.ZodNumber>;
        unbinds: z.ZodOptional<z.ZodNumber>;
        clone_source: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        action: "add_node" | "modify_node" | "remove_node" | "add_connection" | "remove_connection";
        name?: string | undefined;
        type?: string | undefined;
        groups?: string[] | undefined;
        signal?: string | undefined;
        flags?: number | undefined;
        unbinds?: number | undefined;
        parent_path?: string | undefined;
        node_path?: string | undefined;
        properties?: Record<string, string> | undefined;
        new_name?: string | undefined;
        from_node?: string | undefined;
        to_node?: string | undefined;
        method_name?: string | undefined;
        clone_source?: string | undefined;
    }, {
        action: "add_node" | "modify_node" | "remove_node" | "add_connection" | "remove_connection";
        name?: string | undefined;
        type?: string | undefined;
        groups?: string[] | undefined;
        signal?: string | undefined;
        flags?: number | undefined;
        unbinds?: number | undefined;
        parent_path?: string | undefined;
        node_path?: string | undefined;
        properties?: Record<string, string> | undefined;
        new_name?: string | undefined;
        from_node?: string | undefined;
        to_node?: string | undefined;
        method_name?: string | undefined;
        clone_source?: string | undefined;
    }>, "many">;
};
export declare const addNodeSchema: {
    scene_path: z.ZodString;
    parent_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    name: z.ZodString;
    type: z.ZodString;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    groups: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
};
export declare const removeNodeSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
};
export declare const modifyNodeSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    new_name: z.ZodOptional<z.ZodString>;
};
export declare const cloneNodeSchema: {
    scene_path: z.ZodString;
    clone_source: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    parent_path: z.ZodOptional<z.ZodString>;
};
export declare const connectSignalSchema: {
    scene_path: z.ZodString;
    signal: z.ZodString;
    from_node: z.ZodString;
    to_node: z.ZodString;
    method_name: z.ZodString;
    flags: z.ZodOptional<z.ZodNumber>;
    unbinds: z.ZodOptional<z.ZodNumber>;
};
export declare const disconnectSignalSchema: {
    scene_path: z.ZodString;
    signal: z.ZodString;
    from_node: z.ZodString;
    to_node: z.ZodString;
    method_name: z.ZodString;
};
export declare const setNodePositionSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    value: z.ZodString;
};
export declare const setNodeRotationSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    value: z.ZodString;
};
export declare const setNodeScaleSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    value: z.ZodString;
};
export declare const listScenesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare const sceneDependencyGraphSchema: {};
export declare const listUiNodesSchema: {
    node_type: z.ZodOptional<z.ZodString>;
    max_results: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const transformNodeSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    position: z.ZodOptional<z.ZodString>;
    rotation: z.ZodOptional<z.ZodString>;
    scale: z.ZodOptional<z.ZodString>;
};
export declare const renameNodeSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    new_name: z.ZodString;
};
export declare const attachScriptSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    script_path: z.ZodString;
};
export declare const setCollisionShapeSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    shape_type: z.ZodEnum<["BoxShape3D", "CapsuleShape3D", "SphereShape3D", "CylinderShape3D", "ConcavePolygonShape3D", "ConvexPolygonShape3D", "BoxShape2D", "CapsuleShape2D", "CircleShape2D", "RectangleShape2D", "SegmentShape2D", "ConvexPolygonShape2D"]>;
    shape_resource_path: z.ZodOptional<z.ZodString>;
};
export declare const findNodesInScenesSchema: {
    node_type: z.ZodOptional<z.ZodString>;
    property_key: z.ZodOptional<z.ZodString>;
    property_value: z.ZodOptional<z.ZodString>;
    group: z.ZodOptional<z.ZodString>;
    signal_name: z.ZodOptional<z.ZodString>;
    max_results: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const searchSceneContentSchema: {
    query: z.ZodString;
    max_results: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleReadScene(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleCreateScene(projectRoot: string, args: {
    path: string;
    template: SceneTemplateType;
    root_name?: string;
}): ToolResult;
export declare function handleEditScene(projectRoot: string, args: {
    path: string;
    operations: SceneOperation[];
}): ToolResult;
export declare function handleListScenes(projectRoot: string, args: {
    path?: string;
    recursive?: boolean;
}): ToolResult;
export declare function handleSceneDependencyGraph(projectRoot: string): ToolResult;
export declare function handleFindNodesInScenes(projectRoot: string, args: {
    node_type?: string;
    property_key?: string;
    property_value?: string;
    group?: string;
    signal_name?: string;
    max_results?: number;
}): ToolResult;
export declare function handleSearchSceneContent(projectRoot: string, args: {
    query: string;
    max_results?: number;
}): ToolResult;
export declare function handleListUiNodes(projectRoot: string, args: {
    node_type?: string;
    max_results?: number;
}): ToolResult;
export declare function handleTransformNode(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    position?: string;
    rotation?: string;
    scale?: string;
}): ToolResult;
export declare function handleRenameNode(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    new_name: string;
}): ToolResult;
export declare function handleAttachScript(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    script_path: string;
}): ToolResult;
export declare function handleSetCollisionShape(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    shape_type: string;
    shape_resource_path?: string;
}): ToolResult;
export declare function handleAddNode(projectRoot: string, args: {
    scene_path: string;
    parent_path?: string;
    name: string;
    type: string;
    properties?: Record<string, string>;
    groups?: string[];
}): ToolResult;
export declare function handleRemoveNode(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
}): ToolResult;
export declare function handleModifyNode(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    properties?: Record<string, string>;
    new_name?: string;
}): ToolResult;
export declare function handleCloneNode(projectRoot: string, args: {
    scene_path: string;
    clone_source: string;
    name?: string;
    parent_path?: string;
}): ToolResult;
export declare function handleConnectSignal(projectRoot: string, args: {
    scene_path: string;
    signal: string;
    from_node: string;
    to_node: string;
    method_name: string;
    flags?: number;
    unbinds?: number;
}): ToolResult;
export declare function handleDisconnectSignal(projectRoot: string, args: {
    scene_path: string;
    signal: string;
    from_node: string;
    to_node: string;
    method_name: string;
}): ToolResult;
export declare function handleSetNodePosition(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    value: string;
}): ToolResult;
export declare function handleSetNodeRotation(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    value: string;
}): ToolResult;
export declare function handleSetNodeScale(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    value: string;
}): ToolResult;
export declare const loadSpriteSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    texture_path: z.ZodString;
};
export declare function handleLoadSprite(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    texture_path: string;
}): ToolResult;
