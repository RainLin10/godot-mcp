import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const createMeshPrimitiveSchema: {
    path: z.ZodString;
    mesh_type: z.ZodEnum<["BoxMesh", "CapsuleMesh", "CylinderMesh", "PlaneMesh", "PrismMesh", "SphereMesh", "TorusMesh", "QuadMesh", "TextMesh", "RibbonTrailMesh", "TubeTrailMesh"]>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare function handleCreateMeshPrimitive(projectRoot: string, args: {
    path: string;
    mesh_type: string;
    params?: Record<string, string>;
}): ToolResult;
