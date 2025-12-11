<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import Button from '$ui/Button.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Select from '$ui/Select/Select.svelte';
	import SelectButtons from '$ui/SelectButtons.svelte';
	import celestialObjects from '$lib/constants/celestialObjects.json';
	import CoordinatesInput from '$ui/CoordinatesInput.svelte';
	import { title } from '$lib/stores/meta';
	import VariationInput from '$ui/VariationInput.svelte';
	import Section from '$ui/Section.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import DateTimeInput from '$ui/DateTimeInput.svelte';
	import { formatToAngle, formatToCompassError, transformToCoordinates } from '$lib/utils/string';
	import { gef } from '$lib/stores/gyroErrorForm';
	import { dateToExcelSerial } from '$lib/utils/datetime';
	import { mod } from '$lib/utils/math';
	import { Sun, Moon, Star, Locate, CircleDot } from '@lucide/svelte';
	import { getCurrentPosition } from '$lib/utils/geolocation';
	import { getMoonData, getPlanetData, getSolarData, getStarData } from '$lib/utils/celestial';

	$: TC = isDefinedNumber([$gef.GC, $gef.azimuth, $gef.GB])
		? $gef.GC! + ($gef.azimuth! - $gef.GB!)
		: undefined;

	let solarSystemObjects = [
		{
			value: 'sun',
			icon: Sun,
			label: 'Sun',
		},
		{
			value: 'moon',
			icon: Moon,
			label: 'Moon',
		},
		{
			value: 'stars',
			icon: Star,
			label: 'Star',
		},
		{
			value: 'planets',
			icon: CircleDot,
			label: 'Planet',
		},
	];

	function performCalculations() {
		const date = dateToExcelSerial($gef.givenDateTime);
		const hours = $gef.givenDateTime.getUTCHours();
		const minutes = $gef.givenDateTime.getUTCMinutes();
		const seconds = $gef.givenDateTime.getUTCSeconds();

		const time = -36525 + date - 1.5 + (hours + minutes / 60 + seconds / 3600) / 24;
		// const b = -36525 + date - 1.5 + hours / 24;
		// const c = -36525 + date - 1.5 + (hours + 1) / 24;

		$gef.latitude = Number($gef.latitude);
		$gef.longitude = Number($gef.longitude);

		const objectData = (() => {
			switch ($gef.object) {
				case 'sun':
					return getSolarData(time, $gef.longitude, $gef.latitude);
				case 'moon':
					return getMoonData(time, $gef.longitude, $gef.latitude);
				case 'stars':
					return getStarData(
						time,
						$gef.longitude,
						$gef.latitude,
						$gef.givenDateTime,
						$gef.givenStarOrPlanet!
					);
				case 'planets':
					return getPlanetData(
						time,
						$gef.givenDateTime,
						$gef.longitude,
						$gef.latitude,
						$gef.givenStarOrPlanet!
					);
			}
		})();

		if (!objectData) {
			return;
		}

		$gef.azimuth = Number(objectData.azimuth);
		$gef.LHA = Number(objectData.LHA);
		$gef.declination = Number(objectData.declination);
		$gef.GHA = Number(objectData.GHA);
	}

	onMount(() => {
		performCalculations();
	});

	let field: SvelteComponent;
	$: {
		if (field && !$gef.givenStarOrPlanet) {
			field.openRemotely();
		}
	}

	let isLoadingPosition: boolean = false;
	let positionObtained = false;

	function updatePosition() {
		isLoadingPosition = true;

		getCurrentPosition()
			.then((position) => {
				if (position) {
					$gef.longitude = Number(position.coords.longitude);
					$gef.latitude = Number(position.coords.latitude);
					positionObtained = !positionObtained;
					performCalculations();
				}
			})
			.finally(() => {
				isLoadingPosition = false;
			});
	}

	function isDefinedNumber(numbers: Array<number | undefined | null>): boolean {
		if (numbers.some((number) => number === undefined || number === null)) {
			return false;
		}

		return true;
	}

	// $: if (object && givenDateTime && latitude != null && longitude != null) {
	// 	gyroErrorData.set({
	// 		object,
	// 		givenDateTime,
	// 		longitude,
	// 		latitude,
	// 		azimuth,
	// 		GB,
	// 		GC,
	// 		MC,
	// 		variation,
	// 		GHA,
	// 		LHA,
	// 		declination,
	// 		givenStarOrPlanet,
	// 	});
	// }

	title.set('Gyro Error');
