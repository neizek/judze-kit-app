import { writable, type Writable } from "svelte/store";

type ChimeType = {
	title: string,
	body: string,
	id: number,
	// schedule: { at: new Date(Date.now() + 5000) },
	// sound: null,
	// attachments: null,
	// actionTypeId: "",
	// extra: null
}

export function addChime(chime: ChimeType) {
	chimes.update((currentChimes) => {
		currentChimes = [...currentChimes, chime];
		return currentChimes;
	})
}

export const chimes: Writable<ChimeType[]> = writable([])