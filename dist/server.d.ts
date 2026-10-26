import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ToolRegistry } from './utils/registry.js';
/**
 * 初始化共享资源（工具注册表 + 项目根目录）。
 * 最多调用一次；重复调用会复用已有实例。
 */
export declare function initSharedResources(projectRoot?: string): {
    registry: ToolRegistry;
    projectRoot: string | null;
};
/**
 * 获取当前 projectRoot。
 */
export declare function getProjectRoot(): string | null;
export interface CreateServerOptions {
    /** 是否在 stdio transport 中运行（打印日志到 stderr） */
    isStdio?: boolean;
}
/**
 * 创建一个已注册所有工具和处理器的新 MCP Server 实例。
 * 每个 transport 连接都需要独立的 Server 实例。
 */
export declare function createMcpServer(_options?: CreateServerOptions): Server;
/**
 * Convert camelCase keys to snake_case in an arguments object so they match the
 * snake_case keys declared in our Zod schemas. Explicit `PARAMETER_MAP` entries
 * win (handles irregular forms); any remaining key containing an uppercase
 * letter is converted generically so LLM clients that emit camelCase don't fail
 * Zod validation on the 100+ multi-word tool parameters. Keys already in
 * snake_case (no uppercase) pass through unchanged.
 */
export declare function normalizeParameterNames(args: Record<string, unknown>): Record<string, unknown>;
