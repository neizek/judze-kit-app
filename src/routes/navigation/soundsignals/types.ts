export type SoundSignalType = {
	morse: string | ConstructorOfATypedSvelteComponent;
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