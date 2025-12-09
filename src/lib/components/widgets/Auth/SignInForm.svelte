<script lang="ts">
	import { createField } from '$lib/utils/forms/forms';
	import { isEmail, required } from '$lib/utils/forms/validators';
	import Button from '$ui/Button.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import LogoSVG from '$lib/judze-logo-letters.svg?raw';
	import { Mail, LogIn } from '@lucide/svelte';
	import { openVerificationFormPopUp, sendOTP } from '$lib/utils/auth';
	import { createErrorToast } from '$widgets/Toaster';
	import Form from '$ui/Form.svelte';

	const email = createField('email', '', [
		required('Email is missing'),
		isEmail('Invalid email'),
	]);

	let isLoading: boolean = false;
	export let closePopup: () => void;

	async function sendEmailToSignIn() {
		await email.validate();

		if ($email.valid) {
			isLoading = true;

			sendOTP($email.value)
				.then(() => {
					openVerificationFormPopUp($email.value);
					closePopup();
				})
				.catch((error) => {
					createErrorToast(error);
				})
				.finally(() => {
					isLoading = false;
				});
		}
	}
</script>

<div class="vertical-flex space-xl">
	<div class="vertical-flex space-l centered-content">
		<div class="Logo">
			{@html LogoSVG}
		</div>
		<span>Use the form below to sign in into your Judze account.</span>
	</div>
	<Form>
		<FormItem label="E-mail address" errors={$email.errors}>
			<Input
				bind:value={$email.value}
				hasError={!$email.valid}
				icon={Mail}
				placeholder="janis.berzins@judze.com" />
		</FormItem>
		<Button
			icon={LogIn}
			type="primary"
			label="Sign In / Up"
			{isLoading}
			onclick={sendEmailToSignIn}
			full
			onsubmit={sendEmailToSignIn} />
	</Form>
</div>

<style lang="scss">
	.Logo {
		height: 50px;
		filter: var(--logo-filter);
	}
</style>
