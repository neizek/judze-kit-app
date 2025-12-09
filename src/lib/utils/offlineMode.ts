import { isOfflineMode } from "$lib/stores/offlineMode";
import { createConfirmationPopup, createPopup } from "$widgets/PopUp";
import { WifiOff } from "@lucide/svelte";
import { get } from "svelte/store";

export function preventIfOfflineModeOn(): Promise<boolean> {
	if (get(isOfflineMode) === true) {
		return createConfirmationPopup({
			header: 'Offline mode',
			icon: WifiOff,
			content: 'Your app is in offline mode, would you like to switch it off to continue?',
			onConfirm: () => isOfflineMode.set(false),
			onCancel: () => Promise.resolve(false),
		})
	}

	return Promise.resolve(true);
}