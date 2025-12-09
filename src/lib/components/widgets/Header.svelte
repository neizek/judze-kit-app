<script lang="ts">
	import { page } from '$app/stores';
	import { title } from '$lib/stores/meta';
	import Settings from './Settings.svelte';
	import LogoSVG from '$lib/judze-logo-letters.svg?raw';
	import { goto } from '$app/navigation';
	import { createPopup } from './PopUp';
	import { SettingsIcon, ChevronLeft, User } from '@lucide/svelte';

	function openSettings() {
		createPopup({
			header: 'Settings',
			icon: SettingsIcon,
			content: {
				component: Settings,
			},
		});
	}

	function openProfile() {
		goto('/user/profile');
	}
</script>

<header class="wrapper w1000">
	<div class="space-between shadow liquid-glass ai-center space">
		{#if $page.url.pathname !== '/'}
			<div class="equal-flex">
				<button class="pa-s" on:click={() => window.history.back()}>
					<ChevronLeft />
				</button>
			</div>
		{/if}
		{#if $page.url.pathname === '/'}
			<div class="Logo" style="height: 100%; padding: 14px 4px;">
				{@html LogoSVG}
			</div>
		{:else}
			<h1 class="max-width" style="font-weight: 500;">{$title}</h1>
		{/if}
		<div class="flex space ai-center">
			<button class="pa-s" on:click={openSettings}>
				<SettingsIcon />
			</button>
			<button class="pa-s" on:click={openProfile}>
				<User />
			</button>
		</div>
	</div>
</header>

<style lang="scss">
	:root {
		--header-height: 50px;
		--logo-filter: none;

		&[data-theme='dark'] {
			--logo-filter: invert(100%);
		}
	}

	header {
		height: var(--header-height);
		top: calc(10px + var(--safe-area-inset-top, env(safe-area-inset-top)));
		align-self: center;
		border: none;
		padding-top: var(--safe-area-inset-top, env(safe-area-inset-top));
		position: fixed;
		z-index: 97;

		> div {
			padding: 0 8px;
			height: var(--header-height);
			border-radius: 8px;
			background-color: var(--box-background-color);
		}

		.Logo {
			height: inherit;
			padding: 14px 0;
			filter: var(--logo-filter);
		}
	}
</style>
