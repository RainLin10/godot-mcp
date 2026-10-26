import { z } from 'zod';
import { ToolResult } from '../utils/types.js';
export declare const readAudioBusLayoutSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const listAudioFilesSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
};
export declare const createAudioBusLayoutSchema: {
    path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    master_volume: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare function handleReadAudioBusLayout(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleListAudioFiles(projectRoot: string, args: {
    path?: string;
}): ToolResult;
export declare function handleCreateAudioBusLayout(projectRoot: string, args: {
    path?: string;
    master_volume?: number;
}): ToolResult;
export declare const addAudioBusSchema: {
    layout_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bus_name: z.ZodString;
    send_to: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    volume_db: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
};
export declare const removeAudioBusSchema: {
    layout_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bus_index: z.ZodOptional<z.ZodNumber>;
    bus_name: z.ZodOptional<z.ZodString>;
};
export declare const addBusEffectSchema: {
    layout_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bus_index: z.ZodOptional<z.ZodNumber>;
    bus_name: z.ZodOptional<z.ZodString>;
    effect_type: z.ZodEnum<["Reverb", "Delay", "Distortion", "Chorus", "EQ", "Compressor", "Limiter", "Panner", "PitchShift", "Phaser", "LowPassFilter", "HighPassFilter", "BandPassFilter", "BandLimitFilter", "Amplify"]>;
    effect_params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
};
export declare const setBusVolumeSchema: {
    layout_path: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    bus_index: z.ZodOptional<z.ZodNumber>;
    bus_name: z.ZodOptional<z.ZodString>;
    volume_db: z.ZodNumber;
};
export declare function handleAddAudioBus(projectRoot: string, args: {
    layout_path?: string;
    bus_name: string;
    send_to?: string;
    volume_db?: number;
}): ToolResult;
export declare function handleRemoveAudioBus(projectRoot: string, args: {
    layout_path?: string;
    bus_index?: number;
    bus_name?: string;
}): ToolResult;
export declare function handleAddBusEffect(projectRoot: string, args: {
    layout_path?: string;
    bus_index?: number;
    bus_name?: string;
    effect_type: string;
    effect_params?: Record<string, string>;
}): ToolResult;
export declare function handleSetBusVolume(projectRoot: string, args: {
    layout_path?: string;
    bus_index?: number;
    bus_name?: string;
    volume_db: number;
}): ToolResult;
