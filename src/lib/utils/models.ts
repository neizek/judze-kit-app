import { user } from "$lib/stores/auth"
import type { BaseModel, DBModel } from "$lib/types/db"
import { get } from "svelte/store"

export function generateBaseModelFields(): BaseModel {
	return {
		id: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
		syncStatus: 'created',
	}
}

export function generateDBModelFields<T extends BaseModel>(model: T): DBModel {
	return {
		id: model.id,
		user_id: get(user)?.id!,
		created_at: model.createdAt.toISOString(),
		updated_at: model.updatedAt.toISOString(),
		sync_status: model.syncStatus,
	}
}