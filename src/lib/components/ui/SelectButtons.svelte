<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
	import Icon from "./Icon.svelte";

	interface SelectButtonItem {
		value: any,
		icon: string,
		label: string
	}

	export let items: SelectButtonItem[];
	export let selectedItem: string;

	const dispatch = createEventDispatcher();

	function chooseItem(index: number) {
		selectedItem = items[index].value;
		dispatch('choose');
	}

	onMount(() => {
		if(!selectedItem) chooseItem(0);
	});

</script>
<div class="line-blocks space">
	{#each items as item, index}
		{@const isChoosen = item.value === selectedItem}
		<div
			on:click={() => chooseItem(index)}
			on:keydown={() => chooseItem(index)}
			role="button"
			tabindex="0"
			class:chosen="{isChoosen}"
			class="Item vertical-flex centered-content"
		>
			<Icon
				name="{item.icon}"
				filled="{isChoosen}"
				--color="{isChoosen ? 'var(--button-background-color-primary)' : ''}"
				--margin="0 0 4px 0 "
			/>
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