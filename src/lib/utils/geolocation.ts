
	import { createErrorToast } from "$widgets/Toaster";
import { Capacitor } from "@capacitor/core";
import { Geolocation, type PermissionStatus } from "@capacitor/geolocation";

	let permissions: PermissionStatus;

	export async function getCurrentPosition() {
		if ((permissions && (permissions.location === 'granted' || permissions.coarseLocation === 'granted')) || !Capacitor.isNativePlatform()) {
			return Geolocation.getCurrentPosition({
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			});
		} else {
			createErrorToast(new Error('Geolocation can not be obtained due to permission restriction. Enable location permission for our app to use the function.'))
		}
	}

	export function initGeolocation() {
		if (!Capacitor.isNativePlatform()) {
			return;
		}

		Geolocation.checkPermissions().then((status) => {
			permissions = status;
			if (status.location === 'prompt' || status.location === 'prompt-with-rationale' || status.coarseLocation === 'prompt' || status.coarseLocation === 'prompt-with-rationale') {
				Geolocation.requestPermissions().catch((err) => {
					console.warn('Geolocation permission request error:', err);
				});
			}
		})
		.catch((err) => {
			console.warn('Failed to check geolocation permissions:', err);
		});
	}