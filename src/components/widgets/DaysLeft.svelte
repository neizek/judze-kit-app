<script lang="ts">
  import { daysCounterStore } from "$lib/daysCounter";
  import CircleDiagram from "../ui/CircleDiagram.svelte";
//   import EqualGrid from "../ui/EqualGrid.svelte";

	export let startDate: Date;
	export let endDate: Date;
	
	const today: Date = new Date(Date.now());
	const oneDay = 24 * 60 * 60 * 1000;

	function getDaysBetweenDates(startDate: Date, endDate: Date) {
		return Math.round(Math.abs((Number(endDate) - Number(startDate)) / oneDay));
	}

	let daysTotal = getDaysBetweenDates(startDate, endDate);
	let daysPassed = getDaysBetweenDates(startDate, today);
	let daysLeft = daysTotal - daysPassed;
	let percentsDone = Math.floor(daysPassed / daysTotal * 100);

</script>

{#if $daysCounterStore.enabled}
	<div class="equal-flex space">
		<CircleDiagram percentage="{percentsDone}" style="max-height: 190px;">
			<span class="absolute-center text-size-l text-weight-l">{percentsDone}%</span>
		</CircleDiagram>
		<div class="vertical-flex doubled" style="justify-content: space-around;">
			<h2 class="text-centered">Days Counter</h2>
			<div class="equal-flex">
				<div class="vertical-flex space centered-content">
					<span class="text-size-l text-weight-l">{daysPassed}</span>
					<span class="text-centered">on board</span>
				</div>
				<div class="vertical-flex space centered-content">
					<span class="text-size-l text-weight-l">{daysLeft}</span>
					<span class="text-centered">left</span>
				</div>
				<div class="vertical-flex space centered-content">
					<span class="text-size-l text-weight-l">{daysTotal}</span>
					<span class="text-centered">total</span>
				</div>
			</div>
		</div>
	</div>
{/if}