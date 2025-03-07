import { writable, type Writable } from "svelte/store";
import storage from "./storage";
import { browser } from "$app/environment";

export interface DaysCounter {
	enabled: boolean,
	startFrom: Date,
	endTo: Date
}

function initStore() {
	const store = browser ? storage.get<DaysCounter>('counter') : undefined;
	if (store) {
		return {
			enabled: store.enabled,
			startFrom: new Date(store.startFrom),
			endTo: new Date(store.endTo)
		}
	}
	return {
		enabled: false,
		startFrom: new Date(Date.now() - 1728000000),
		endTo: new Date(Date.now() + 7889400000),	
	}
}

export const daysCounterStore: Writable<DaysCounter> = writable(initStore());

daysCounterStore.subscribe((store) => {
	if (browser) storage.set('counter', store);
})