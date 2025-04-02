<script lang="ts">
	import { title } from "$lib/meta";
	import { initTheme } from "$lib/theme";
	import { fade } from "svelte/transition";
	import Footer from "../components/widgets/Footer/Footer.svelte";
	import Header from "../components/widgets/Header.svelte";
	import PopUp from "../components/widgets/PopUp.svelte";
	// import { page } from "$app/stores";
	import { cubicOut } from "svelte/easing";
	import { beforeNavigate } from "$app/navigation";
	import { onMount } from "svelte";

	initTheme();

	export let data;

	let historyNavigation = false;

	beforeNavigate(({ type }) => {
		historyNavigation = type === "popstate";
	});

	// let previousPath = '';
	// let isGoingForward = true;

	// $: {
	// 	const currentPath = $page.url.pathname;
	// 	isGoingForward = currentPath > previousPath;
	// 	previousPath = currentPath;
	// }
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>
<PopUp>
	<Header />
	{#key data.url}
		<!-- <div 
			class="Content wrapper w1000"
			in:fly={{ x: isGoingForward ? -200 : 200, duration: 200, delay: 200, easing: cubicOut}}
			out:fly={{ x: isGoingForward ? 200 : -200, duration: 200, easing: cubicOut }}
		> -->
		<div
			class="Content wrapper w1000"
			in:fade={{ duration: historyNavigation ? 0 : 200, easing: cubicOut }}
		>
			<slot></slot>
		</div>
	{/key}
	<Footer />
</PopUp>

<style lang="scss">
	:root {
		--gradient-color: #ffffff;

		&[data-theme="dark"] {
			--gradient-color: #001429;
		}
	}

	:global(.Container) {
		background: linear-gradient(
			0deg,
			var(--gradient-color) 0%,
			transparent 200px
		);
	}

	.Content {
		display: flex;
		flex: 1;
		margin-top: calc(
			74px + var(--safe-area-inset-top, env(safe-area-inset-top))
		);

		@include after-mobile {
			margin-top: calc(
				82px + var(--safe-area-inset-top, env(safe-area-inset-top))
			);
		}
	}
</style>
