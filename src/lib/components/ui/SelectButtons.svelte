<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { type Icon as IconType } from '@lucide/svelte';

	interface SelectButtonItem {
		value: any;
		icon: typeof IconType;
		label: string;
	}

	export let items: SelectButtonItem[];
	export let selectedItem: string;

	const dispatch = createEventDispatcher();

	function chooseItem(index: number) {
		selectedItem = items[index].value;
		dispatch('choose');
	}

	onMount(() => {
		if (!selectedItem) chooseItem(0);
	});
</script>

<div class="line-blocks space py">
	{#each items as item, index}
		{@const isChoosen = item.value === selectedItem}
		<div
			on:click={() => chooseItem(index)}
			on:keydown={() => chooseItem(index)}
			role="button"
			tabindex="0"
			class:chosen={isChoosen}
			class="Item vertical-flex space centered-content">
			<svelte:component
				this={item.icon}
				size={30}
				fill={isChoosen ? 'var(--button-background-color-primary)' : 'transparent'}
				color={isChoosen
					? 'var(--button-background-color-primary)'
					: 'var(--default-font-color)'} />
			<span>{item.label}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.Item {
		cursor: pointer;
	}

	.chosen > * {
		color: var(--button-background-color-primary);
	}
</style>
