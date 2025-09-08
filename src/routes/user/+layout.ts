import { isAuthorised, openSignInForm } from "$lib/utils/auth";

export async function load({ url, parent }) {

	if (isAuthorised) {
		return {}
	}

	openSignInForm()
}