<script lang="ts">
	export let src: string;
	export let alt: string;

	let isLoading: boolean = true;

	$: console.log(isLoading)
</script>

{#if isLoading}
	<div class="img"></div>
{:else}
	<img src="{src}" alt="{alt}" on:load="{() => isLoading = false}"/>
{/if}

<style lang="scss">
	:root {
		--height: 100%;
		--width: 100%;
	}

	img,
	.img {
		height: var(--height);
		width: var(--width);
	}
</style>