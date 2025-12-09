<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DatePicker from './DatePicker/DatePicker.svelte';
	import FormItem from './FormItem.svelte';
	import TimeInput from './TimePicker/TimeInput.svelte';
	import Button from './Button.svelte';
	import { ClockCheck } from '@lucide/svelte';
	import { timeZones } from '../../../routes/navigation/eta/timeZones';
	import Select from './Select/Select.svelte';

	export let value: Date = new Date();
	export let showCurrentDateTimeButton: boolean = false;
	export let label = 'Date and time';
	export let isUTC: boolean = false;
	export let withSeconds: boolean = true;
	export let tz: number | undefined = -value.getTimezoneOffset() / 60;

	let initialValue = value;
	let date: Date = value;
	let time: Date = value;
	const dispatch = createEventDispatcher();

	if (!withSeconds) {
		time.setSeconds(0, 0);
	}

	$: {
		if (value && value !== initialValue) {
			date = value;
			time = value;
			initialValue = value;
		}
	}

	function handleChanges(mode: 'time' | 'date' | 'tz' | undefined = undefined) {
		if (mode === 'date') {
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
		if (mode === 'time') {
			if (isUTC) {
				value.setUTCHours(time.getUTCHours());
				value.setUTCMinutes(time.getUTCMinutes());
				value.setUTCSeconds(time.getUTCSeconds());
			} else {
				value.setHours(time.getHours());
				value.setMinutes(time.getMinutes());
				if (withSeconds) value.setSeconds(time.getSeconds());
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

<div class="vertical-flex space-l">
	<div class="space-between space">
		<div class="max-width">
			<FormItem {label}>
				<div class="DateTimeInput space">
					<DatePicker bind:value={date} on:change={() => handleChanges('date')} />
					<TimeInput
						bind:value={time}
						on:change={() => handleChanges('time')}
						{withSeconds} />
					{#if isUTC === false}
						<Select
							items={timeZones}
							bind:value={tz}
							on:select={() => handleChanges('tz')} />
					{/if}
				</div>
			</FormItem>
		</div>
	</div>
	{#if showCurrentDateTimeButton}
		<Button
			type="transparent"
			icon={ClockCheck}
			label="Set current date & time"
			onclick={updateDateTime}
			full />
	{/if}
</div>

<style lang="scss">
	.DateTimeInput {
		display: grid;
		grid-template-columns: 1fr 1fr;

		> :global(*) {
			&:nth-child(3) {
				grid-column: 1 / -1;
			}
		}
	}
</style>
