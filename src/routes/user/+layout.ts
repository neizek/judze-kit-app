import { goto } from "$app/navigation";
import { initSession, session } from "$lib/stores/auth";
import { previousUrl } from "$lib/stores/navigation";
import { openSignInFormPopUp } from "$lib/utils/auth";
import { preventIfOfflineModeOn } from "$lib/utils/offlineMode.js";
import { get } from "svelte/store";

export async function load({ url }) {
	await initSession();

	if (get(session) !== undefined) {
		return {}
	}
	
	const navigateToLink = get(previousUrl) ?? '/';
	goto(navigateToLink, { replaceState: true });
	preventIfOfflineModeOn().then(() => {
		openSignInFormPopUp();
	})
}