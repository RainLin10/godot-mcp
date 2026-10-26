export interface StdioTransportOptions {
    /** Godot 项目根目录路径 */
    projectRoot?: string;
}
/**
 * 启动 Stdio 传输层。
 * 这是默认传输方式，适用于本地 AI 客户端（Claude Desktop、VS Code 等）。
 */
export declare function runStdioTransport(options?: StdioTransportOptions): Promise<void>;
