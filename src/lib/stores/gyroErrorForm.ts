import { GYRO_ERROR_FORM_STORAGE_KEY } from "$lib/constants/storageKeys";
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
};

let isInitialized = false;

async function initData(): Promise<GyroErrorFormData> {
	const restoredData = await storage.get<GyroErrorFormData>(GYRO_ERROR_FORM_STORAGE_KEY);
	return restoredData ?? defaultData;
}

const gef = writable<GyroErrorFormData>(defaultData);

gef.subscribe(data => {
	if (isInitialized) storage.set(GYRO_ERROR_FORM_STORAGE_KEY, data)
})

initData().then((data) => {
	gef.set(data);
	isInitialized = true;
});

export { gef };