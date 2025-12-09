import { DAYS_COUNTER_ENABLED_STORAGE_KEY } from "$lib/constants/storageKeys";
import storage from "$lib/utils/storage";
import { derived, writable } from "svelte/store";

export const daysCounterEnabled = writable(true);

function init() {
	storage.get<boolean>(DAYS_COUNTER_ENABLED_STORAGE_KEY).then(enabled => {
		if (enabled) {
			daysCounterEnabled.set(enabled)
		}
	})
}

init();

derived(
	daysCounterEnabled,
	($daysCounterEnabled) => storage.set(DAYS_COUNTER_ENABLED_STORAGE_KEY, $daysCounterEnabled)
);