import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listTranslationsSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const readTranslationSchema: {
    path: z.ZodString;
    filter: z.ZodOptional<z.ZodString>;
};
export declare const createTranslationSchema: {
    path: z.ZodString;
    language: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    keys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
};
export declare function handleListTranslations(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleReadTranslation(projectRoot: string, args: {
    path: string;
    filter?: string;
}): ToolResult;
export declare function handleCreateTranslation(projectRoot: string, args: {
    path: string;
    language?: string;
    keys?: string[];
}): ToolResult;
export declare const writeTranslationSchema: {
    path: z.ZodString;
    language: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    entries: z.ZodRecord<z.ZodString, z.ZodString>;
};
export declare const addTranslationKeySchema: {
    path: z.ZodString;
    key: z.ZodString;
    translations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare function handleWriteTranslation(projectRoot: string, args: {
    path: string;
    language?: string;
    entries: Record<string, string>;
}): ToolResult;
export declare function handleAddTranslationKey(projectRoot: string, args: {
    path: string;
    key: string;
    translations?: Record<string, string>;
}): ToolResult;
export declare const registerTranslationSchema: {
    path: z.ZodString;
};
export declare const unregisterTranslationSchema: {
    path: z.ZodString;
};
export declare const createPoTranslationSchema: {
    path: z.ZodString;
    language: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    entries: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    register: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
/** Register a translation file so Godot loads it at runtime. */
export declare function handleRegisterTranslation(projectRoot: string, args: {
    path: string;
}): ToolResult;
/** Remove a translation file from the project translation list. */
export declare function handleUnregisterTranslation(projectRoot: string, args: {
    path: string;
}): ToolResult;
/**
 * Create a Gettext .po translation file.
 * create_translation only emits .csv, but .po is what Godot's own
 * "Generate POT" localization workflow produces, so this closes that gap.
 */
export declare function handleCreatePoTranslation(projectRoot: string, args: {
    path: string;
    language?: string;
    entries?: Record<string, string>;
    register?: boolean;
}): ToolResult;
