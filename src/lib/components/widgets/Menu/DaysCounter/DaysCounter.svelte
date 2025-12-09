<script lang="ts">
	import { getDaysBetweenDates } from '$lib/utils/datetime';
	import Button from '../../../ui/Button.svelte';
	import CircleDiagram from '../../../ui/CircleDiagram.svelte';
	import { daysCounterEnabled } from '$lib/stores/daysCounter';
	import type { VoyageModel } from '$lib/types/seaservice';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { scale } from 'svelte/transition';

	export let voyage: VoyageModel | undefined;
	export let startDate: Date = voyage?.dateFrom ?? new Date();
	export let endDate: Date = voyage?.dateTo ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

	const today: Date = new Date(Date.now());

	let timePeriod: 'before' | 'after' | 'new' | undefined = (() => {
		if (!voyage) {
			return 'new';
		}

		if (startDate >= today) {
			return 'before';
		} else if (endDate <= today) {
			return 'after';
		}

		return undefined;
	})();

	let daysTotal = getDaysBetweenDates(startDate, endDate);
	let daysPassed;
	let daysLeft;

	switch (timePeriod) {
		case 'before':
			daysPassed = 0;
			daysLeft = daysTotal;
			break;
		case 'after':
			daysPassed = daysTotal;
			daysLeft = 0;
			break;
		default:
			daysPassed = getDaysBetweenDates(startDate, today);
			daysLeft = daysTotal - daysPassed;
			break;
	}

	let percentsDone = Math.floor((daysPassed / daysTotal) * 100);

	function hideWidget() {
		$daysCounterEnabled = false;
	}

	function setUpWidget() {
		goto(ROUTES.USER.SEASERVICE);
	}
</script>

{#if $daysCounterEnabled}
	<div class="equal-flex space">
		<CircleDiagram percentage={percentsDone} style="max-height: 190px;">
			<span class="absolute-center text-size-l text-weight-l">{percentsDone}%</span>
		</CircleDiagram>
		<div class="vertical-flex doubled" style="justify-content: space-around;">
			{#if timePeriod}
				<div
					class="Motivation absolute-center vertical-flex space-xl max-width centered-content">
					{#if timePeriod === 'before'}
						<span>
							Embrace the journey ahead — every wave you face will make you stronger.
						</span>
					{:else if timePeriod === 'new'}
						<span>Would you like to set up days counter?</span>
						<div class="line-blocks space">
							<Button
								type="transparent"
								label="Set up dates"
								bordered
								onclick={setUpWidget} />
							<Button
								type="transparent"
								label="Hide counter"
								bordered
								onclick={hideWidget} />
						</div>
					{:else}
						<span>Congratulations on completing another chapter of your journey!</span>
						<Button
							type="transparent"
							label="Hide counter"
							bordered
							onclick={hideWidget} />
					{/if}
				</div>
			{/if}
			<h2 class="text-centered" class:blured={timePeriod}>Days Counter</h2>
			<div class="equal-flex" class:blured={timePeriod}>
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

<style lang="scss">
	.Motivation {
		z-index: 10;
		text-align: center;
		max-width: 90%;
		font-size: var(--font-size-m);

		@include after-mobile {
			max-width: 70%;
			font-size: var(--font-size-xl);
		}
	}
	.blured {
		filter: blur(12px);
	}
</style>
