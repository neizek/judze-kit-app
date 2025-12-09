<script lang="ts">
	import { title } from '$lib/stores/meta';
	import { initTheme } from '$lib/stores/theme';
	import { fade } from 'svelte/transition';
	import Footer from '$widgets/Footer/Footer.svelte';
	import Header from '$widgets/Header.svelte';
	import PopUp from '$widgets/PopUp/index.svelte';
	import Toaster from '$widgets/Toaster/index.svelte';
	import { cubicOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	import { previousUrl } from '$lib/stores/navigation.js';

	initTheme();

	export let data;

	let historyNavigation = true;

	beforeNavigate(({ type, from }) => {
		historyNavigation = type === 'popstate';
		previousUrl.set(from?.url.pathname);
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
<Toaster />
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
			in:fade={{ duration: historyNavigation ? 0 : 200, easing: cubicOut }}>
			<slot></slot>
		</div>
	{/key}
	<Footer />
</PopUp>

<style lang="scss">
	:root {
		--gradient-color: #ffffff;

		&[data-theme='dark'] {
			--gradient-color: #001429;
		}
	}

	:global(.Container) {
		background: linear-gradient(0deg, var(--gradient-color) 0%, transparent 200px);
	}

	.Content {
		display: flex;
		flex: 1;
		margin-top: calc(84px + var(--safe-area-inset-top, env(safe-area-inset-top)));

		@include after-mobile {
			margin-top: calc(102px + var(--safe-area-inset-top, env(safe-area-inset-top)));
		}
	}
</style>