</script>

<EqualGrid --desktopColumnsQty={2} --mobileColumnsQty={1} --tabletColumnsQty={1}>
	<div class="vertical-flex max-width space-xl">
		<Section title="General data">
			<FormItem label="Choose object">
				<SelectButtons
					items={solarSystemObjects}
					bind:selectedItem={$gef.object}
					on:choose={() => {
						$gef.givenStarOrPlanet = undefined;
						if ($gef.object === 'sun' || $gef.object === 'moon') performCalculations();
					}} />
			</FormItem>
			{#key $gef.object}
				{#if $gef.object === 'planets' || $gef.object === 'stars'}
					<Select
						bind:this={field}
						items={celestialObjects[$gef.object]}
						bind:value={$gef.givenStarOrPlanet}
						placeholder="Choose object"
						on:select={performCalculations}></Select>
				{/if}
			{/key}
			<DateTimeInput
				label="UTC Date and time"
				bind:value={$gef.givenDateTime}
				on:change={performCalculations}
				showCurrentDateTimeButton
				isUTC />
			<FormItem label="Latitude">
				{#key positionObtained}
					<CoordinatesInput
						coordinatesType="latitude"
						bind:value={$gef.latitude}
						on:change={performCalculations} />
				{/key}
			</FormItem>
			<FormItem label="Longitude">
				{#key positionObtained}
					<CoordinatesInput
						coordinatesType="longitude"
						bind:value={$gef.longitude}
						on:change={performCalculations} />
				{/key}
			</FormItem>
			<Button
				type="transparent"
				icon={Locate}
				label="Set current position"
				onclick={updatePosition}
				isLoading={isLoadingPosition}
				full />
		</Section>
		<Section title="Calculated data">
			<FormItem label="GHA" text={transformToCoordinates($gef.GHA!)} />
			<FormItem label="LHA" text={$gef.LHA ? transformToCoordinates($gef.LHA) : '-'} />
			<FormItem label="Declination" text={transformToCoordinates($gef.declination!, 'y')} />
			<FormItem label="Azimuth" text="{Number($gef.azimuth).toFixed(1)}°" />
		</Section>
	</div>
	<div class="vertical-flex max-width space-xl">
		<Section title="Ship's heading">
			<FormItem
				label="True course"
				text={isDefinedNumber([TC]) ? formatToAngle(mod(TC!, 360)) : '-'} />
			<FormItem label="Gyro course">
				<Input
					type="number"
					bind:value={$gef.GC}
					min={0}
					max={360}
					step={0.1}
					suffix="deg"
					placeholder="181.0°" />
			</FormItem>
			<FormItem label="Standard / magnetic course">
				<Input
					type="number"
					bind:value={$gef.MC}
					min={0}
					max={360}
					step={0.1}
					suffix="deg"
					placeholder="182.0°" />
			</FormItem>
		</Section>
		<Section title="Object's bearing">
			<FormItem
				label="True bearing"
				text={isDefinedNumber([$gef.azimuth]) ? formatToAngle($gef.azimuth!) : '-'} />
			<FormItem
				label="Standard / magnetic bearing"
				text={isDefinedNumber([$gef.MC, TC, $gef.azimuth])
					? formatToAngle($gef.azimuth! + ($gef.MC! - TC!))
					: '-'} />
			<FormItem label="Gyro bearing">
				<Input
					type="number"
					bind:value={$gef.GB}
					min={0}
					max={360}
					step={0.1}
					suffix="deg"
					placeholder="242.3°" />
			</FormItem>
		</Section>
		<Section title="Corrections">
			<FormItem
				label="Gyro Error"
				text={isDefinedNumber([$gef.azimuth, $gef.GB])
					? formatToCompassError($gef.azimuth! - $gef.GB!)
					: '-'} />
			<FormItem
				label="Standard"
				text={isDefinedNumber([$gef.MC, TC, $gef.azimuth])
					? formatToCompassError(TC! - $gef.MC!)
					: '-'} />
			<FormItem
				label="Deviation"
				text={isDefinedNumber([TC, $gef.MC, $gef.variation])
					? formatToCompassError(TC! - $gef.MC! - $gef.variation!)
					: '-'} />
			<FormItem label="Variation">
				<VariationInput bind:value={$gef.variation!} />
			</FormItem>
		</Section>
	</div>
</EqualGrid>
