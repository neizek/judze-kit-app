
import { SEA_SERVICE_STORAGE_KEY } from "$lib/constants/storageKeys";
import { seaServiceStore } from "$lib/stores/seaService";
import type { VoyageModel, VoyagePayload } from "$lib/types/seaservice";
import { getDuration } from "./datetime";
import { generateBaseModelFields, generateDBModelFields } from "./models";
import storage from "./storage";

export function addVoyage(voyage: Omit<VoyageModel, 'id' | 'syncStatus' | 'createdAt' | 'updatedAt'>) {
	seaServiceStore.add({
		...voyage,
		...generateBaseModelFields(),
	});
}

export function removeVoyage(id: string) {
	seaServiceStore.remove(id);
}

// Sets all voyages in the store and updates local storage
export function setAllVoyages(voyages: VoyageModel[]) {
	seaServiceStore.set(voyages);
	storage.set(SEA_SERVICE_STORAGE_KEY, voyages);
}

// Prepares local model from payload fetched from the server
export function prepareVoyagesModels(models: VoyagePayload[]): void {
	setAllVoyages(models.map(model => ({
		id: model.id!,
		dateFrom: new Date(model.date_from),
		dateTo: new Date(model.date_to),
		vesselTypeId: Number(model.vessel_type_id),
		vessel: model.vessel,
		rankId: Number(model.rank_id),
		syncStatus: 'clean',
		createdAt: new Date(model.created_at),
		updatedAt: new Date(model.updated_at),
		duration: getDuration(new Date(model.date_from), new Date(model.date_to))
	})));
}
	
// Prepares payload to be sent to the server from local store
export function prepareVoyagesPayload(): VoyagePayload[] {
	let payload: VoyagePayload[] = [];
	
	seaServiceStore.subscribe((voyages) => {
		payload = voyages.map(voyage => ({
			vessel_type_id: Number(voyage.vesselTypeId),
			vessel: voyage.vessel,
			date_from: voyage.dateFrom.toISOString(),
			date_to: voyage.dateTo.toISOString(),
			rank_id: Number(voyage.rankId),
			...generateDBModelFields(voyage)
		}));
	})();

	return payload;
}