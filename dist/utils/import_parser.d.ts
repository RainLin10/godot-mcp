export interface ImportConfig {
    remap: Record<string, string>;
    deps: Record<string, string>;
    params: Record<string, string>;
}
/** Parse an .import file body into its [remap]/[deps]/[params] sections. */
export declare function parseImportConfig(content: string): ImportConfig;
/** Serialize an ImportConfig back into Godot 4.x-native .import file text. */
export declare function serializeImportConfig(config: ImportConfig): string;
