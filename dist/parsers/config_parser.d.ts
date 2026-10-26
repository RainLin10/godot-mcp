import { ConfigDocument } from '../utils/types.js';
/**
 * 把任意字符串包成 Godot .cfg 的双引号字符串字面量。
 * Godot 的 VariantParser 认识 \" \\ \n \t \r \uXXXX，所以换行会被安全地
 * 转义成一个转义序列，而不是真的在文件里断行 —— 否则值里塞
 * "\n\n[autoload]\nEvil=..." 就能凭空注入一个新 section（已实测可注入 autoload，
 * 而 autoload 会在编辑器启动时执行脚本）。
 */
export declare function cfgQuote(value: string): string;
/**
 * 把用户给的值转成 .cfg 语法。
 * 布尔/数字裸写；已经像 Godot 字面量的（引号串、`Object(...)`、`PackedStringArray(...)`）
 * 逐字透传，方便调用方原样设置复杂选项值；其余按字符串字面量加引号。
 *
 * 「透传」必须排除裸换行：序列化器一行一个 key，值里带换行就等于可以凭空
 * 插入新的 section/key。所以两条透传分支都只把换行转义掉，其余字符保持原样。
 */
export declare function cfgValue(value: string): string;
/**
 * 校验 section / key 名。这些名字会被直接写成 `[name]` 或 `name = value`，
 * 含换行、`[`、`]` 或 `=` 就能篡改文件结构。
 */
export declare function assertValidConfigName(kind: 'section' | 'key', value: string): void;
/**
 * Parse a Godot config/INI-style file.
 * Handles:
 * - [section] headers
 * - key = value pairs
 * - ; comment lines
 * - Multi-line values (indented continuation)
 */
export declare function parseConfig(content: string): ConfigDocument;
/**
 * Serialize a ConfigDocument back to text.
 *
 * 空行布局按 Godot 自己的 ConfigFile::save 复刻：section 之前空一行、section
 * 头之后再空一行。这样首次回写一个 Godot 生成的文件时，只有 `key = value`
 * 的空格风格会变，不会连带整篇的空行结构一起重排。
 *
 * （Godot 写的是 `key=value`（无空格），我们坚持 `key = value`——把它改掉等于
 *   让每一行都产生 diff，代价远大于收益。）
 */
export declare function serializeConfig(doc: ConfigDocument): string;
