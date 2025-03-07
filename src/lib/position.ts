
// import { browser } from '$app/environment';
// import { Geolocation, type Position } from '@capacitor/geolocation';
// import { get, writable, type Writable } from "svelte/store";

// export const position: Writable<Position | undefined> = writable(undefined);

// export async function getCurrentPosition(){
// 	if (!get(position) && browser) {
// 		const location = await Geolocation.getCurrentPosition();
// 		position.set(location);
// 	}
// }