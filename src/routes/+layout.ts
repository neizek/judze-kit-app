export const prerender = true;

import { browser } from '$app/environment';
import '../styles/global/global.scss';

import { App, type BackButtonListenerEvent } from "@capacitor/app";

if (browser) {
	App.addListener('backButton', (event: BackButtonListenerEvent) => {
		if (window && event.canGoBack) {
			window.history.back();
		} else {
			App.exitApp();
		}
	})
}