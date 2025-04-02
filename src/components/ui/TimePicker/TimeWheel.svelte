<script lang="ts">
	import Button from "../Button.svelte";
	import EqualGrid from "../EqualGrid.svelte";
	import Wheel from "./Wheel.svelte";

	export let hours: number;
	export let minutes: number;
	export let seconds: number;
	export let confirmTime: (
		hours: number,
		minutes: number,
		seconds: number
	) => void;
	export let closePopup: ((id: number) => void) | undefined = undefined;
	export let popupId: number | undefined = undefined;

	const totalHours = 24;
	const totalMinutes = 60;
	const totalSeconds = 60;
</script>

<div class="vertical-flex space-xl">
	<EqualGrid --mobileColumnsQty="3" --desktopColumnsQty="3">
		<Wheel items={totalHours} bind:choosenItem={hours}></Wheel>
		<Wheel items={totalMinutes} bind:choosenItem={minutes}></Wheel>
		<Wheel items={totalSeconds} bind:choosenItem={seconds}></Wheel>
	</EqualGrid>
	<Button
		type="primary"
		label="Confirm time"
		on:click={() => {
			confirmTime(hours, minutes, seconds);
			if (closePopup && popupId) closePopup(popupId);
		}}
	/>
</div>
