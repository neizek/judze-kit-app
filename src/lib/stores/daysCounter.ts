import { writable, type Writable } from "svelte/store";
import storage from "../utils/storage";
import { browser } from "$app/environment";

export interface DaysCounter {
	new: boolean,
	enabled: boolean,
	startFrom: Date,
	endTo: Date
}

function initStore() {
	const store = browser ? storage.get<DaysCounter>('counter') : undefined;
	if (store) {
		return {
			new: false,
			enabled: store.enabled,
			startFrom: new Date(store.startFrom),
			endTo: new Date(store.endTo)
		}
	}
	return {
		new: true,
		enabled: true,
		startFrom: new Date(Date.now() - 1728000000),
		endTo: new Date(Date.now() + 7889400000),	
	}
}

export const daysCounterStore: Writable<DaysCounter> = writable(initStore());

daysCounterStore.subscribe((store) => {
	if (browser) storage.set('counter', store);
})