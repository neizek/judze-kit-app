import type { Rank, VesselType } from "$lib/types/lookups";
import { derived, writable, type Writable } from "svelte/store";

export const vesselTypes: Writable<VesselType[]> = writable([]);
export const vesselTypesMap = derived(
	vesselTypes,
	(vesselTypes) => new Map(vesselTypes.map((vesselType) => [vesselType.id, vesselType]))
);
export const vesselTypesOptions = derived(vesselTypes, (vesselTypes) =>
	vesselTypes.map((vesselType) => ({
		label: vesselType.name,
		value: vesselType.id
	}))
);

export const ranks: Writable<Rank[]> = writable([]);
export const ranksMap = derived(
	ranks,
	(ranks) => new Map(ranks.map((rank) => [rank.id, rank]))
);
export const ranksOptions = derived(ranks, (ranks) =>
	ranks.map((rank) => ({
		label: rank.name,
		value: rank.id
	}))
);