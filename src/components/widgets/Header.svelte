<script lang="ts">
    import { page } from "$app/stores";
    import { title } from "$lib/meta";
    import { getContext } from "svelte";
    import type { CreatePopup } from "./PopUp.svelte";
    import Settings from "./Settings.svelte";

	const createPopup: CreatePopup = getContext('createPopup');

	function openSettings() {
			createPopup({
				header: "User settings",
				content: {
					component: Settings
				},
				bottomSticked: true
			})
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="Header space-between space wrapper">
	<div>
		{#if $page.url.pathname !== '/'}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i class="fa-solid fa-arrow-left" on:click={() => window.history.back()}/>
		{/if}
	</div>
	<h1>{ $title }</h1>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i class="fa-solid fa-gear" on:click={openSettings} />
</div>

<style lang="scss">
	.Header {
		height: 50px;
		background-color: $c-white;
		position: fixed;
		z-index: 99;

		i {
			font-size: 24px;
		}
	}
</style>