import type { RankEnum } from "$lib/enums/ranks";
import type { VesselTypeEnum } from "$lib/enums/vessels";
import type { BaseModel, DBModel, SyncStatus } from "./db";

export interface VoyageModel extends BaseModel {
	vessel: string;
	vesselTypeId: number;
	dateFrom: Date;
	dateTo: Date;
	rankId: number;
	duration?: DurationParams;
}

export interface VoyagePayload extends DBModel {
	vessel: string;
	vessel_type_id: number;
	date_from: string;
	date_to: string;
	rank_id: number;
}

export interface DurationParams {
	years: number;
	months: number;
	days: number;
}

export type SeaService = VoyageModel[];