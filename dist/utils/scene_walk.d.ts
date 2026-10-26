import { NodeDefinition } from './types.js';
export type SceneNode = NodeDefinition & Record<string, any>;
/**
 * 深度优先遍历每个节点（父先于子）。
 *
 * `visit` 返回 `false` 表示跳过该节点的子树（仍会继续兄弟节点）。
 *
 * 带循环保护：解析出来的场景树理论上不该有环，但外部传入/手工拼的
 * `children` 引用可能成环，递归会直接爆栈并带崩整个服务器。用一条
 * 祖先链检测，命中即停止深入该分支。
 */
export declare function forEachNode(nodes: SceneNode[], visit: (node: SceneNode) => boolean | void): void;
/**
 * 收集 type 命中 `types` 的所有节点（父先于子）。
 *
 * 语义与原来散落各处的 `walk(nodes, types)` 完全一致：
 *   - `types` 为 `undefined` → 收集**全部**节点
 *   - `types` 为 `[]` → 收集**零个**（空集合不命中任何 type）
 * 这个区分是有意的：既有调用方会把「用户没指定类型」表示成空数组，
 * 若把空数组当成「全部」会静默放大结果集。
 */
export declare function collectNodes(nodes: SceneNode[], types?: string[] | string): SceneNode[];
/** 节点总数（等价于 collectNodes(nodes).length，但不建数组）。 */
export declare function countNodes(nodes: SceneNode[]): number;
/** 按 name 找第一个匹配的节点（可选 type 过滤）。 */
export declare function findNodeByName(nodes: SceneNode[], name: string, types?: string[]): SceneNode | null;
/**
 * 按节点路径查找，形如 `"Main/Body/CollisionShape2D"`。
 *
 * 与既有各处实现保持一致的容错：
 *   - 前导 `/root/` 会被忽略（运行时绝对路径）
 *   - 单个组件（`"/"` 分隔后只剩一段）时，在整棵树里按 name 找第一个匹配
 */
export declare function findNodeByPath(nodes: SceneNode[], nodePath: string): SceneNode | null;
/**
 * 把节点路径规范化成 `res://` 相对形式的父路径（去掉根名）。
 * 供需要构造 `parent=` 值的调用方复用。
 */
export declare function parentPathOf(nodePath: string): string;
