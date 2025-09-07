	import { browser } from "$app/environment";
	import type { GeolocationPlugin } from "@capacitor/geolocation";

	let GeolocationPlugin: GeolocationPlugin | undefined = undefined;

	if (browser) {
		const geoModule = await import('@capacitor/geolocation');
		GeolocationPlugin = geoModule.Geolocation;
	}

	export async function getCurrentPosition() {
		console.log(GeolocationPlugin)
		return GeolocationPlugin?.getCurrentPosition({
			enableHighAccuracy: true,
		});
	}

	export async function checkLocationPermissions() {
		return GeolocationPlugin?.checkPermissions();
	}