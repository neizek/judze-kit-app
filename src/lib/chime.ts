import { browser } from "$app/environment";
import { LocalNotifications, type LocalNotificationSchema } from "@capacitor/local-notifications";
import { writable, type Writable } from "svelte/store";

async function scheduleNotifications(chimes: LocalNotificationSchema[]) {
	if (!browser) { 
		return;
	}
	
	await LocalNotifications.schedule({
		notifications: chimes
	  });
}

export function addChime(chime: LocalNotificationSchema) {
	chimes.update((currentChimes) => {
		currentChimes = [...currentChimes, chime];
		scheduleNotifications(currentChimes);
		return currentChimes;
	})

}

export const chimes: Writable<LocalNotificationSchema[]> = writable([])