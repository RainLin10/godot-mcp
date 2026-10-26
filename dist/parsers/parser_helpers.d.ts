/**
 * Split a Godot header string into parts, respecting quoted strings.
 * e.g. `gd_scene load_steps=5 format=3 uid="uid://abc"` →
 *   ['gd_scene', 'load_steps=5', 'format=3', 'uid="uid://abc"']
 */
export declare function splitHeaderParts(inner: string): string[];
/**
 * Parse key=value pairs from header parts.
 * e.g. ['type="Script"', 'path="res://player.gd"', 'id="1_abc"'] →
 *   { type: '"Script"', path: '"res://player.gd"', id: '"1_abc"' }
 */
export declare function parseKeyValuePairs(props: string[]): Record<string, string>;
/**
 * Remove surrounding double quotes from a string.
 */
export declare function unquote(str: string): string;
/**
 * Normalize an ext_resource / sub_resource `id` into its bare form.
 *
 * Serializers re-emit ids as `id="<id>"`, so the parsed value must never keep
 * its own quotes -- otherwise every read-modify-write cycle adds one quote
 * layer (`"1"` -> `""1""` -> `"""1"""`), the id stops matching the
 * `ExtResource("1")` / `SubResource("1")` references, and Godot rejects the
 * whole file with "Parse Error: Unexpected end of file".
 *
 * Godot resource ids are `[A-Za-z0-9_]`-ish tokens and can never legitimately
 * contain a double quote, so stripping *every* surrounding layer is safe and
 * additionally repairs files that a previous buggy version already corrupted.
 */
export declare function unquoteId(str: string | undefined): string;
/**
 * Normalize any section-header attribute (`type`, `uid`, `path`, `id`) to its
 * bare form.
 *
 * Same hazard as {@link unquoteId}: serializers always re-add the quotes, so a
 * parser that keeps them makes every read-modify-write cycle grow another
 * layer (`type="BoxMesh"` -> `type=""BoxMesh""` -> ...) until Godot can no
 * longer parse the file. None of these attributes can legitimately contain a
 * double quote, so stripping every layer is safe and also repairs files that an
 * earlier buggy version already damaged.
 */
export declare function unquoteAttr(str: string | undefined): string;
/**
 * Check if brackets/quotes in a multi-line value are balanced.
 */
export declare function isValueBalanced(value: string): boolean;
