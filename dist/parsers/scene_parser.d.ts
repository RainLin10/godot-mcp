import { GodotDocument, SceneOperation } from '../utils/types.js';
/**
 * Parse a .tscn file string into a structured GodotDocument.
 */
export declare function parseScene(content: string): GodotDocument;
/**
 * Serialize a GodotDocument back to .tscn text format.
 */
export declare function serializeScene(doc: GodotDocument): string;
/** 一条被跳过的操作。以前这些跳过是静默的，调用方会误以为改成功了。 */
export interface SceneEditSkip {
    action: string;
    target: string;
    reason: string;
}
/** 操作执行报告（可选传入，用于把「没做成的事」如实回报给用户）。 */
export interface SceneEditReport {
    applied: number;
    skipped: SceneEditSkip[];
}
/**
 * Parse a scene, apply operations, and return the modified string.
 *
 * 传入 `report` 时会记录每次失败/跳过。**必须传**——不传的话「删了一个不存在的
 * 节点」和「真的删掉了」在返回值上完全一样，调用方只能报一个假成功。
 */
export declare function editScene(content: string, operations: SceneOperation[], report?: SceneEditReport): string;
export declare const SCENE_TEMPLATES: Record<string, string>;
export declare function generateSceneTemplate(templateType: string, rootName: string): string;
