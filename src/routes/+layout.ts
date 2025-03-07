import { browser } from '$app/environment';
// import { CapacitorSwipeBackPlugin } from 'capacitor-swipe-back-plugin';
import '../styles/global/global.scss';
import '@capacitor-community/safe-area';

import { App, type BackButtonListenerEvent } from "@capacitor/app";
import { LocalNotifications } from '@capacitor/local-notifications';

export const csr = true;
export const prerender = false;

export const load = ({ url }) => {
	return {
	  url: url.pathname,
	};
  };

async function requestForNotifications() {
	await LocalNotifications.requestPermissions();
}

if (browser) {
	requestForNotifications();
}

// CapacitorSwipeBackPlugin.enable();
if (browser && window) {
	App.addListener('backButton', (event: BackButtonListenerEvent) => {
		if (window && event.canGoBack) {
			window.history.back();
		} else {
			App.exitApp();
		}
	})
}