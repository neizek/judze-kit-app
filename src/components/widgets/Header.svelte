<script lang="ts">
    import { page } from "$app/stores";
    import { title } from "$lib/meta";
    import { getContext } from "svelte";
    import type { CreatePopup } from "./PopUp.svelte";
    import Settings from "./Settings.svelte";
    import isMobile from "$lib/deviceDetector";
    import { theme } from "$lib/theme";
	import LogoSVG from "$lib/judze-logo-letters.svg?raw";

	const createPopup: CreatePopup = getContext('createPopup');

	function openSettings() {
			createPopup({
				header: "User settings",
				content: {
					component: Settings
				},
				bottomSticked: isMobile
			})
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header>
	<div class="space-between space wrapper w1000">
		{#if $page.url.pathname !== '/' && $page.url.pathname !== ''}
			<div class="equal-flex">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span class="material-icons notranslate" on:click={() => window.history.back()}>chevron_left</span>
				<!-- <i class="fa-solid fa-arrow-left" on:click={() => window.history.back()}/> -->
			</div>
		{/if}
		{#if $page.url.pathname === '/' || $page.url.pathname === ''}
			<!-- <img
				src="/judze-logo-letters{$theme === 'light' ? '' : '-white'}.svg"
				alt="Judze logo letters"
				style="height: 100%; padding: 14px 0;"
			/> -->
			<div class="Logo" style="height: 100%; padding: 14px 0;">
				{@html LogoSVG}
			</div>
		{:else}
			<h1 class="max-width" style="font-weight: 500;">{ $title }</h1>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- <i class="fa-solid fa-gear" on:click={openSettings} /> -->
		<span class="material-icons filled notranslate" on:click={openSettings}>settings</span>
	</div>
</header>

<style lang="scss">
	:root {
		--logo-filter: none;

		&[data-theme='dark'] {
			--logo-filter: invert(100%);
		}
	}
	header {
		height: calc(50px + env(safe-area-inset-top));
		top: 0;
		left: 0;
		right: 0;
		padding-top: env(safe-area-inset-top);
		background-color: var(--box-background-color);
		position: fixed;
		z-index: 99;

		-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
		-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
		box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

		.Logo {
			height: 100%;
			padding: 14px 0;
			filter: var(--logo-filter);
		}
	}
</style>