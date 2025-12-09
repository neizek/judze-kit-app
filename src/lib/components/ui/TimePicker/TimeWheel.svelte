<script lang="ts">
	import Button from '../Button.svelte';
	import EqualGrid from '../EqualGrid.svelte';
	import Wheel from './Wheel.svelte';

	export let hours: number;
	export let minutes: number;
	export let seconds: number = 0;
	export let withSeconds: boolean = true;
	export let confirmTime: (hours: number, minutes: number, seconds: number) => void;
	export let closePopup: () => void;

	const totalHours = 24;
	const totalMinutes = 60;
	const totalSeconds = 60;
</script>

<div class="vertical-flex space-xl">
	{#if !withSeconds}
		<EqualGrid --mobileColumnsQty="2" --tabletColumnsQty="2" --desktopColumnsQty="2">
			<Wheel items={totalHours} bind:choosenItem={hours}></Wheel>
			<Wheel items={totalMinutes} bind:choosenItem={minutes}></Wheel>
		</EqualGrid>
	{:else}
		<EqualGrid --mobileColumnsQty="3" --tabletColumnsQty="3" --desktopColumnsQty="3">
			<Wheel items={totalHours} bind:choosenItem={hours}></Wheel>
			<Wheel items={totalMinutes} bind:choosenItem={minutes}></Wheel>
			<Wheel items={totalSeconds} bind:choosenItem={seconds}></Wheel>
		</EqualGrid>
	{/if}
	<Button
		type="primary"
		label="Confirm time"
		onclick={() => {
			confirmTime(hours, minutes, withSeconds ? seconds : 0);
			closePopup();
		}}
		full />
</div>
