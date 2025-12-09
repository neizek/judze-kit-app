<script lang="ts">
	import type { SelectorItem, SelectorProps } from '$lib/types/ui';
	import Button from './Button.svelte';

	let { items, value = $bindable(), onSelect }: SelectorProps = $props();

	function onButtonClick(item: SelectorItem) {
		value = item.value;
		if (onSelect) onSelect();
	}
</script>

<div class="line-blocks space">
	{#each items as item}
		<Button
			type={item.value === value ? 'primary' : 'transparent'}
			label={item.label}
			icon={item.icon}
			onclick={() => onButtonClick(item)} />
	{/each}
</div>
