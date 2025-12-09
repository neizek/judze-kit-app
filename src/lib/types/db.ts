export type SyncStatus = 'clean' | 'created' | 'updated' | 'deleted';

export interface BaseModel {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	syncStatus: SyncStatus;
}

export interface DBModel {
	id: string;
	user_id: string;
	created_at: string;
	updated_at: string;
	sync_status: SyncStatus;
}