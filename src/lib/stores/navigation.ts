import { writable } from "svelte/store";

export const previousUrl = writable<string|undefined>(undefined);