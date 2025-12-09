import SignInForm from "$widgets/Auth/SignInForm.svelte";
import VerificationFrom from "$widgets/Auth/VerificationFrom.svelte";
import { createConfirmationPopup, createPopup } from "$widgets/PopUp";
import type { Session, VerifyEmailOtpParams } from "@supabase/supabase-js";
import supabase from "./supabase";
import type { UserEditPayload } from "$lib/types/auth";
import { isAuthorised, session, user } from "$lib/stores/auth";
import storage from "./storage";
import EditUserForm from "$widgets/Auth/EditUserForm.svelte";
import { createErrorToast, createToast } from "$widgets/Toaster";
import { goto } from "$app/navigation";
import ProfileMenu from "$widgets/Auth/ProfileMenu.svelte";
import { KeyRound, Trash, UserPen, UserRoundCog } from "@lucide/svelte";
import { manualSync } from "./sync";
import { SESSION_STORAGE_KEY } from "$lib/constants/storageKeys";

// #region Constants

const WHITELISTED_EMAIL = import.meta.env.VITE_WHITELISTED_EMAIL

// #region Functions

export function initUser(newSession: Session) {
	isAuthorised.set(true);
	user.set(newSession.user);
	session.set(newSession);
	storage.set(SESSION_STORAGE_KEY, newSession);
	manualSync();
}

export function clearUser() {
	isAuthorised.set(false);
	user.set(undefined);
	session.set(undefined);
	storage.remove(SESSION_STORAGE_KEY);
}

// #region Database

export async function sendOTP(email: string) {
	if (email === WHITELISTED_EMAIL) {
		return true;
	}

	const { data, error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: true
		}
	});

	if (error) {
		console.error('Sign in error:', error.message);
		throw error;
	}

	return data.user;
}

export async function verifyOTP(payload: VerifyEmailOtpParams) {
	if (payload.email === WHITELISTED_EMAIL) {
		return signInWithPassword(payload.email, payload.token);
	}

	if (typeof payload.token === 'number') {
		payload.token = String(payload.token);
	}

	const { data, error } = await supabase.auth.verifyOtp(payload);

	if (error) {
		console.error('Verify OTP error:', error.message);
		throw error;
	}

	if (data.session) initUser(data.session);
	return data.user;
}

export async function updateUser(payload: UserEditPayload) {
	const { data, error } = await supabase.auth.updateUser(payload);

	if (error) {
		console.error('Error updating user:', error.message);
		throw error;
	}

	if (data && data.user) {
		user.set(data.user)
		
		const { data: { session: newSession }, error: sessionError } = await supabase.auth.getSession();

		if (sessionError) {
			console.error('Error getting session:', sessionError.message);
			throw sessionError;
		}

		if (newSession) {
			initUser(newSession)
		}
	}
}

export async function signInWithPassword(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		console.error('Sign in error:', error.message);
		throw error;
	}

	if (data.session) initUser(data.session);
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.warn('Sign out error:', error.message);
		throw error;
	}

	clearUser();
}

export async function deleteUser() {
	const { error } = await supabase.rpc('delete_user');

	if (error) throw error;
}

// #region PopUps

export function openSignInFormPopUp() {
	createPopup({
		header: 'Sign In / Up Form',
		icon: KeyRound,
		content: {
			component: SignInForm
		},
	})
}

export function openEditUserFormPopUp(email?: string) {
	createPopup({
		header: email ? 'Sign Up' : 'Edit profile',
		icon: UserPen,
		content: {
			component: EditUserForm,
			props: {
				initialEmail: email
			}
		}
	});
}

export function openVerificationFormPopUp(email: string) {
	createPopup({
		header: 'Verification',
		icon: KeyRound,
		content: {
			component: VerificationFrom,
			props: {
				email
			}
		},
	})
}

export function openDeleteUserConfirmationPopUp() {
	createConfirmationPopup({
		header: 'Delete account',
		icon: Trash,
		content:
			'All your personal data will be removed. Do you agree to delete your account?',
		onConfirm: () => {
			deleteUser().then(() => {
				clearUser();
				goto('/');
				createToast({
					type: 'success',
					text: 'Your account was completely removed',
				});
			})
			.catch((error) => {
				createErrorToast(error)
			});
		},
	});
}

export async function openProfileMenuPopUp() {
	createPopup({
		header: 'Profile menu',
		icon: UserRoundCog,
		content: {
			component: ProfileMenu
		}
	})
}