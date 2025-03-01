export const prerender = true;

import { browser } from '$app/environment';
import { CapacitorSwipeBackPlugin } from 'capacitor-swipe-back-plugin';
import '../styles/global/global.scss';

import { App, type BackButtonListenerEvent } from "@capacitor/app";

export const csr = true;

export const load = ({ url }) => {
	return {
	  url: url.pathname,
	};
  };
  
//   export function onNavigate(navigation) {
// 	if (!document.startViewTransition) return;
  
// 	return new Promise((resolve) => {
// 	  document.startViewTransition(async () => {
// 		resolve();
// 		await navigation.complete;
// 	  });
// 	});
//   }
  

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