import type { UserAttributes } from "@supabase/supabase-js";

export interface UserMetaData {
		firstName: string;
		lastName: string;
		nationality: string;
}

export interface UserEditPayload extends UserAttributes {
	data: Partial<UserMetaData>
}