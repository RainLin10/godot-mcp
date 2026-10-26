import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const createJointSchema: {
    scene_path: z.ZodString;
    joint_type: z.ZodEnum<["PinJoint2D", "GrooveJoint2D", "DampedSpringJoint2D", "PinJoint3D", "HingeJoint3D", "SliderJoint3D", "ConeTwistJoint3D", "Generic6DOFJoint3D"]>;
    parent_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    name: z.ZodString;
    node_a: z.ZodOptional<z.ZodString>;
    node_b: z.ZodOptional<z.ZodString>;
};
export declare const setJointParamSchema: {
    scene_path: z.ZodString;
    joint_name: z.ZodString;
    param: z.ZodString;
    value: z.ZodString;
};
export declare const listJointsSchema: {
    scene_path: z.ZodOptional<z.ZodString>;
    joint_type: z.ZodOptional<z.ZodString>;
};
export declare function handleCreateJoint(projectRoot: string, args: {
    scene_path: string;
    joint_type: string;
    parent_path?: string;
    name: string;
    node_a?: string;
    node_b?: string;
}): ToolResult;
export declare function handleSetJointParam(projectRoot: string, args: {
    scene_path: string;
    joint_name: string;
    param: string;
    value: string;
}): ToolResult;
export declare function handleListJoints(projectRoot: string, args: {
    scene_path?: string;
    joint_type?: string;
}): ToolResult;
export declare const readJointSchema: {
    scene_path: z.ZodString;
    joint_name: z.ZodOptional<z.ZodString>;
};
export declare const removeJointSchema: {
    scene_path: z.ZodString;
    joint_name: z.ZodString;
};
export declare function handleReadJoint(projectRoot: string, args: {
    scene_path: string;
    joint_name?: string;
}): ToolResult;
export declare function handleRemoveJoint(projectRoot: string, args: {
    scene_path: string;
    joint_name: string;
}): ToolResult;
