import type { ComponentType } from "svelte";

export type SoundSignalType = {
	morse: string | ComponentType;
	pattern: string;
	description: string;
}

export type SoundSignalsType = {
	header: string;
	signals: SoundSignalType[];
}

export type SoundsType = {
	[prop: string]: HTMLAudioElement;
}