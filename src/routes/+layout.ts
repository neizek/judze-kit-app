export const prerender = true;

import { browser } from '$app/environment';
import { CapacitorSwipeBackPlugin } from 'capacitor-swipe-back-plugin';
import '../styles/global/global.scss';

import { App, type BackButtonListenerEvent } from "@capacitor/app";


CapacitorSwipeBackPlugin.enable();
if (browser) {
	App.addListener('backButton', (event: BackButtonListenerEvent) => {
		if (window && event.canGoBack) {
			window.history.back();
		} else {
			App.exitApp();
		}
	})
}