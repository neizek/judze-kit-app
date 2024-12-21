<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Input from "./Input.svelte";
    import Select from "./Select/Select.svelte";
	export let coordinatesType: 'longitude' | 'latitude';
	let items = {
		latitudeItems: [
			{value: 'n', label: 'N'},
			{value: 's', label: 'S'}
		],
		longitudeItems: [
			{value: 'e', label: 'E'},
			{value: 'w', label: 'W'}			
		]
	}

	let degrees: number;
	let minutes: number;
	let seconds: number;
	let direction: 's' | 'n' | 'e' | 'w';
	export let value: number;

	const dispatch = createEventDispatcher();

	$: {
		if (degrees || minutes || seconds || direction) {
			value = Number(degrees) + (Number(minutes) / 60) + (Number(seconds) / 3600);
			value = direction === 's' || direction === 'w' ? -value : value;
			dispatch('change');
		}
	}

	if (value) {
		degrees = Math.trunc(value);
		minutes = Math.trunc((value - degrees) / 60);
		seconds = 0;
		if (coordinatesType === 'longitude') {
			direction = value < 0 ? 'e' : 'w';
		} else {
			direction = value < 0 ? 's' : 'n';
		}
	}
</script>
<div class="Coordinate">
	<Input
		type="number"
		min="{0}"
		max="{coordinatesType === 'latitude' ? 90 : 180}"
		bind:value="{degrees}"
	/>
	<!-- <span>°</span> -->
	<Input
		type="number"
		min="{0}"
		max="{59}"
		bind:value="{minutes}"
	/>
	<!-- <span>.</span> -->
	<Input
		type="number"
		min="{0}"
		max="{9}"
		bind:value="{seconds}"
	/>
	<!-- <span>'</span> -->
	<Select
		items="{coordinatesType === 'latitude' ? items.latitudeItems : items.longitudeItems}"
		bind:value="{direction}"
	/>
</div>

<style lang="scss">
	.Coordinate {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr 1fr;
		gap: 6px;
	}
</style>
