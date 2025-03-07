<script lang="ts">
	import Calendar from "./Calendar.svelte";
	import type { FullAutoFill } from "svelte/elements";
	import { formatDateSimple } from "$lib/datetime";
	import { isFirefox } from "$lib/deviceDetector";
  import type { CreatePopup } from "../../widgets/PopUp.svelte";
  import { getContext } from "svelte";

	export let placeholder: string | undefined = undefined;
	export let value: Date | undefined = undefined;
	export let displayedDate = value ? formatDateSimple(value) : '';
	export let hasError = false;
	export let autocomplete: FullAutoFill | null | undefined = undefined;
	export let disabled: boolean = false;
	export let minDate: Date | undefined = undefined;
	export let maxDate: Date | undefined = undefined;

	$: {
		value,
		displayedDate = value ? formatDateSimple(value) : '';
	}

	function setDate(date: Date) {
		value = date;
	}

	const createPopup: CreatePopup = getContext('createPopup');

	function openCalendar() {
		createPopup({
			header: "Calendar",
			content: {
				component: Calendar,
				props: {
					date: value,
					minDate,
					maxDate,
					setDate
				}
			}
		})
	}
</script>

{#if isFirefox() && autocomplete !== undefined}
	<input
		style="display:none;"
		tabindex="-1"
		autocomplete="{autocomplete}"
		disabled
		readonly
	/>
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div>
	<label class="input extended" class:error="{hasError}" class:disabled="{disabled}" on:click|preventDefault="{openCalendar}">
		<input
			size="10"
			placeholder="{placeholder}"
			disabled="{disabled}"
			on:blur
			on:change
			on:keypress
			on:keydown
			on:keyup
			on:input
			on:click
			value="{displayedDate}"
			readonly
		/>
		{#if hasError}
			<div class="errorIcon">!</div>
		{/if}
	</label>
	<!-- <Calendar bind:opened="{opened}" bind:date="{value}" minDate="{minDate}" maxDate="{maxDate}"/> -->
</div>


<style lang="scss">
	label {
		cursor: pointer;
	}
	
	input {
		user-select: none;
	}
</style>