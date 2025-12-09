import { initSession } from '$lib/stores/auth';
import { isOfflineMode } from '$lib/stores/offlineMode';
import { autoSyncEnabled } from '$lib/stores/sync';
import { manualSync } from '$lib/utils/sync';
import { get } from 'svelte/store';
import '../styles/global/global.scss';
import '@capacitor-community/safe-area';

import { App, type BackButtonListenerEvent } from "@capacitor/app";
import storage from '$lib/utils/storage';
import { SYNC_COMPLETED_STORAGE_KEY } from '$lib/constants/storageKeys';
import { initGeolocation } from '$lib/utils/geolocation';
import { initLookups } from '$lib/utils/lookups';
// import { initNotifications } from '$lib/utils/notifications';

export const csr = true;
export const ssr = false;
export const prerender = false;

export const load = ({ url }) => {
	return {
		url: url.pathname,
	};
};

initSession();
initGeolocation();
initLookups();
// initNotifications();

App.addListener('backButton', (event: BackButtonListenerEvent) => {
	if (window && event.canGoBack) {
		window.history.back();
	} else {
		App.exitApp();
	}
})

App.addListener('appStateChange', ({ isActive }) => {
	// If app has come to the foreground
    if (!isActive && !get(isOfflineMode) && get(autoSyncEnabled)) {
		storage.get(SYNC_COMPLETED_STORAGE_KEY).then(completed => {
			if (!completed)
				manualSync();
		})
    }
});