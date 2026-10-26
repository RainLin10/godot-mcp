import { ResourceDocument } from '../utils/types.js';
/**
 * Check if a file is a binary .res file by reading its first bytes.
 */
export declare function isBinaryResource(content: Buffer | string): boolean;
/**
 * Parse a .tres file string into a structured ResourceDocument.
 */
export declare function parseResource(content: string): ResourceDocument;
/**
 * Serialize a ResourceDocument back to .tres text.
 *
 * Every caller used to hand-roll this and each one emitted only the header plus
 * `[resource]`. That silently deleted the `[ext_resource]` / `[sub_resource]`
 * blocks, so a single property edit on a material with a texture, or on an
 * Environment with a sky, turned every `ExtResource("1")` / `SubResource("x")`
 * into a dangling reference and Godot refused to open the file at all.
 *
 * `load_steps` is recomputed rather than trusted: it must equal
 * ext + sub + 1, and a stale value makes the engine stop reading early.
 */
export declare function serializeResource(doc: ResourceDocument, 
/**
 * Optional reordering of the `[resource]` keys. Most resources keep insertion
 * order, but AudioBusLayout must be written numerically by bus index or Godot
 * mis-reads the file (see src/tools/audio.ts).
 */
sortResourceKeys?: (keys: string[]) => string[]): string;
