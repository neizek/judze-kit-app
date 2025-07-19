<script lang="ts">
	import { isMobileScreen } from '$lib/utils/deviceDetector';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import Image from '$ui/Image.svelte';

	const lightRanges = [
		{ label: 'All-round', range: '360', image: 'light-all-round' },
		{ label: 'Masthead', range: '225', image: 'light-masthead' },
		{ label: 'Sidelights', range: '112,5', image: 'light-sidelight' },
		{ label: 'Sternlight', range: '135', image: 'light-sternlight' },
	];
</script>

<EqualGrid --mobileColumnsQty={4} --desktopColumnsQty={4}>
	{#each lightRanges as range}
		<div class="Range vertical-flex maxwidth centered-content space big">
			<Image
				src="/lights/{range.image}.svg"
				alt={range.range}
				--aspect-ratio="1/1"
				--width="100%"
				dropShadow />
			<div class="vertical-flex maxwidth centered-content space small">
				<span>{range.label}</span>
				<span>{range.range}°</span>
			</div>
		</div>
	{/each}
</EqualGrid>

<!-- <style lang="scss">
	.Range {
		:global(img) {
			filter: drop-shadow(rgba(99, 99, 99, 0.2) 0px 2px 8px)
		}
	}
</style> -->
