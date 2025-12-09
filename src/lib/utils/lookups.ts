import { RANKS_STORAGE_KEY, VESSEL_TYPES_STORAGE_KEY } from "$lib/constants/storageKeys";
import { ranks, vesselTypes } from "$lib/stores/lookups";
import { isOfflineMode } from "$lib/stores/offlineMode";
import type { Rank, VesselType } from "$lib/types/lookups";
import { get } from "svelte/store";
import storage from "./storage";
import supabase from "./supabase";
import { oneWeek } from "./datetime";

async function loadRanks() {
	const savedRanks = await storage.get<Rank[]>(RANKS_STORAGE_KEY);

	if (savedRanks && savedRanks.length > 0) {
		return savedRanks;
	}

	const { data, error } = await supabase.from('rank').select('*');

	if (error) {
		console.error('Error loading ranks:', error.message);
		throw error;
	}

	return data;
}

async function loadVesselTypes() {
	const savedVesselTypes = await storage.get<VesselType[]>(VESSEL_TYPES_STORAGE_KEY);

	if (savedVesselTypes && savedVesselTypes.length > 0) {
		return savedVesselTypes;
	}

	const { data, error } = await supabase.from('vessel_type').select('*');
	
	if (error) {
		console.error('Error loading vessel types:', error.message);
		throw error;
	}

	return data;
}

export async function initLookups() {
	if (get(ranks).length > 0 && get(vesselTypes).length > 0 && get(isOfflineMode) === true) {
		return;
	}
	
	await Promise.all([
		loadRanks(),
		loadVesselTypes()
	]).then(([ranksData, vesselTypesData]) => {
		ranks.set(ranksData);
		storage.set(RANKS_STORAGE_KEY, ranksData, oneWeek);

		vesselTypes.set(vesselTypesData);
		storage.set(VESSEL_TYPES_STORAGE_KEY, vesselTypesData, oneWeek);
	});
}