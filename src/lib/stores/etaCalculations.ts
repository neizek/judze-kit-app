import { ETA_FORM_STORAGE_KEY } from "$lib/constants/storageKeys";
import type { ETACalculationsFormData } from "$lib/types/forms";
import storage from "$lib/utils/storage";
import { writable } from "svelte/store";

const initialETAData: ETACalculationsFormData = {
	departureDateTime: new Date(),
	departureTZ: 0,
	arrivalDateTime: new Date(Date.now() + 8 * 3600000),
	arrivalTZ: 0,
	averageSpeed: 12,
	totalDistance: 458
};

async function initETAData() {
	const savedETAData = await storage.get<ETACalculationsFormData>(ETA_FORM_STORAGE_KEY);
	return savedETAData ?? initialETAData;
}

export const ETACalculations = writable<ETACalculationsFormData>(initialETAData);

initETAData().then((data) => {
	ETACalculations.set(data);
});

ETACalculations.subscribe((data) => {
	storage.set(ETA_FORM_STORAGE_KEY, data);
});