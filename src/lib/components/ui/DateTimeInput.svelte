<script lang="ts">
	import { getTwoYearsAgo } from "$lib/utils/datetime";
	import { createEventDispatcher } from "svelte";
	import DatePicker from "./DatePicker/DatePicker.svelte";
	import FormItem from "./FormItem.svelte";
	import TimeInput from "./TimePicker/TimeInput.svelte";
	import Button from "./Button.svelte";

	export let value: Date = new Date();

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

	function handleChanges(timeOrDate: "time" | "date" | undefined = undefined) {
		if (timeOrDate === "date") {
			value.setUTCDate(date.getUTCDate());
			value.setUTCFullYear(date.getUTCFullYear());
			value.setUTCMonth(date.getUTCMonth());
		}
		if (timeOrDate === "time") {
			value.setUTCHours(time.getUTCHours());
			value.setUTCMinutes(time.getUTCMinutes());
			value.setUTCSeconds(time.getUTCSeconds());
		}

		value = value;
		dispatch("change");
	}

	function updateDateTime() {
		value = new Date();
		handleChanges();
	}
</script>

<div class="vertical-flex space">
	<div class="space-between space">
		<div class="max-width">
			<FormItem label="UTC Date">
				<DatePicker bind:value={date} on:change={() => handleChanges("date")} />
			</FormItem>
		</div>
		<div class="max-width">
			<FormItem label="UTC Time">
				<TimeInput bind:value={time} on:change={() => handleChanges("time")} />
			</FormItem>
		</div>
	</div>
	<Button
		icon="schedule"
		label="Set current date & time"
		on:click={updateDateTime}
		maxwidth
	/>
</div>
