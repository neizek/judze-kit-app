import { writable, type Writable } from "svelte/store";
import type { Toast } from "./types";
import type { PostgrestError } from "@supabase/supabase-js";

export const toasts: Writable<Toast[]> = writable([]);

let count = 0;

export function createToast(toast: Toast): void {
	toasts.update((current) => {
		const index = count + 0;
		toast.id = index;
		toast.timer = setTimeout(() => {
			deleteNotification(index);
		}, 3000) as unknown as number;
		count += 1;
		return [ toast, ...current ];
	});
}

export function createErrorToast(error: PostgrestError | Error) {
	createToast({
		type: 'error',
		text: error.message
	})
}

export function deleteNotification(index: number): void {
	toasts.update((current: Toast[]) => {
		return current.filter((toast) => toast.id !== index);
	});
}