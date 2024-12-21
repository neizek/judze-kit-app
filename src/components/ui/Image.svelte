<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

	export let src: string;
	export let alt: string;

	let isLoading: boolean = true;
	let imageRef: HTMLImageElement;

	onMount(() => {
		if (imageRef.complete) {
			isLoading = false;
		}
	});	
</script>

<img
	src="{src}"
	class:placeholder="{isLoading}"
	alt="{alt}"
	bind:this="{imageRef}"
	on:load="{() => isLoading = false}"
/>

<style lang="scss">
	img {
		font-size: 0;
		padding: var(--padding, 0);
		object-fit: var(--object-fit, 'cover');
		height: var(--height, '100%');
		width: var(--width, '100%');
		aspect-ratio: var(--aspect-ratio, 'auto');
		border-radius: var(--border-radius, '0');
		background-color: var(--background-color, 'transparent');
	}
</style>