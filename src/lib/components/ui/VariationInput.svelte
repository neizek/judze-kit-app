<script lang="ts">
	import Input from "./Input.svelte";
	import Select from "./Select/Select.svelte";
	import Selector from "./Selector.svelte";
	export let value: number;
	let inputValue: number = value;
	let choosenItem: string = "e";

	const items = [
		{ label: "E", value: "e" },
		{ label: "W", value: "w" },
	];

	$: {
		value = choosenItem === "e" ? inputValue : -inputValue;
	}
</script>

<div class="inline-blocks space">
	<Input
		type="number"
		bind:value={inputValue}
		step={0.1}
		min={0}
		placeholder="0.4"
	/>
	<!-- <Select items="{items}" bind:value="{choosenItem}" /> -->
	<Selector {items} bind:value={choosenItem} />
</div>
