<script lang="ts">
	import Input from './Input.svelte';
	import Selector from './Selector.svelte';
	export let value: number;
	let inputValue: number = value;
	let choosenItem: string = 'e';

	const items = [
		{ label: 'E', value: 'e' },
		{ label: 'W', value: 'w' },
	];

	$: {
		value = choosenItem === 'e' ? inputValue : -inputValue;
	}
</script>

<div class="VariationInput space">
	<Input
		type="number"
		bind:value={inputValue}
		step={0.1}
		min={0}
		max={20}
		suffix="deg"
		placeholder="0.4" />
	<Selector {items} bind:value={choosenItem} />
</div>

<style lang="scss">
	.VariationInput {
		display: grid;
		grid-template-columns: 1fr auto;
	}
</style>
