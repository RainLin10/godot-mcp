import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listAllSignalsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    signal_name: z.ZodOptional<z.ZodString>;
};
export declare const readProjectIconSchema: {};
export declare const readStyleboxSchema: {
    path: z.ZodString;
};
export declare const createAtlasTextureSchema: {
    path: z.ZodString;
    atlas_texture: z.ZodString;
    region: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
};
export declare const listPopupsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const generateCohesionReportSchema: {};
export declare function handleListAllSignals(projectRoot: string, args: {
    scene_path?: string;
    signal_name?: string;
}): ToolResult;
export declare function handleReadProjectIcon(projectRoot: string): ToolResult;
export declare function handleReadStylebox(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleCreateAtlasTexture(projectRoot: string, args: {
    path: string;
    atlas_texture: string;
    region?: number[];
}): ToolResult;
export declare function handleListPopups(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleGenerateCohesionReport(projectRoot: string): ToolResult;
export declare const createThemeSchema: {
    path: z.ZodString;
    default_font_size: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleCreateTheme(projectRoot: string, args: {
    path: string;
    default_font_size?: number;
}): ToolResult;
export declare const addThemeTypeSchema: {
    theme_path: z.ZodString;
    type: z.ZodString;
    font_size: z.ZodOptional<z.ZodNumber>;
    font_color: z.ZodOptional<z.ZodString>;
};
export declare function handleAddThemeType(projectRoot: string, args: {
    theme_path: string;
    type: string;
    font_size?: number;
    font_color?: string;
}): ToolResult;
export declare const setStyleboxSchema: {
    theme_path: z.ZodString;
    type: z.ZodString;
    state: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bg_color: z.ZodOptional<z.ZodString>;
    border_color: z.ZodOptional<z.ZodString>;
    border_width: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    corner_radius: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    content_margin: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
};
export declare function handleSetStylebox(projectRoot: string, args: {
    theme_path: string;
    type: string;
    state?: string;
    bg_color?: string;
    border_color?: string;
    border_width?: number[];
    corner_radius?: number[];
    content_margin?: number[];
}): ToolResult;
