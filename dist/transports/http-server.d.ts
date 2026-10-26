export interface HttpTransportOptions {
    /** HTTP 监听端口，默认 3000 */
    port?: number;
    /** 监听地址，默认 '127.0.0.1' */
    host?: string;
    /** Godot 项目根目录 */
    projectRoot?: string;
    /** 是否启用 SSE 端点（兼容旧客户端），默认 true */
    enableSse?: boolean;
    /** 是否启用 Streamable HTTP 端点，默认 true */
    enableStreamableHttp?: boolean;
}
/**
 * 启动 HTTP 服务器，同时支持 SSE 和 Streamable HTTP 两种协议。
 *
 * SSE 端点 (/sse)：
 *   - GET 请求建立 SSE 长连接，服务端可推送消息
 *   - POST 请求发送 JSON-RPC 消息到服务端
 *   - 每个 SSE 连接创建独立的 Server + Transport 实例
 *
 * Streamable HTTP 端点 (/mcp)：
 *   - GET 请求建立 SSE 流（支持断线重连恢复）
 *   - POST 请求发送 JSON-RPC 消息
 *   - DELETE 请求关闭会话
 *   - 支持有状态（sessionId）和无状态两种模式
 */
export declare function runHttpTransport(options?: HttpTransportOptions): Promise<void>;
