import { AUTO_SYNC_ENABLED_STORAGE_KEY } from "$lib/constants/storageKeys";
import storage from "$lib/utils/storage";
import { writable } from "svelte/store";

const initialAutoSyncEnabled = false; // Default value
export const autoSyncEnabled = writable<boolean>(initialAutoSyncEnabled);

// Fetch the value asynchronously and update the store
storage.get<boolean>(AUTO_SYNC_ENABLED_STORAGE_KEY).then((value) => {
	autoSyncEnabled.set(value ?? initialAutoSyncEnabled);
});

autoSyncEnabled.subscribe((value) => {
	storage.set(AUTO_SYNC_ENABLED_STORAGE_KEY, value);
});
