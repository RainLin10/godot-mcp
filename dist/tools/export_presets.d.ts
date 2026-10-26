import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readExportPresetsSchema: {};
export declare const createExportPresetSchema: {
    name: z.ZodString;
    platform: z.ZodEnum<["Windows Desktop", "Linux", "macOS", "Android", "iOS", "Web"]>;
    export_path: z.ZodOptional<z.ZodString>;
    runnable: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    export_filter: z.ZodDefault<z.ZodOptional<z.ZodEnum<["all_resources", "scenes", "resources", "exclude", "customized"]>>>;
    include_filter: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    exclude_filter: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    custom_features: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    dedicated_server: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const updateExportPresetSchema: {
    preset: z.ZodString;
    export_path: z.ZodOptional<z.ZodString>;
    runnable: z.ZodOptional<z.ZodBoolean>;
    export_filter: z.ZodOptional<z.ZodEnum<["all_resources", "scenes", "resources", "exclude", "customized"]>>;
    include_filter: z.ZodOptional<z.ZodString>;
    exclude_filter: z.ZodOptional<z.ZodString>;
    custom_features: z.ZodOptional<z.ZodString>;
    dedicated_server: z.ZodOptional<z.ZodBoolean>;
    fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const removeExportPresetSchema: {
    preset: z.ZodString;
};
/** Create a new export preset, appending it as the next `[preset.N]`. */
export declare function handleCreateExportPreset(projectRoot: string, args: {
    name: string;
    platform: string;
    export_path?: string;
    runnable?: boolean;
    export_filter?: string;
    include_filter?: string;
    exclude_filter?: string;
    custom_features?: string;
    dedicated_server?: boolean;
    options?: Record<string, string>;
}): ToolResult;
/** Update fields and/or options of an existing export preset. */
export declare function handleUpdateExportPreset(projectRoot: string, args: {
    preset: string;
    export_path?: string;
    runnable?: boolean;
    export_filter?: string;
    include_filter?: string;
    exclude_filter?: string;
    custom_features?: string;
    dedicated_server?: boolean;
    fields?: Record<string, string>;
    options?: Record<string, string>;
}): ToolResult;
/** Remove an export preset and renumber the remaining ones. */
export declare function handleRemoveExportPreset(projectRoot: string, args: {
    preset: string;
}): ToolResult;
export declare function handleReadExportPresets(projectRoot: string): ToolResult;
