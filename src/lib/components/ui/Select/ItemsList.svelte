<script lang="ts">
	import type { SelectItem } from './types';

	export let shownItems: SelectItem[];
	export let onSelect: (item: SelectItem) => void;
	export let closePopup: (() => void) | undefined = undefined;
</script>

<div class="items">
	{#if shownItems.length === 0}
		<div class="item space-between">
			<span>No data</span>
		</div>
	{:else}
		{#each shownItems as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="item space-between"
				on:click={() => {
					onSelect(item);
					if (closePopup) closePopup();
				}}>
				<span>{item.label}</span>
				{#if item.icon}
					<i class="fa-solid fa-{item.icon}"></i>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	@include desktop {
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

			@include desktop {
				max-height: 700%;
				overflow-y: scroll;
				overflow-x: hidden;
			}
		}
	}

	.item {
		padding: 10px 15px;
		background-color: transparent;
		transition: background-color 0.2s;
		font-size: 13.5px;

		&:first-of-type {
			border-top-left-radius: #{$inputBorderRadius};
			border-top-right-radius: #{$inputBorderRadius};
		}

		&:last-of-type {
			border-bottom-left-radius: #{$inputBorderRadius};
			border-bottom-right-radius: #{$inputBorderRadius};
		}

		&:hover {
			cursor: pointer;
			background-color: var(--input-background-color-hover);
		}
	}
</style>
