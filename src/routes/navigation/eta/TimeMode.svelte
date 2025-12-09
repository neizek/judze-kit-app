<script lang="ts">
	import { formatDateSimple, formatDateSimpleWithTime } from '$lib/utils/datetime';
	import { numberToSpeedInKn } from '$lib/utils/string';
	import DateTimeInput from '$ui/DateTimeInput.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Section from '$ui/Section.svelte';
	import Select from '$ui/Select/Select.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { timeZones } from './timeZones';
	import Button from '$ui/Button.svelte';
	import { ETACalculations } from '$lib/stores/etaCalculations';
	import { derived } from 'svelte/store';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import { Gauge, Route } from '@lucide/svelte';

	let { departureDateTime, departureTZ, averageSpeed, totalDistance, arrivalTZ } =
		$derived($ETACalculations);

	const steps = [0.1, 0.25, 0.5, 1];
	let step: number = $state(steps[0]);

	let calculatedOptions: { speed: number; arrivalDateTime: Date }[] | null = $state(null);

	function calculateArrivalDateTime(speed: number) {
		const steamingTime = totalDistance / speed;
		const departureMs = +departureDateTime - departureTZ! * 3600000;
		const arrivalMs = departureMs + steamingTime * 3600000;
		const arrivalDateTime = new Date(arrivalMs + arrivalTZ! * 3600000);

		return {
			speed,
			arrivalDateTime,
		};
	}

	function calculateArrivalDateTimes() {
		if (!averageSpeed || averageSpeed <= 0) {
			return null;
		}

		const speedOptions = [
			averageSpeed - step * 2,
			averageSpeed - step,
			averageSpeed,
			averageSpeed + step,
			averageSpeed + step * 2,
		].filter((s) => s > 0);

		calculatedOptions = speedOptions.map((speed) => calculateArrivalDateTime(speed));
	}

	onMount(() => {
		calculateArrivalDateTimes();
	});
</script>

<EqualGrid --desktopColumnsQty={2} --tabletColumnsQty={1} --mobileColumnsQty={1}>
	<Section title="Time Mode">
		<DateTimeInput
			label="Date and time of departure"
			bind:value={$ETACalculations.departureDateTime}
			bind:tz={$ETACalculations.departureTZ}
			withSeconds={false} />
		<FormItem label="Estimated speed">
			<Input
				type="number"
				min={0.1}
				max={100}
				step={0.1}
				placeholder="12.0"
				suffix="kn"
				icon={Gauge}
				bind:value={$ETACalculations.averageSpeed}
				on:change={calculateArrivalDateTimes} />
		</FormItem>
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
				on:change={calculateArrivalDateTimes} />
		</FormItem>
		<FormItem label="Time zone on arrival">
			<Select
				bind:value={$ETACalculations.arrivalTZ}
				items={timeZones}
				on:select={calculateArrivalDateTimes} />
		</FormItem>
	</Section>
	<Section title="Calculated values">
		<FormItem label="Choose speed step">
			<div class="line-blocks space">
				{#each steps as stepOption}
					<Button
						type={step === stepOption ? 'primary' : 'tonal'}
						label={`${stepOption} kn`}
						onclick={() => {
							step = stepOption;
							calculateArrivalDateTimes();
						}}
						full />
				{/each}
			</div>
		</FormItem>
		{#if calculatedOptions}
			<div>
				{#each calculatedOptions as option}
					<div class="item pa-m">
						<FormItem
							label={numberToSpeedInKn(option.speed)}
							text={formatDateSimpleWithTime(option.arrivalDateTime)} />
					</div>
				{/each}
			</div>
		{/if}
	</Section>
</EqualGrid>

<style lang="scss">
	.item {
		border-radius: 4px;

		&:nth-child(2n) {
			background: var(--body-background-color);
		}
	}
</style>
