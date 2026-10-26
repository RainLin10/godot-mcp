import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const listNavRegionsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
};
export declare const readNavRegionSchema: {
    scene_path: z.ZodString;
    region_name: z.ZodOptional<z.ZodString>;
};
export declare const createNavMeshSchema: {
    path: z.ZodString;
    agent_radius: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    agent_height: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    cell_size: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    cell_height: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleListNavRegions(projectRoot: string, args: {
    scene_path?: string;
}): ToolResult;
export declare function handleReadNavRegion(projectRoot: string, args: {
    scene_path: string;
    region_name?: string;
}): ToolResult;
export declare function handleCreateNavMesh(projectRoot: string, args: {
    path: string;
    agent_radius?: number;
    agent_height?: number;
    cell_size?: number;
    cell_height?: number;
}): ToolResult;
export declare const readNavAgentSchema: {
    scene_path: z.ZodString;
    agent_name: z.ZodOptional<z.ZodString>;
};
export declare const createNavLinkSchema: {
    scene_path: z.ZodString;
    link_type: z.ZodDefault<z.ZodOptional<z.ZodEnum<["NavigationLink3D", "NavigationLink2D"]>>>;
    parent_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    name: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    start: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
    end: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>>;
};
export declare const readNavObstacleSchema: {
    scene_path: z.ZodString;
    obstacle_name: z.ZodOptional<z.ZodString>;
};
export declare function handleReadNavAgent(projectRoot: string, args: {
    scene_path: string;
    agent_name?: string;
}): ToolResult;
export declare function handleCreateNavLink(projectRoot: string, args: {
    scene_path: string;
    link_type?: string;
    parent_path?: string;
    name?: string;
    start?: number[];
    end?: number[];
}): ToolResult;
export declare function handleReadNavObstacle(projectRoot: string, args: {
    scene_path: string;
    obstacle_name?: string;
}): ToolResult;
