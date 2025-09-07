import { browser } from "$app/environment";
import type { GyroErrorFormData } from "$lib/types/forms";
import storage from "$lib/utils/storage";
import { writable } from "svelte/store";

const defaultData: GyroErrorFormData = {
	object: 'sun',
	givenDateTime: new Date(),
	longitude: 24,
	latitude: 57,
	azimuth: undefined,
	LHA: undefined,
	GHA: undefined,
	declination: undefined,
	GC: undefined,
	GB: undefined,
	variation: undefined,
	MC: undefined,
	givenStarOrPlanet: undefined,
}

function initData(): GyroErrorFormData {
	const restoredData = storage.get('gyroErrorForm') as GyroErrorFormData;

	return restoredData ?? defaultData;
}

export const gyroErrorData = writable<GyroErrorFormData>(initData())