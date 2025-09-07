import type { RankEnum } from "$lib/enums/ranks";

export interface User {
	firstname: string;
	lastname: string;
	rank: RankEnum;
}