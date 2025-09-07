<script lang="ts">
	import { daysCounterStore } from '$lib/stores/daysCounter';
	import Button from '../../../ui/Button.svelte';
	import DatePicker from '../../../ui/DatePicker/DatePicker.svelte';
	import FormItem from '../../../ui/FormItem.svelte';

	let startDate: Date = $daysCounterStore.startFrom;
	let endDate: Date = $daysCounterStore.endTo;
	let errorMessage: string | undefined = undefined;

	export let closePopup: () => void;

	$: {
		if (startDate || endDate) {
			if (startDate > endDate) {
				errorMessage = 'Your start date can not be later than the end date';
			} else {
				errorMessage = undefined;
			}
		}
	}
	function handleSave() {
		if (errorMessage) {
			return;
		}

		if ($daysCounterStore.new) $daysCounterStore.new = false;

		$daysCounterStore.startFrom = startDate;
		$daysCounterStore.endTo = endDate;
		closePopup();
	}
</script>

<div class="vertical-flex space-l">
	{#if errorMessage}
		<span class="error">{errorMessage}</span>
	{/if}
	<FormItem label="Start of the contract">
		<DatePicker bind:value={startDate} maxDate={endDate} />
	</FormItem>
	<FormItem label="End of the contract">
		<DatePicker bind:value={endDate} minDate={startDate} />
	</FormItem>
	<Button
		label="Start counting"
		type="primary"
		on:click={handleSave}
		disabled={errorMessage !== undefined} />
</div>

<style lang="scss">
	.error {
		color: var(--error-font-color);
	}
</style>
