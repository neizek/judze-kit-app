<script lang="ts">
	import { goto } from '$app/navigation';
	import { openEditUserFormPopUp, sendOTP, verifyOTP } from '$lib/utils/auth';
	import { createField, createForm } from '$lib/utils/forms/forms';
	import { min, required } from '$lib/utils/forms/validators';
	import Button from '$ui/Button.svelte';
	import Form from '$ui/Form.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import { createErrorToast, createToast } from '$widgets/Toaster';
	import { Check } from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';

	export let email: string;
	export let closePopup: () => void;
	let isLoading: boolean = false;

	let countdown = 60;
	let reSendDisabled = true;
	let interval: ReturnType<typeof setInterval> | null = null;
	let isReSendLoading: boolean = false;

	const token = createField('token', '', [
		required('Verification code is required'),
		min(5, 'Verification code must be 6 characters long'),
	]);

	const form = createForm(token);

	function onInputToken(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.value.length === 6) onSubmit();
	}

	function onSubmit() {
		form.validate().then((valid) => {
			if (!valid) {
				return;
			}

			isLoading = true;

			verifyOTP({ email, token: $token.value, type: 'email' })
				.then((user) => {
					if (closePopup) closePopup();
					if (user && new Date(user.created_at).getTime() > Date.now() - 60000) {
						openEditUserFormPopUp(email);
						return;
					}
					goto('/user/profile');
				})
				.catch((error) => {
					isLoading = false;
					createErrorToast(error);
				})
				.finally(() => {
					isLoading = false;
				});
		});
	}

	function startCountdown() {
		interval = setInterval(() => {
			countdown--;

			if (countdown <= 0) {
				reSendDisabled = false;
				if (interval) clearInterval(interval);
			}
		}, 1000);
	}

	function reStartCountdown() {
		reSendDisabled = true;
		countdown = 60;
		startCountdown();
	}

	function onReSend() {
		isReSendLoading = true;
		reStartCountdown();

		sendOTP(email)
			.then(() => {
				createToast({
					type: 'success',
					text: 'Another verification code was successfully sent',
				});
			})
			.catch((error) => {
				createErrorToast(error);
			})
			.finally(() => {
				isReSendLoading = false;
			});
	}

	onMount(() => {
		startCountdown();
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<Form>
	<span>
		We have just sent a verification code to {email}. Check your email and input the code below.
	</span>
	<FormItem label="Verification code" errors={$token.errors}>
		<Input
			type="text"
			inputmode="numeric"
			autocomplete="one-time-code"
			placeholder="123456"
			bind:value={$token.value}
			on:input={(e) => onInputToken(e)} />
	</FormItem>
	<div class="vertical-flex space">
		<Button
			type="primary"
			label="Verify & continue"
			icon={Check}
			{isLoading}
			onclick={onSubmit}
			onsubmit={onSubmit}
			full />
		<div class="line-blocks space">
			<Button
				type="transparent"
				label={`Re-send code ${countdown ? `(${countdown}s)` : ''}`}
				full
				disabled={reSendDisabled}
				isLoading={isReSendLoading}
				onclick={onReSend} />
		</div>
	</div>
</Form>
