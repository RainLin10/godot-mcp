export interface AddonSyncResult {
    /** 是否发生了文件写入（内容有差异） */
    updated: boolean;
    /** 差异原因（updated=false 时为 null） */
    reason: string | null;
    /** server 自带 addon 的版本号（来自 plugin.cfg） */
    version: string;
}
/**
 * 把 server 自带的 addon 同步到用户的 Godot 工程。
 * 仅在内容有差异时才写文件（避免无意义的写入），返回是否发生了更新。
 */
export declare function syncAddonToProject(projectRoot: string): AddonSyncResult;
