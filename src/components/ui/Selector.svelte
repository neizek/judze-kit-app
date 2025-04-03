<script lang="ts">
	import Button from "./Button.svelte";
	interface SelectorItem {
		value: string | number | boolean;
		icon?: string;
		label: string;
	}
	export let items: SelectorItem[];
	export let value: string | number | boolean;
</script>

<div class="line-blocks space">
	{#each items as item}
		<Button
			type={item.value === value ? `primary` : `transparent`}
			label={item.label}
			on:click={() => (value = item.value)}
		/>
	{/each}
</div>
