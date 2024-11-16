<script lang="ts">
    import { onMount } from "svelte";

	interface SelectButtonItem {
		value: any,
		icon: string,
		label: string
	}

	export let items: SelectButtonItem[];
	export let selectedItem: string;

	function chooseItem(index: number) {
		selectedItem = items[index].value;
	}

	onMount(() => {
		if(!selectedItem) chooseItem(0);
	});

</script>
<div class="line-blocks space">
	{#each items as item, index}
		<div
			on:click={() => chooseItem(index)}
			on:keydown={() => chooseItem(index)}
			role="button"
			tabindex="0"
			class:chosen="{item.value === selectedItem}"
			class="Item vertical-flex centered-content"
		>
			<!-- <i class="fa-regular fa-{item.icon}"></i> -->
			<span class="material-icons notranslate">{item.icon}</span>
			<span>{item.label}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.Item {
		cursor: pointer;
	}

	.chosen > * {
		color: var(--secondary-color);
	}
</style>