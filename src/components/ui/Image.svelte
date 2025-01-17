<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

	export let src: string;
	export let alt: string;
	export let dropShadow: boolean = false;

	let isLoading: boolean = true;
	let imageRef: HTMLImageElement;

	$: {
		if (src) {
			isLoading = true;
		}
	}

	onMount(() => {
		if (imageRef.complete) {
			isLoading = false;
		}
	});	
</script>
{#key src}
	<img
		src="{src}"
		class:dropShadow
		class:placeholder="{isLoading}"
		alt="{alt}"
		bind:this="{imageRef}"
		on:load="{() => isLoading = false}"
	/>
{/key}

<style lang="scss">
	:root {
		--Image-filter: drop-shadow(rgba(99, 99, 99, 0.2) 0px 2px 8px);;

		&[data-theme='dark'] {
			--Image-filter: unset;
		}
	}

	img {
		font-size: 0;
		padding: var(--padding, 0);
		object-fit: var(--object-fit, 'cover');
		height: var(--height, '100%');
		width: var(--width, '100%');
		aspect-ratio: var(--aspect-ratio, 'auto');
		border-radius: var(--border-radius, '0');
		background-color: var(--background-color, 'transparent');

		&.dropShadow {
			filter: var(--Image-filter);
		}
	}

</style>