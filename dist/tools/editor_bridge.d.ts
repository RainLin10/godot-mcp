export declare function sendEditorCommand(method: string, params?: Record<string, any>): Promise<any>;
/**
 * 只读探测：给 `get_status` 这类诊断用。
 *
 * 与 sendEditorCommand 的两点关键区别：
 *  1. **绝不 spawn 编辑器** —— 诊断"编辑器连上了吗"却顺手启动一个编辑器是荒谬的副作用。
 *  2. 超时是 probeTimeoutMs（默认 1.5s）而不是 TCP_RESPONSE_TIMEOUT(30s) —— 诊断工具必须秒回。
 *
 * 返回 null 表示不可达，不抛异常。
 */
export declare function probeEditor(probeTimeoutMs?: number): Promise<any | null>;
/** Initialize the editor bridge with the project root. Call once on startup. */
export declare function initEditorBridge(projectRoot: string): void;
/** Shut down the editor process gracefully */
export declare function shutdownEditorBridge(): void;
