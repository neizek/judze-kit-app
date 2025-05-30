<script lang="ts">
	import { isFirefox } from "$lib/deviceDetector";
	import type { FullAutoFill } from "svelte/elements";

	export let type: "email" | "text" | "password" | "number" | "tel" | "time" =
		"text";
	export let step = 1;
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let hasError = false;
	export let icon: string | undefined = undefined;
	export let autocomplete: FullAutoFill | null | undefined = undefined;
	export let max: number | undefined = undefined;
	export let min: number | undefined = undefined;
	export let disabled: boolean = false;
	export let borderless: boolean = false;
	export let clearable: boolean = false;
	export let readonly: boolean = false;

	$: {
		if (value) {
			if (type === "number" && min !== undefined && max !== undefined) {
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
		inputmode={type === "number" ? "decimal" : "text"}
		style="display:none;"
		tabindex="-1"
		{autocomplete}
		disabled
		readonly
	/>
{/if}
<label class="input extended" class:error={hasError} class:disabled class:borderless>
	{#if icon}
		<i class="material-icons">{icon}</i>
	{/if}
	<input
		{placeholder}
		inputmode={type === "number" ? "decimal" : "text"}
		maxlength={max}
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
		bind:value
		use:ref
		{readonly}
	/>
	{#if hasError}
		<div class="errorIcon">!</div>
	{/if}
	{#if clearable && value.length > 0}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i class="material-icons" on:click="{clearValue}">close</i>
	{/if}
</label>

<style lang="scss">
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	i {
		font-size: 24px !important;
		margin: -8px;
	}
</style>
