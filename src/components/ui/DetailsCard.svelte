<script lang="ts">
    import Image from "./Image.svelte";

	interface ImageInterface {
		src: string;
		alt: string;
		bgColor?: string;
	}

	interface DetailType {
		tag: string;
		title?: string;
		text: string;
		class?: string;
	}

	export let image: ImageInterface;
	export let details: DetailType[];
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
		--background-color="{image.bgColor ?? `#ffffff`}"
	/>
	<div class="vertical-flex space-l">
		{#each details as detail}
			{#if detail.tag !== undefined && detail.text !== undefined}
				<svelte:element this="{detail.tag}" class="{detail.class}">
					{detail.title ? `${detail.title}: ` : ``}{detail.text}
				</svelte:element>
			{/if}
		{/each}
	</div>
</div>