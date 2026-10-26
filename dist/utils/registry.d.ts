import { ZodTypeAny } from 'zod';
import { ToolResult } from './types.js';
export type ToolHandler = (projectRoot: string, args: any) => ToolResult | Promise<ToolResult>;
export interface ToolRegistration {
    name: string;
    description: string;
    schema: Record<string, ZodTypeAny>;
    handler: ToolHandler;
    readOnly?: boolean;
    /** 分组名，由 registry.setCategory() 在注册时自动打上，供 search_tools / list_tool_categories 使用。 */
    category?: string;
}
/**
 * 已知的写/副作用工具名单（read-only 模式下被拒绝）。
 *
 * 判定规则：显式白名单制 —— 只在此名单中的工具会被 read-only 模式拦截，
 * 不在名单中的一律视为只读。这是有意为之：漏列一个写工具 = 安全失效，
 * 因此新增写类工具时**必须**同时加入此名单（有结构性测试兜底，见
 * test/structural.test.ts 的 write-tool 完整性断言）。
 *
 * 分类原则：
 *  - write_/create_/delete_/move_/edit_/add_/remove_/set_/rename_/duplicate_/update_/compile_ 等明显写操作；
 *  - launch_editor / run_project / export_project / stop_project 等进程控制（有副作用）；
 *  - editor_* 中改变编辑器/场景/项目状态的操作；
 *  - capture_screenshot 启动外部进程，一并拦截。
 */
export declare const WRITE_TOOLS: ReadonlySet<string>;
/** 该工具是否为写/副作用操作（read-only 模式下应被拒绝）。 */
export declare function isWriteTool(name: string): boolean;
export declare function setActiveRegistry(registry: ToolRegistry): void;
export declare function getActiveRegistry(): ToolRegistry | null;
export declare class ToolRegistry {
    private tools;
    private readOnly;
    private currentCategory;
    constructor(opts?: {
        readOnly?: boolean;
    });
    /**
     * 设置后续 register() 调用的分组名。
     * 分类以前只以 register.ts 里的注释形式存在，导致每个工具的 category 都是
     * undefined —— search_tools 无法按类聚合，README 宣称的"29 个分类"也无从校验。
     */
    setCategory(name: string): void;
    /** 所有分类及其工具数（只读模式下已过滤写工具）。 */
    categories(): {
        name: string;
        count: number;
    }[];
    /** 当前是否处于只读模式 */
    get isReadOnly(): boolean;
    /** Register a single tool */
    register(tool: ToolRegistration): void;
    /** Get all tool definitions (for list_tools). 只读模式下过滤掉写工具。 */
    list(): ToolRegistration[];
    /** Find a tool by name */
    find(name: string): ToolRegistration | undefined;
    /** 是否允许调用该工具（read-only 模式下写工具被拒绝） */
    canCall(name: string): boolean;
    /** Is the registry empty? */
    get isEmpty(): boolean;
    get count(): number;
}
