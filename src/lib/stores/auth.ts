import { SESSION_STORAGE_KEY } from "$lib/constants/storageKeys";
import { initUser } from "$lib/utils/auth";
import storage from "$lib/utils/storage";
import { type User, type Session } from "@supabase/supabase-js";
import { get, writable } from "svelte/store";

export const session = writable<Session | undefined>(undefined);
export const user = writable<User | undefined>(undefined);
export const isAuthorised = writable<boolean | undefined>(undefined);

export async function initSession() {
	if (get(session)) return;

	const savedSession = await storage.get<Session>(SESSION_STORAGE_KEY);
	if (savedSession) initUser(savedSession);
}