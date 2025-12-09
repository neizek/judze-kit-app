<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { closeAllPopUps, closePopUp, popUps } from '.';
	import { beforeNavigate } from '$app/navigation';
	import { Check, XIcon } from '@lucide/svelte';
	import Button from '$ui/Button.svelte';
	import type { CreatedPopUp } from './types';

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === ('Escape' as string)) {
			closeAllPopUps();
			return;
		}
	};

	function onClickOnConfirm(popUp: CreatedPopUp) {
		if (popUp.onConfirm) popUp.onConfirm();
		closePopUp(popUp.id);
	}

	function onClickOnCancel(popUp: CreatedPopUp) {
		if (popUp.onCancel) popUp.onCancel();
		closePopUp(popUp.id);
	}

	beforeNavigate(() => closeAllPopUps);
</script>

<svelte:window on:keydown={handleKeydown} />

{#if Array.isArray($popUps)}
	{#each $popUps as popUp (popUp.id)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="focus-background"
			transition:fade={{ duration: 300, easing: cubicOut }}
			on:click|self={() => closePopUp(popUp.id)}>
		</div>
		<div
			class="Popup vertical-flex space-xl liquid-glass shadow hide-scroll"
			transition:fly={{ y: 200, duration: 300, easing: cubicOut }}>
			<header class="space-between ai-center mobile space">
				<div class="flex space-m">
					{#if popUp.icon}
						<svelte:component this={popUp.icon} />
					{/if}
					<h2>
						{popUp.header}
					</h2>
				</div>
				<button class="pa-s opacity-transition" on:click={() => closePopUp(popUp.id)}>
					<XIcon />
				</button>
			</header>
			<article class="hide-scroll">
				{#if typeof popUp.content === 'string'}
					{popUp.content}
				{:else}
					<svelte:component this={popUp.content.component} {...popUp.content.props} />
				{/if}
				{#if popUp.onConfirm}
					<div class="flex space-between space mt-xl">
						<Button
							type="primary"
							label="Confirm"
							icon={Check}
							full
							onclick={() => onClickOnConfirm(popUp)}></Button>
						<Button
							type="tonal"
							label="Cancel"
							icon={XIcon}
							full
							onclick={() => onClickOnCancel(popUp)}></Button>
					</div>
				{/if}
			</article>
		</div>
	{/each}
{/if}
<slot></slot>

<style lang="scss">
	.Popup {
		z-index: 99;
		will-change: transform;
		background: var(--box-background-color);
		min-width: 340px;
		padding: 20px;
		max-width: 90%;
		max-height: 70vh;
		border-radius: 16px;
		overflow-y: scroll;

		@include after-mobile {
			position: fixed;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
		}

		@include desktop {
			max-width: 40vw;
		}

		@include tablet {
			max-width: 60vw;
		}

		@include mobile {
			width: 100%;
			max-width: 450px;
			margin: 0 auto;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 16px 16px 0 0;
			padding: 20px 20px calc(20px + env(safe-area-inset-bottom)) 20px;
			position: fixed;
			box-shadow: 0 0 20px 1px #0000001a;
			max-height: 70lvh;
			overflow: hidden;
		}

		article {
			padding: 0px;
			overflow-y: scroll;
			overflow-x: hidden;
		}
	}
</style>
