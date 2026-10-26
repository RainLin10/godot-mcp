/** Encode a non-negative id the same way `ResourceUID.id_to_text()` does. */
export declare function idToUidText(id: bigint): string;
/** Decode `uid://...` back to its id, mirroring `ResourceUID.text_to_id()`. */
export declare function uidTextToId(text: string): bigint;
/**
 * Mint a fresh `uid://...`, matching `ResourceUID.create_id()` (random 63-bit).
 *
 * Godot dedupes against its own cache; we cannot read that from outside the
 * editor, but at 63 bits a collision is not a practical concern.
 */
export declare function generateUid(): string;
/**
 * Replace the placeholder `uid=""` that the file templates emit with a real UID.
 *
 * Deliberately scoped to the `[gd_scene]` / `[gd_resource]` header on the first
 * line so that arbitrary file content (scripts, shaders, docs) is never touched.
 */
export declare function stampUid(content: string): string;
