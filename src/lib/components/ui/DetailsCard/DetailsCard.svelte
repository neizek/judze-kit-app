<script lang="ts">
	import Image from '../Image.svelte';
	import DetailRow from './DetailRow.svelte';
	import type { DetailType, ImageInterface } from './types';

	export let image: ImageInterface;
	export let details: DetailType[];
	export let isBigImage: boolean = false;
	export let imageFit: 'cover' | 'contain' = 'cover';
</script>

<div class="{isBigImage ? 'flex flex-column' : 'flex'} ai-start space-l">
	<Image
		src={image.src}
		alt={image.alt}
		--width={isBigImage ? `100%` : `100px`}
		--aspect-ratio={isBigImage ? `16/9` : '1/1'}
		--object-fit={imageFit}
		--border-radius="5px"
		--background-color={image.bgColor ?? `#ffffff`} />
	<div class="vertical-flex space-l max-width">
		{#each details as detail}
			<DetailRow {detail} />
		{/each}
	</div>
</div>
