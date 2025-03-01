<script lang="ts">
    import { title } from "$lib/meta";
    import { initTheme } from "$lib/theme";
    import { fade, fly, scale, slide } from "svelte/transition";
    import Footer from "../components/widgets/Footer/Footer.svelte";
    import Header from "../components/widgets/Header.svelte";
    import PopUp from "../components/widgets/PopUp.svelte";
  import { page } from "$app/stores";
  import { cubicOut } from "svelte/easing";

	initTheme();
	export let data;

	let previousPath = '';
	let isGoingForward = true;

	$: {
		const currentPath = $page.url.pathname;
		isGoingForward = currentPath > previousPath;
		previousPath = currentPath;
	}
	
</script>

<svelte:head>
	<title>{ $title }</title>
</svelte:head>
<PopUp>
	<Header />
	{#key data.url}
		<div 
			class="Content wrapper w1000"
			in:fly={{ x: isGoingForward ? -200 : 200, duration: 200, delay: 200, easing: cubicOut}}
			out:fly={{ x: isGoingForward ? 200 : -200, duration: 200, easing: cubicOut }}
		>
			<slot></slot>
		</div>
		{/key}
	<Footer />
</PopUp>

<style lang="scss">
	// :global(.Container) {
	// 	background:  linear-gradient(to top,#001a2b,transparent 400px);
	// }

	.Content {
		display: flex;
		flex: 1;
		margin-top: calc(74px + env(safe-area-inset-top));

		@include after-mobile {
			margin-top: calc(82px + env(safe-area-inset-top));
		}
	}
</style>