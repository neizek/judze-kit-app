<script lang="ts">
    import Image from "./Image.svelte";

	export let image;
	export let details;
	export let isBigImage: boolean = false;
</script>

<div class="Card {isBigImage ? `vertical-flex` : `horizontal-layout`} space big">
	<Image
		src="{image.src}"
		alt="{image.alt}"
		--width="{isBigImage ? `100%` : `100px`}"
		--aspect-ratio="{isBigImage ? `16/9` : '1/1'}"
		--object-fit="cover"
		--border-radius="5px"
		--background-color="#ffffff"
	/>
	<div class="vertical-flex space">
		{#each details as detail}
			{#if detail.tag !== undefined && detail.text !== undefined}
				<svelte:element this="{detail.tag}">
					{detail.title ? `${detail.title}: ` : ``}{detail.text}
				</svelte:element>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.Card {
		@include after-mobile {
			width: 400px;
		}
	}
</style>