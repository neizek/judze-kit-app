<script lang="ts">
	export let src: string;
	export let alt: string;

	let isLoading: boolean = true;
</script>

<img
	src="{src}"
	class:placeholder="{isLoading}"
	alt="{alt}"
	on:load="{() => isLoading = false}"
/>

<style lang="scss">
	img {
		font-size: 0;
		object-fit: var(--object-fit, 'cover');
		height: var(--height, '100%');
		width: var(--width, '100%');
		aspect-ratio: var(--aspect-ratio, 'auto');
		border-radius: var(--border-radius, '0');
		background-color: var(--background-color, 'transparent');
	}
</style>