<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DatePicker from './DatePicker/DatePicker.svelte';
	import FormItem from './FormItem.svelte';
	import TimeInput from './TimePicker/TimeInput.svelte';
	import Button from './Button.svelte';

	export let value: Date = new Date();
	export let showCurrentDateTimeButton: boolean = false;
	export let label = 'Date and time';
	export let isUTC: boolean = false;

	let initialValue = value;
	let date: Date = value;
	let time: Date = value;
	const dispatch = createEventDispatcher();

	$: {
		if (value && value !== initialValue) {
			date = value;
			time = value;
			initialValue = value;
		}
	}

	function handleChanges(timeOrDate: 'time' | 'date' | undefined = undefined) {
		if (timeOrDate === 'date') {
			if (isUTC) {
				value.setUTCDate(date.getUTCDate());
				value.setUTCFullYear(date.getUTCFullYear());
				value.setUTCMonth(date.getUTCMonth());
			} else {
				value.setDate(date.getDate());
				value.setFullYear(date.getFullYear());
				value.setMonth(date.getMonth());
			}
		}
		if (timeOrDate === 'time') {
			if (isUTC) {
				value.setUTCHours(time.getUTCHours());
				value.setUTCMinutes(time.getUTCMinutes());
				value.setUTCSeconds(time.getUTCSeconds());
			} else {
				value.setHours(
					time.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
				);
			}
		}

		value = value;
		dispatch('change');
	}

	function updateDateTime() {
		value = new Date();
		handleChanges();
	}
</script>

<div class="vertical-flex space">
	<div class="space-between space">
		<div class="max-width">
			<FormItem {label}>
				<div class="equal-flex space">
					<DatePicker bind:value={date} on:change={() => handleChanges('date')} />
					<TimeInput bind:value={time} on:change={() => handleChanges('time')} />
				</div>
			</FormItem>
		</div>
	</div>
	{#if showCurrentDateTimeButton}
		<Button
			icon="schedule"
			label="Set current date & time"
			on:click={updateDateTime}
			maxwidth />
	{/if}
</div>
