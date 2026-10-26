import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const createCollisionPolygonSchema: {
    scene_path: z.ZodString;
    parent_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    points: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
};
export declare const setShapePointsSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodString;
    shape_type: z.ZodOptional<z.ZodEnum<["RectangleShape2D", "CircleShape2D", "CapsuleShape2D", "SegmentShape2D", "ConcavePolygonShape2D", "ConvexPolygonShape2D"]>>;
    points: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">>;
    radius: z.ZodOptional<z.ZodNumber>;
    extents: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
};
export declare function handleCreateCollisionPolygon(projectRoot: string, args: {
    scene_path: string;
    parent_path?: string;
    name?: string;
    points: number[][];
}): ToolResult;
export declare function handleSetShapePoints(projectRoot: string, args: {
    scene_path: string;
    node_path: string;
    shape_type?: string;
    points?: number[][];
    radius?: number;
    extents?: number[];
}): ToolResult;
export declare const readCollisionPolygonSchema: {
    scene_path: z.ZodString;
    node_path: z.ZodOptional<z.ZodString>;
};
export declare const simplifyPolygonSchema: {
    points: z.ZodArray<z.ZodArray<z.ZodNumber, "many">, "many">;
    tolerance: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleReadCollisionPolygon(projectRoot: string, args: {
    scene_path: string;
    node_path?: string;
}): ToolResult;
export declare function handleSimplifyPolygon(projectRoot: string, args: {
    points: number[][];
    tolerance?: number;
}): ToolResult;
