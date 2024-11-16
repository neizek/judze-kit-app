<script lang="ts">
    import { page } from "$app/stores";
    import { title } from "$lib/meta";
    import { getContext } from "svelte";
    import type { CreatePopup } from "./PopUp.svelte";
    import Settings from "./Settings.svelte";
    import isMobile from "$lib/deviceDetector";

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
	<div class="line-blocks space wrapper w1000">
		<div class="equal-flex">
			{#if $page.url.pathname !== '/'}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span class="material-icons notranslate" on:click={() => window.history.back()}>chevron_left</span>
				<!-- <i class="fa-solid fa-arrow-left" on:click={() => window.history.back()}/> -->
			{/if}
		</div>
		<h1 class="max-width">{ $title }</h1>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- <i class="fa-solid fa-gear" on:click={openSettings} /> -->
		<span class="material-icons filled notranslate" on:click={openSettings}>settings</span>
	</div>
</header>

<style lang="scss">	
	header {
		height: 50px;
		top: 0;
		left: 0;
		right: 0;
		background-color: var(--box-background-color);
		position: fixed;
		z-index: 99;

		-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
		-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
		box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
	}
</style>