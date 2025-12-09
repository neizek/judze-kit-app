<script lang="ts">
	import Input from '$ui/Input.svelte';
	import { Search, SearchX } from '@lucide/svelte';
	import type { SelectItem } from './types';
	import Button from '$ui/Button.svelte';
	import EmptySection from '$ui/EmptySection.svelte';
	import isMobile, { isMobileScreen } from '$lib/utils/deviceDetector';

	export let shownItems: SelectItem[];
	export let onSelect: (item: SelectItem) => void;
	export let closePopup: (() => void) | undefined = undefined;

	let sortedItems: SelectItem[] = shownItems;
	let searchTerm: string = '';

	$: {
		onInputChange(searchTerm);
	}

	function onInputChange(value: string): void {
		const term = value.toLowerCase().trim();

		if (term === '') {
			sortedItems = shownItems;
			return;
		}

		sortedItems = shownItems.filter((item) => item.label.toLowerCase().includes(term));
	}
</script>

<div class="items flex flex-column space-m pa-m hide-scroll">
	{#if sortedItems.length === 0}
		<EmptySection note="No items found" icon={SearchX} />
	{:else}
		{#each sortedItems as item}
			<Button
				type="transparent"
				label={item.label}
				icon={item.icon}
				onclick={() => {
					onSelect(item);
					if (closePopup) closePopup();
				}}
				full
				withChevron />
		{/each}
	{/if}
	{#if shownItems.length > 5 && isMobileScreen()}
		<div class="searchBox">
			<Input
				placeholder="Type to search..."
				icon={Search}
				bind:value={searchTerm}
				clearable />
		</div>
	{/if}
</div>

<style lang="scss">
	@include after-mobile {
		.items {
			position: absolute;
			background-color: var(--input-background-color);
			border: 1px solid var(--input-border-color);
			border-radius: #{$inputBorderRadius};
			z-index: 10;
			top: calc(100% + 8px);
			left: 0;
			right: 0;
			box-shadow: 0 2px 8px var(--Select-items-shadow-color);
			max-height: 700%;
			overflow-y: scroll;
			overflow-x: hidden;
		}
	}

	.searchBox {
		position: sticky;
		bottom: var(--size-m);
		left: 0;
		right: 0;
	}
</style>
