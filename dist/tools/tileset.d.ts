import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listTilesetsSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const readTilesetSchema: {
    path: z.ZodString;
};
export declare const readTilemapSchema: {
    scene_path: z.ZodString;
};
export declare function handleListTilesets(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleReadTileset(projectRoot: string, args: {
    path: string;
}): ToolResult;
export declare function handleReadTilemap(projectRoot: string, args: {
    scene_path: string;
}): ToolResult;
export declare const createTilesetSchema: {
    path: z.ZodString;
    tile_size: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
};
export declare function handleCreateTileset(projectRoot: string, args: {
    path: string;
    tile_size?: number[];
}): ToolResult;
export declare const addTilesetSourceSchema: {
    tileset_path: z.ZodString;
    texture_path: z.ZodString;
    source_id: z.ZodOptional<z.ZodNumber>;
    tile_size: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
    margin: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
    separation: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
};
export declare function handleAddTilesetSource(projectRoot: string, args: {
    tileset_path: string;
    texture_path: string;
    source_id?: number;
    tile_size?: number[];
    margin?: number[];
    separation?: number[];
}): ToolResult;
