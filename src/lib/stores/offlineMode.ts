import storage from "$lib/utils/storage";
import { writable } from "svelte/store";
import { autoSyncEnabled } from "./sync";

const OFFLINE_MODE_STORAGE_KEY = 'isOfflineMode';

async function initMode() {
	const savedMode = await storage.get<boolean>(OFFLINE_MODE_STORAGE_KEY);

	return savedMode ?? false;
}

export const isOfflineMode = (() => {
	const { subscribe, set, update } = writable<boolean>(false);

	initMode().then((mode) => {
		isOfflineMode.update(_ => {
			return mode
		})
	});

	function setMode(value: boolean) {
		storage.set(OFFLINE_MODE_STORAGE_KEY, value);
		set(value)
	}

	return {
		subscribe,
		set: (value: boolean) => setMode(value),
		update,
	}
})();

isOfflineMode.subscribe((value) => {
	if (value === true) {
		autoSyncEnabled.set(false);
	}
});