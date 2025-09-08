import LoginForm from "$widgets/Login/LoginForm.svelte";
import { createPopup } from "$widgets/PopUp";

export const isAuthorised = false;

export function openSignInForm() {
	createPopup({
		header: 'Days Counter setup',
		content: {
			component: LoginForm
		},
	})
}