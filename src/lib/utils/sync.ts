import type { DBModel } from "$lib/types/db";
import supabase from "./supabase";
import { prepareVoyagesModels, prepareVoyagesPayload } from "./seaService";
import { seaServiceStore } from "$lib/stores/seaService";
import { get, type Writable } from "svelte/store";
import storage from "./storage";
import { SYNC_COMPLETED_STORAGE_KEY } from "$lib/constants/storageKeys";
import { oneDay } from "./datetime";

export async function manualSync() {
	
	const { data: { session }, error } = await supabase.auth.getSession()

	if (error || !session) {
		console.warn('No active session, skipping sync.');
		throw error || new Error('No active session');
	}

	const modelsToSync = [
		{ updateFunc: prepareVoyagesModels, local: prepareVoyagesPayload(), table: 'voyage' as const },
	];

	await Promise.all(modelsToSync.map(async ({ updateFunc, local, table }) => {
		await manualSyncModel(updateFunc, local, table)
	}));

	storage.set(SYNC_COMPLETED_STORAGE_KEY, true, oneDay)
}

async function manualSyncModel<T extends DBModel>(updateFunc: (data: T[]) => void, array: T[], table: string) {
	const upsertBatch: T[] = [];
	const deleteIds: string[] = [];

	for (const item of array) {
		if (item.sync_status === 'deleted' && item.id) {
			deleteIds.push(item.id);
		} else if (item.sync_status === 'created' || item.sync_status === 'updated') {
			const { sync_status, ...rest } = item;
			upsertBatch.push(rest as T);
		}
	}

	// Upsert created/updated items

	if (upsertBatch.length > 0) {
		const { data: upserted, error: upsertError } = await supabase
			.from(table)
			.upsert(upsertBatch, { onConflict: 'id' })
			.select();
      
      if (upsertError) throw upsertError;
      
    }

	// Soft-delete deleted items

	if (deleteIds.length > 0) {
		const { error: deleteError } = await supabase
			.from(table)
			.delete()
			.in('id', deleteIds);
		
		if (deleteError) throw deleteError;
	}

	// Fetch latest data from remote

	const { data: remote, error: fetchError } = await supabase
      .from(table)
      .select('*');

	updateFunc(remote as T[]);
}
