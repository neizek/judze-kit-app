<script lang="ts">
	import { goto } from '$app/navigation';
	import { countries } from '$lib/constants/countries';
	import { ROUTES } from '$lib/constants/routes';
	import { user } from '$lib/stores/auth';
	import type { UserEditPayload } from '$lib/types/auth';
	import { updateUser } from '$lib/utils/auth';
	import { createField, createForm } from '$lib/utils/forms/forms';
	import { isEmail, required } from '$lib/utils/forms/validators';
	import Button from '$ui/Button.svelte';
	import Form from '$ui/Form.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Select from '$ui/Select/Select.svelte';
	import { createErrorToast, createToast } from '$widgets/Toaster';
	import { Check, Mail } from '@lucide/svelte';

	export let initialEmail: string | undefined = undefined;
	export let isEditMode: boolean = initialEmail === undefined;
	export let closePopup: (() => void) | undefined = undefined;

	let isLoading: boolean = false;

	const email = createField('email', $user?.email ?? '', [
		required('Email is required'),
		isEmail('Invalid email'),
	]);
	const firstName = createField('firstName', $user?.user_metadata.firstName ?? '', [
		required('First name is a mandatory field'),
	]);
	const lastName = createField('lastName', $user?.user_metadata.lastName ?? '', [
		required('Last name is a mandatory field'),
	]);
	const nationality = createField('nationality', $user?.user_metadata.nationality ?? undefined, [
		required('Nationality is a mandatory field'),
	]);

	const form = createForm(email, firstName, lastName, nationality);

	const countriesOptions = countries.map((country) => ({
		label: country.name,
		value: country.iso,
	}));

	function preparePayload() {
		let payload: UserEditPayload = { data: {} };

		if ($email.value) payload.email = $email.value;

		if (payload.data) {
			if ($firstName.value) payload.data.firstName = $firstName.value;
			if ($lastName.value) payload.data.lastName = $lastName.value;
			if ($nationality.value) payload.data.nationality = $nationality.value;
		}

		return payload;
	}

	function onSubmit() {
		form.validate().then((valid) => {
			if (!valid) {
				return;
			}

			isLoading = true;

			updateUser(preparePayload())
				.then(() => {
					if (closePopup) closePopup();
					createToast({
						type: 'success',
						text: 'Your account info was successfully saved',
					});
					goto(ROUTES.USER.PROFILE);
				})
				.catch((error) => {
					createErrorToast(error);
				})
				.finally(() => {
					isLoading = false;
				});
		});
	}
</script>

<Form>
	{#if isEditMode}
		<span>Use this form to edit your personal data</span>
	{:else}
		<span>There is no account for {initialEmail}, therefore fill up the form to sign up</span>
	{/if}
	<FormItem label="Email" errors={$email.errors}>
		<Input
			type="email"
			icon={Mail}
			hasError={!$email.valid}
			bind:value={$email.value}
			placeholder="janisberzins@teweb.eu" />
	</FormItem>
	<FormItem label="First name" errors={$firstName.errors}>
		<Input
			type="text"
			hasError={!$firstName.valid}
			bind:value={$firstName.value}
			placeholder="Jānis" />
	</FormItem>
	<FormItem label="Last name" errors={$lastName.errors}>
		<Input
			type="text"
			hasError={!$lastName.valid}
			bind:value={$lastName.value}
			placeholder="Bērziņš" />
	</FormItem>
	<FormItem label="Nationality" errors={$nationality.errors}>
		<Select
			items={countriesOptions}
			placeholder="Latvia"
			hasError={!$nationality.valid}
			bind:value={$nationality.value} />
	</FormItem>
	<br />
	<Button
		type="primary"
		label={isEditMode ? 'Save changes' : 'Sign Up'}
		icon={Check}
		{isLoading}
		onclick={onSubmit}
		full />
</Form>
