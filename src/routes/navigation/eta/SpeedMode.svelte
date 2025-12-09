<script lang="ts">
	import { ETACalculations } from '$lib/stores/etaCalculations';
	import { hoursToTimeString, numberToSpeedInKn } from '$lib/utils/string';
	import DateTimeInput from '$ui/DateTimeInput.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Section from '$ui/Section.svelte';
	import { Route } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { departureDateTime, departureTZ, arrivalDateTime, totalDistance, arrivalTZ } =
		$derived($ETACalculations);

	let averageSpeedKn: number | undefined = $state(undefined);
	let steamingTime: number | undefined = $state(undefined);

	function calculateSteamingTime() {
		const diffMs =
			+arrivalDateTime - arrivalTZ! * 3600000 - (+departureDateTime - departureTZ! * 3600000);
		steamingTime = diffMs / (1000 * 60 * 60);
		calculateAverageSpeed();
	}

	function calculateAverageSpeed() {
		averageSpeedKn = totalDistance / steamingTime!;
	}

	onMount(() => {
		calculateSteamingTime();
	});
</script>

<EqualGrid --desktopColumnsQty={2} --tabletColumnsQty={1} --mobileColumnsQty={1}>
	<Section title="Speed Mode">
		<FormItem label="Total distance">
			<Input
				type="number"
				min={0}
				max={81732}
				step={1}
				placeholder="458"
				suffix="nm"
				icon={Route}
				bind:value={$ETACalculations.totalDistance}
				on:change={calculateAverageSpeed} />
		</FormItem>
		<DateTimeInput
			label="Date and time of departure"
			bind:value={$ETACalculations.departureDateTime}
			bind:tz={$ETACalculations.departureTZ}
			withSeconds={false}
			showCurrentDateTimeButton
			on:change={calculateSteamingTime} />
		<DateTimeInput
			label="Date and time of arrival"
			bind:value={$ETACalculations.arrivalDateTime}
			bind:tz={$ETACalculations.arrivalTZ}
			withSeconds={false}
			on:change={calculateSteamingTime} />
	</Section>
	<Section title="Calculated values">
		<FormItem label="Steaming time" text={hoursToTimeString(steamingTime!)} />
		<FormItem label="Required average speed" text={numberToSpeedInKn(averageSpeedKn!)} />
	</Section>
</EqualGrid>
