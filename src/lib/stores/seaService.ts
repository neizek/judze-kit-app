import { SEA_SERVICE_STORAGE_KEY } from "$lib/constants/storageKeys";
import type { VoyageModel } from "$lib/types/seaservice";
import storage from "$lib/utils/storage";
import { derived, writable } from "svelte/store";

export const seaServiceStore = (() => {
	const { subscribe, set, update } = writable<VoyageModel[]>([]);

	storage.get<VoyageModel[]>(SEA_SERVICE_STORAGE_KEY).then((voyages) => {
		set(voyages ?? [])
	});

	function add(voyage: VoyageModel) {
		seaServiceStore.update(current => {
			const updatedSeaService = [...current, voyage].sort((a, b) => Number(a.dateTo) - Number(b.dateTo));

			storage.set(SEA_SERVICE_STORAGE_KEY, updatedSeaService);

			return updatedSeaService;
		})
	}

	function remove(id: string) {
		update(current => {
            const updatedSeaService = current.map(voyage => {
				if (voyage.id === id) {
					return { ...voyage, syncStatus: 'deleted' } as VoyageModel;
				}

				return voyage
			});

            storage.set(SEA_SERVICE_STORAGE_KEY, updatedSeaService);

            return updatedSeaService;
        });
	}

	return {
		subscribe,
		set,
		update,
		add,
		remove,
	}
})();

export const seaServiceVisible = derived(seaServiceStore, ($seaServiceStore) => {
	return $seaServiceStore.filter((v) => v.syncStatus !== 'deleted').sort((a, b) => Number(b.dateTo) - Number(a.dateTo))
}
);