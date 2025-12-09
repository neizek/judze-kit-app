<script lang="ts">
	import { isFirefox } from '$lib/utils/deviceDetector';
	import type { FullAutoFill } from 'svelte/elements';
	import type { Icon as IconType } from '@lucide/svelte';
	import { XIcon } from '@lucide/svelte';

	export let type: 'email' | 'text' | 'password' | 'number' | 'tel' | 'time' = 'text';
	export let step = 1;
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let hasError = false;
	export let icon: typeof IconType | undefined = undefined;
	export let autocomplete: FullAutoFill | null | undefined = undefined;
	export let max: number | undefined = undefined;
	export let min: number | undefined = undefined;
	export let disabled: boolean = false;
	export let borderless: boolean = false;
	export let clearable: boolean = false;
	export let readonly: boolean = false;
	export let suffix: string | undefined = undefined;

	$: {
		if (value) {
			if (type === 'number' && min !== undefined && max !== undefined) {
				value = value < min ? min : value;
				value = value > max ? max : value;
			}
		}
	}

	const ref = (node: HTMLInputElement) => {
		node.type = type;
	};

	function clearValue() {
		value = '';
	}
</script>

{#if isFirefox() && autocomplete !== undefined}
	<input
		{type}
		inputmode={type === 'number' ? 'decimal' : 'text'}
		style="display:none;"
		tabindex="-1"
		{autocomplete}
		disabled
		readonly />
{/if}
<label class="input extended" class:error={hasError} class:disabled class:borderless>
	{#if icon}
		<div class="icon">
			<svelte:component
				this={icon}
				class="icon"
				size={18}
				color={`var(--input-border-color)`} />
		</div>
	{/if}
	<input
		{placeholder}
		inputmode={type === 'number' ? 'decimal' : 'text'}
		maxlength={max}
		bind:value
		{min}
		{max}
		{name}
		{step}
		{autocomplete}
		{disabled}
		on:click
		on:blur
		on:change
		on:keypress
		on:keydown
		on:keyup
		on:input
		use:ref
		{readonly}
		style="width: inherit; pointer-events: {readonly ? 'none' : 'auto'};" />
	{#if hasError}
		<div class="errorIcon">!</div>
	{/if}
	{#if suffix}
		<span>{suffix}</span>
	{/if}
	{#if clearable && value.length > 0}
		<button class="pa-s icon" on:click={clearValue} tabindex="-1">
			<XIcon size={16} color={`var(--input-border-color)`} />
		</button>
	{/if}
</label>

<style lang="scss">
	input {
		width: inherit;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	.icon {
		all: unset;
		margin: -4px -8px;
		align-self: stretch;
		display: flex;
		align-items: center;
		padding: 0 4px;
	}
</style>
