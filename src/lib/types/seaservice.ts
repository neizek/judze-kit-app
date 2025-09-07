import type { RankEnum } from "$lib/enums/ranks";
import type { VesselTypeEnum } from "$lib/enums/vessels";

export interface Voyage {
	vessel: string;
	vesselType: VesselTypeEnum;
	dateFrom: Date;
	dateTo: Date;
	rank: RankEnum;
	duration?: Duration;
}

export interface Duration {
	years: number;
	months: number;
	days: number;
}

export type SeaService = Voyage[];