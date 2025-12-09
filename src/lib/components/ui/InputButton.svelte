<script lang="ts">
	import Input from './Input.svelte';

	let { value = $bindable(), mask, ...restProps } = $props();

	let shownValue = $state(value ? mask(value) : undefined);

	$effect(() => {
		if (value) shownValue = mask(value);
	});
</script>

<Input on:click value={shownValue} placeholder="Choose date" {...restProps} readonly />
