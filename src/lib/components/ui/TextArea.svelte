<script lang="ts">
	import type { FullAutoFill } from "svelte/elements";

	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let hasError = false;
	export let rows: number = 5;
	export let autocomplete: FullAutoFill | null | undefined = undefined;
</script>

<label class="input extended" class:error="{hasError}">
	<textarea
		placeholder="{placeholder}"
		name="{name}"
		rows="{rows}"
		autocomplete="{autocomplete}"
		on:blur
		on:change
		on:keypress
		on:keydown
		on:keyup
		on:input
		bind:value
	></textarea>
	{#if hasError}
		<div class="errorIcon">!</div>
	{/if}
</label>
