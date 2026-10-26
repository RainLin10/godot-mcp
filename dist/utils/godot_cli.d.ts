import { GodotVersionInfo, SpawnedProcess } from './types.js';
/**
 * Find the Godot binary on the system.
 * Checks in order:
 * 1. GODOT_PATH environment variable
 * 2. Common macOS locations
 * 3. PATH
 * 4. Common Linux/Windows locations
 */
export declare function findGodotBinary(godotPath?: string): string | null;
/**
 * Get Godot version information (async — does not block the event loop).
 */
export declare function getGodotVersion(godotPath: string): Promise<GodotVersionInfo>;
/**
 * Launch Godot editor for a project.
 */
export declare function launchGodotEditor(godotPath: string, projectPath: string, scene?: string): SpawnedProcess;
/**
 * Run a Godot project.
 */
export declare function runGodotProject(godotPath: string, projectPath: string, options?: {
    scene?: string;
    headless?: boolean;
    debug?: boolean;
    window_size?: string;
}): SpawnedProcess;
/**
 * Export a Godot project using an export preset.
 * godot --path <project> --export <preset> <output_path>
 */
export declare function exportGodotProject(godotPath: string, projectPath: string, preset: string, outputPath: string): SpawnedProcess;
/**
 * Get recent output from spawned processes.
 */
export declare function getRecentOutput(clear?: boolean): string[];
/**
 * Clean up all spawned processes.
 */
export declare function cleanupProcesses(): void;
/**
 * Capture a screenshot of the running Godot window (async).
 * Uses platform-native tools. All child processes are spawned with
 * argument arrays (never shell strings) to prevent injection.
 */
export declare function captureScreenshot(outputPath: string, windowTitle?: string, delay?: number): Promise<{
    success: boolean;
    message: string;
    path?: string;
}>;
/**
 * Detect if the Godot editor is currently running (async).
 * Also checks if any project is being played from the editor.
 */
export declare function detectRunningGodot(): Promise<{
    running: boolean;
    editor: boolean;
    playing: boolean;
    pids: string[];
}>;
