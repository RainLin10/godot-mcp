import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const editorGetSelectionSchema: {};
export declare const editorSetSelectionSchema: {
    node_path: z.ZodString;
    property: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodString>;
};
export declare const editorPlaySchema: {};
export declare const editorStopSchema: {};
export declare const editorUndoSchema: {};
export declare const editorRedoSchema: {};
export declare const editorSaveSchema: {};
export declare const editorGetOpenSceneSchema: {};
export declare const editorOpenAssetSchema: {
    path: z.ZodString;
};
export declare const editorGetInfoSchema: {};
export declare const editorReadCurrentSceneSchema: {};
export declare const editorReloadSceneSchema: {};
export declare const editorAddNodeSchema: {
    type: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const editorRemoveNodeSchema: {
    path: z.ZodString;
};
export declare const editorGetNodePropertiesSchema: {
    path: z.ZodString;
};
export declare const editorSetNodePropertiesSchema: {
    path: z.ZodString;
    properties: z.ZodRecord<z.ZodString, z.ZodString>;
};
export declare const editorRenameNodeSchema: {
    path: z.ZodString;
    name: z.ZodString;
};
export declare const editorDuplicateNodeSchema: {
    path: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
};
export declare const editorReparentNodeSchema: {
    path: z.ZodString;
    new_parent: z.ZodString;
};
export declare const editorMoveNodeSchema: {
    node_path: z.ZodString;
    position: z.ZodString;
};
export declare const editorRunSpecificSceneSchema: {
    scene: z.ZodString;
};
export declare const editorRunGdscriptSchema: {
    code: z.ZodString;
};
export declare const editorCreateScriptSchema: {
    path: z.ZodString;
    extends: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    template: z.ZodOptional<z.ZodString>;
};
export declare const editorAttachScriptSchema: {
    path: z.ZodString;
    script: z.ZodString;
};
export declare const editorSetBreakpointSchema: {
    script: z.ZodString;
    line: z.ZodNumber;
};
export declare const editorRemoveBreakpointSchema: {
    script: z.ZodString;
    line: z.ZodNumber;
};
export declare const editorGetBreakpointsSchema: {};
export declare const editorSaveAllSchema: {};
export declare const editorFocusSchema: {};
export declare const editorOpenDockSchema: {
    dock: z.ZodString;
};
export declare const editorListFilesystemSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    recursive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    pattern: z.ZodOptional<z.ZodString>;
};
export declare const editorHealthCheckSchema: {};
export declare const editorDeleteSelectedSchema: {};
export declare const editorGetRectSchema: {};
export declare const editorShowInFilesystemSchema: {
    path: z.ZodString;
};
export declare function handleEditorGetSelection(): Promise<ToolResult>;
export declare function handleEditorSetSelection(args: {
    node_path: string;
    property?: string;
    value?: string;
}): Promise<ToolResult>;
export declare function handleEditorPlay(): Promise<ToolResult>;
export declare function handleEditorStop(): Promise<ToolResult>;
export declare function handleEditorUndo(): Promise<ToolResult>;
export declare function handleEditorRedo(): Promise<ToolResult>;
export declare function handleEditorSave(): Promise<ToolResult>;
export declare function handleEditorGetOpenScene(): Promise<ToolResult>;
export declare function handleEditorReadCurrentScene(): Promise<ToolResult>;
export declare function handleEditorOpenAsset(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorGetInfo(): Promise<ToolResult>;
export declare function handleEditorReloadScene(): Promise<ToolResult>;
export declare function handleEditorAddNode(args: {
    type: string;
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}): Promise<ToolResult>;
export declare function handleEditorRemoveNode(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorGetNodeProperties(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorSetNodeProperties(args: {
    path: string;
    properties: Record<string, string>;
}): Promise<ToolResult>;
export declare function handleEditorRenameNode(args: {
    path: string;
    name: string;
}): Promise<ToolResult>;
export declare function handleEditorDuplicateNode(args: {
    path: string;
    name?: string;
}): Promise<ToolResult>;
export declare function handleEditorReparentNode(args: {
    path: string;
    new_parent: string;
}): Promise<ToolResult>;
export declare function handleEditorMoveNode(args: {
    node_path: string;
    position: string;
}): Promise<ToolResult>;
export declare function handleEditorRunSpecificScene(args: {
    scene: string;
}): Promise<ToolResult>;
export declare function handleEditorRunGdscript(args: {
    code: string;
}): Promise<ToolResult>;
export declare function handleEditorCreateScript(args: {
    path: string;
    extends?: string;
    template?: string;
}): Promise<ToolResult>;
export declare function handleEditorAttachScript(args: {
    path: string;
    script: string;
}): Promise<ToolResult>;
export declare function handleEditorSetBreakpoint(args: {
    script: string;
    line: number;
}): Promise<ToolResult>;
export declare function handleEditorRemoveBreakpoint(args: {
    script: string;
    line: number;
}): Promise<ToolResult>;
export declare function handleEditorGetBreakpoints(): Promise<ToolResult>;
export declare function handleEditorSaveAll(): Promise<ToolResult>;
export declare function handleEditorFocus(): Promise<ToolResult>;
export declare function handleEditorOpenDock(args: {
    dock: string;
}): Promise<ToolResult>;
export declare function handleEditorListFilesystem(args: {
    path?: string;
    recursive?: boolean;
    pattern?: string;
}): Promise<ToolResult>;
export declare function handleEditorHealthCheck(): Promise<ToolResult>;
export declare function handleEditorDeleteSelected(): Promise<ToolResult>;
export declare function handleEditorGetRect(): Promise<ToolResult>;
export declare function handleEditorShowInFilesystem(args: {
    path: string;
}): Promise<ToolResult>;
export declare const editorCreateSceneSchema: {
    path: z.ZodString;
    root_type: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    root_name: z.ZodOptional<z.ZodString>;
};
export declare const editorInstantiateSceneSchema: {
    scene: z.ZodString;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
};
export declare const editorSetMainSceneSchema: {
    scene: z.ZodString;
};
export declare const editorDebugContinueSchema: {};
export declare const editorDebugStepSchema: {};
export declare const editorDebugStepOverSchema: {};
export declare const editorDebugBreakSchema: {};
export declare const editorGetStackTraceSchema: {};
export declare const editorGetDebugVariablesSchema: {};
export declare const editorEvaluateExpressionSchema: {
    expression: z.ZodString;
};
export declare const editorGetEditorSettingSchema: {
    key: z.ZodString;
};
export declare const editorSetEditorSettingSchema: {
    key: z.ZodString;
    value: z.ZodString;
};
export declare const editorGetProjectSettingSchema: {
    key: z.ZodString;
};
export declare const editorSetProjectSettingSchema: {
    key: z.ZodString;
    value: z.ZodString;
};
export declare const editorConnectSignalSchema: {
    node: z.ZodString;
    signal: z.ZodString;
    target: z.ZodOptional<z.ZodString>;
    method: z.ZodString;
};
export declare const editorDisconnectSignalSchema: {
    node: z.ZodString;
    signal: z.ZodString;
    target: z.ZodOptional<z.ZodString>;
    method: z.ZodOptional<z.ZodString>;
};
export declare const editorListNodeSignalsSchema: {
    node: z.ZodString;
};
export declare const editorGetSceneChangesSchema: {};
export declare const editorGetRecentScenesSchema: {};
export declare const editorGetProjectDirectorySchema: {};
export declare const editorSimulateKeySchema: {
    key: z.ZodString;
    modifiers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
};
export declare const editorGetPluginListSchema: {};
export declare const editorEnablePluginSchema: {
    plugin: z.ZodString;
};
export declare const editorDisablePluginSchema: {
    plugin: z.ZodString;
};
export declare const editorTakeScreenshotSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare function handleEditorCreateScene(args: {
    path: string;
    root_type?: string;
    root_name?: string;
}): Promise<ToolResult>;
export declare function handleEditorInstantiateScene(args: {
    scene: string;
    parent?: string;
    name?: string;
}): Promise<ToolResult>;
export declare function handleEditorSetMainScene(args: {
    scene: string;
}): Promise<ToolResult>;
export declare function handleEditorDebugContinue(): Promise<ToolResult>;
export declare function handleEditorDebugStep(): Promise<ToolResult>;
export declare function handleEditorDebugStepOver(): Promise<ToolResult>;
export declare function handleEditorDebugBreak(): Promise<ToolResult>;
export declare function handleEditorGetStackTrace(): Promise<ToolResult>;
export declare function handleEditorGetDebugVariables(): Promise<ToolResult>;
export declare function handleEditorEvaluateExpression(args: {
    expression: string;
}): Promise<ToolResult>;
export declare function handleEditorGetEditorSetting(args: {
    key: string;
}): Promise<ToolResult>;
export declare function handleEditorSetEditorSetting(args: {
    key: string;
    value: string;
}): Promise<ToolResult>;
export declare function handleEditorGetProjectSetting(args: {
    key: string;
}): Promise<ToolResult>;
export declare function handleEditorSetProjectSetting(args: {
    key: string;
    value: string;
}): Promise<ToolResult>;
export declare function handleEditorConnectSignal(args: {
    node: string;
    signal: string;
    target?: string;
    method: string;
}): Promise<ToolResult>;
export declare function handleEditorDisconnectSignal(args: {
    node: string;
    signal: string;
    target?: string;
    method?: string;
}): Promise<ToolResult>;
export declare function handleEditorListNodeSignals(args: {
    node: string;
}): Promise<ToolResult>;
export declare function handleEditorGetSceneChanges(): Promise<ToolResult>;
export declare function handleEditorGetRecentScenes(): Promise<ToolResult>;
export declare function handleEditorGetProjectDirectory(): Promise<ToolResult>;
export declare function handleEditorSimulateKey(args: {
    key: string;
    modifiers?: Record<string, boolean>;
}): Promise<ToolResult>;
export declare function handleEditorGetPluginList(): Promise<ToolResult>;
export declare function handleEditorEnablePlugin(args: {
    plugin: string;
}): Promise<ToolResult>;
export declare function handleEditorDisablePlugin(args: {
    plugin: string;
}): Promise<ToolResult>;
export declare function handleEditorTakeScreenshot(args: {
    path?: string;
}): Promise<ToolResult>;
export declare const editorGetClassListSchema: {
    filter: z.ZodOptional<z.ZodString>;
    extends: z.ZodOptional<z.ZodString>;
};
export declare const editorGetMethodListSchema: {
    class: z.ZodString;
};
export declare const editorGetClassPropertyListSchema: {
    class: z.ZodString;
};
export declare const editorGetClassSignalListSchema: {
    class: z.ZodString;
};
export declare const editorGetClassDocSchema: {
    class: z.ZodString;
};
export declare const editorSearchHelpSchema: {
    query: z.ZodString;
};
export declare const editorCreateFolderSchema: {
    path: z.ZodString;
};
export declare const editorDeleteAssetSchema: {
    path: z.ZodString;
};
export declare const editorRenameAssetSchema: {
    from: z.ZodString;
    to: z.ZodString;
};
export declare const editorMoveAssetSchema: {
    from: z.ZodString;
    to: z.ZodString;
};
export declare const editorDuplicateAssetSchema: {
    from: z.ZodString;
    to: z.ZodString;
};
export declare const editorGetEditorCameraSchema: {};
export declare const editorSetEditorCameraSchema: {
    position: z.ZodString;
};
export declare const editorToggleGridSchema: {};
export declare const editorToggleSnapSchema: {};
export declare const editorGetAutoloadListSchema: {};
export declare const editorAddAutoloadSchema: {
    name: z.ZodString;
    path: z.ZodString;
};
export declare const editorRemoveAutoloadSchema: {
    name: z.ZodString;
};
export declare const editorGetInputMapSchema: {};
export declare const editorAddInputActionSchema: {
    name: z.ZodString;
    deadzone: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const editorRemoveInputActionSchema: {
    name: z.ZodString;
};
export declare const editorGetErrorListSchema: {};
export declare const editorClearErrorsSchema: {};
export declare const editorReimportAssetSchema: {
    path: z.ZodString;
};
export declare const editorBakeLightmapsSchema: {};
export declare const editorBakeNavigationSchema: {};
export declare const editorGetRunningSceneTreeSchema: {};
export declare const editorGetPerformanceMonitorsSchema: {};
export declare const editorGetDependencyListSchema: {
    path: z.ZodString;
};
export declare function handleEditorGetClassList(args: {
    filter?: string;
    extends?: string;
}): Promise<ToolResult>;
export declare function handleEditorGetMethodList(args: {
    class: string;
}): Promise<ToolResult>;
export declare function handleEditorGetClassPropertyList(args: {
    class: string;
}): Promise<ToolResult>;
export declare function handleEditorGetClassSignalList(args: {
    class: string;
}): Promise<ToolResult>;
export declare function handleEditorGetClassDoc(args: {
    class: string;
}): Promise<ToolResult>;
export declare function handleEditorSearchHelp(args: {
    query: string;
}): Promise<ToolResult>;
export declare function handleEditorCreateFolder(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorDeleteAsset(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorRenameAsset(args: {
    from: string;
    to: string;
}): Promise<ToolResult>;
export declare function handleEditorMoveAsset(args: {
    from: string;
    to: string;
}): Promise<ToolResult>;
export declare function handleEditorDuplicateAsset(args: {
    from: string;
    to: string;
}): Promise<ToolResult>;
export declare function handleEditorGetEditorCamera(): Promise<ToolResult>;
export declare function handleEditorSetEditorCamera(args: {
    position: string;
}): Promise<ToolResult>;
export declare function handleEditorToggleGrid(): Promise<ToolResult>;
export declare function handleEditorToggleSnap(): Promise<ToolResult>;
export declare function handleEditorGetAutoloadList(): Promise<ToolResult>;
export declare function handleEditorAddAutoload(args: {
    name: string;
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorRemoveAutoload(args: {
    name: string;
}): Promise<ToolResult>;
export declare function handleEditorGetInputMap(): Promise<ToolResult>;
export declare function handleEditorAddInputAction(args: {
    name: string;
    deadzone?: number;
}): Promise<ToolResult>;
export declare function handleEditorRemoveInputAction(args: {
    name: string;
}): Promise<ToolResult>;
export declare function handleEditorGetErrorList(): Promise<ToolResult>;
export declare function handleEditorClearErrors(): Promise<ToolResult>;
export declare function handleEditorReimportAsset(args: {
    path: string;
}): Promise<ToolResult>;
export declare function handleEditorBakeLightmaps(): Promise<ToolResult>;
export declare function handleEditorBakeNavigation(): Promise<ToolResult>;
export declare function handleEditorGetRunningSceneTree(): Promise<ToolResult>;
export declare function handleEditorGetPerformanceMonitors(): Promise<ToolResult>;
export declare function handleEditorGetDependencyList(args: {
    path: string;
}): Promise<ToolResult>;
export declare const editorCutSchema: {};
export declare const editorCopySchema: {};
export declare const editorPasteSchema: {
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const editorPauseSchema: {};
export declare const editorUnpauseSchema: {};
export declare function handleEditorCut(): Promise<ToolResult>;
export declare function handleEditorCopy(): Promise<ToolResult>;
export declare function handleEditorPaste(args: {
    parent?: string;
}): Promise<ToolResult>;
export declare function handleEditorPause(): Promise<ToolResult>;
export declare function handleEditorUnpause(): Promise<ToolResult>;
export declare const editorSetCharacterBodyParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetCharacterBodyParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetAnimatedSpriteParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetAnimatedSpriteParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetAudioPlayerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetAudioPlayerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetVideoPlayerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetVideoPlayerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetParallaxParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetParallaxParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetRichTextParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetRichTextParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetContainerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetContainerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetTabContainerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetTabContainerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetCameraParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetCameraParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetParticlesParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetParticlesParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetViewportParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetViewportParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetAreaParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetAreaParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetDecalParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetDecalParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetOccluderParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetOccluderParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetMarkerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetMarkerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetSoftBodyParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetSoftBodyParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetAudioListenerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetAudioListenerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetMultiplayerSpawnerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetMultiplayerSpawnerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorSetMultiplayerSynchronizerParamSchema: {
    node_path: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const handleEditorSetMultiplayerSynchronizerParam: (args: {
    node_path: string;
    param: string;
    value: string;
}) => Promise<ToolResult>;
export declare const editorCreateCameraSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateCamera: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateMeshInstanceSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateMeshInstance: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateMultiplayerSpawnerSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateMultiplayerSpawner: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateMultiplayerSynchronizerSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateMultiplayerSynchronizer: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateCsgBoxSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateCsgBox: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateCsgSphereSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateCsgSphere: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateCsgCylinderSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateCsgCylinder: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateCsgMergeSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateCsgMerge: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateCsgPolygonSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateCsgPolygon: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorCreateGpuParticlesSchema: {
    name: z.ZodOptional<z.ZodString>;
    parent: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const handleEditorCreateGpuParticles: (args: {
    name?: string;
    parent?: string;
    properties?: Record<string, string>;
}) => Promise<ToolResult>;
export declare const editorSaveSceneAsSchema: {
    path: z.ZodString;
    with_preview: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleEditorSaveSceneAs(args: {
    path: string;
    with_preview?: boolean;
}): Promise<ToolResult>;
export declare const editorCloseSceneSchema: {};
export declare function handleEditorCloseScene(): Promise<ToolResult>;
export declare const editorGetOpenScenesSchema: {};
export declare function handleEditorGetOpenScenes(): Promise<ToolResult>;
export declare const editorGetUnsavedScenesSchema: {};
export declare function handleEditorGetUnsavedScenes(): Promise<ToolResult>;
export declare const editorMarkSceneUnsavedSchema: {};
export declare function handleEditorMarkSceneUnsaved(): Promise<ToolResult>;
export declare const editorPlayCurrentSceneSchema: {};
export declare function handleEditorPlayCurrentScene(): Promise<ToolResult>;
export declare const editorGetPlayingSceneSchema: {};
export declare function handleEditorGetPlayingScene(): Promise<ToolResult>;
export declare const editorGetFilesystemSelectionSchema: {};
export declare function handleEditorGetFilesystemSelection(): Promise<ToolResult>;
export declare const editorOpenScriptAtLineSchema: {
    path: z.ZodString;
    line: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    column: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    grab_focus: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleEditorOpenScriptAtLine(args: {
    path: string;
    line?: number;
    column?: number;
    grab_focus?: boolean;
}): Promise<ToolResult>;
export declare const editorShowToastSchema: {
    message: z.ZodString;
    severity: z.ZodDefault<z.ZodOptional<z.ZodEnum<["info", "warning", "error"]>>>;
    tooltip: z.ZodOptional<z.ZodString>;
};
export declare function handleEditorShowToast(args: {
    message: string;
    severity?: string;
    tooltip?: string;
}): Promise<ToolResult>;
export declare const editorSetDistractionFreeSchema: {
    enabled: z.ZodOptional<z.ZodBoolean>;
};
export declare function handleEditorSetDistractionFree(args: {
    enabled?: boolean;
}): Promise<ToolResult>;
export declare const editorSetMovieMakerSchema: {
    enabled: z.ZodOptional<z.ZodBoolean>;
};
export declare function handleEditorSetMovieMaker(args: {
    enabled?: boolean;
}): Promise<ToolResult>;
export declare const editorGet3dSnapSchema: {};
export declare function handleEditorGet3dSnap(): Promise<ToolResult>;
export declare const editorGetPathsSchema: {};
export declare function handleEditorGetPaths(): Promise<ToolResult>;
export declare const editorRestartSchema: {
    confirm: z.ZodBoolean;
    save: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
export declare function handleEditorRestart(args: {
    confirm: boolean;
    save?: boolean;
}): Promise<ToolResult>;
export declare const editorIsPlayingSchema: {};
export declare function handleEditorIsPlaying(): Promise<ToolResult>;
export declare const editorSelectNodeSchema: {
    node_path: z.ZodString;
    property: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodString>;
};
export declare function handleEditorSelectNode(args: {
    node_path: string;
    property?: string;
    value?: string;
}): Promise<ToolResult>;
