import { GodotDocument, ResourceDocument } from './types.js';
export interface SceneIterationOptions {
    /** 只处理这一个场景（通常来自 `args.scene_path`）；不传则扫描整个工程。 */
    scenePath?: string;
    /** 要遍历的扩展名，默认 `['.tscn']`。 */
    extensions?: string[];
    /** 子目录过滤（透传给 findFilesByExtension）。 */
    subPath?: string;
    recursive?: boolean;
    /**
     * 单个文件读取/解析失败时是否跳过。
     * 默认 `false`：让错误冒泡到调用方的 try/catch，保持与既有实现一致。
     * 传 `true` 时失败的文件会被记一条 stderr 警告后跳过（不会静默）。
     */
    skipErrors?: boolean;
}
/** 解析成文本的场景文档（.tscn）。 */
export declare function forEachScene(projectRoot: string, options: SceneIterationOptions, visit: (doc: GodotDocument, scenePath: string) => void): void;
/** 解析成文本的资源文档（.tres）。 */
export declare function forEachResource(projectRoot: string, options: SceneIterationOptions, visit: (doc: ResourceDocument, resourcePath: string) => void): void;
