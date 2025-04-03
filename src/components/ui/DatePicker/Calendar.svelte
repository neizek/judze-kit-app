<script lang="ts">
	import { onDestroy } from "svelte";

	export let date: Date | undefined = undefined;
	export let minDate: Date | undefined = undefined;
	export let maxDate: Date | undefined = undefined;
	export let disabled: boolean = false;
	export let setDate: (date: Date) => void;
	export let closePopup: ((id: number) => void) | undefined = undefined;
	export let popupId: number | undefined = undefined;

	if (minDate) minDate.setUTCHours(0, 0, 0, 0);
	if (maxDate) maxDate.setUTCHours(0, 0, 0, 0);

	let handledDate: Date = date ? new Date(date) : new Date();
	let rows = Array(5).fill([]);

	$: {
		handledDate;
		constructDays();
	}

	function constructDays() {
		const year = handledDate.getFullYear();
		const month = handledDate.getMonth();
		const maxDays = new Date(year, month + 1, 0).getDate();
		const firstDayIndex = new Date(year, month, 1).getDay() - 1;
		let rowIndex = 0;
		rows = Array(6).fill([]);
		let index = 0;
		let currentDayIndex = 1;

		while (currentDayIndex <= maxDays) {
			if (!rows[rowIndex]) {
				rows[rowIndex] = [];
			}

			if (index % 7 === 0 && index > 0) rowIndex++;

			if (index < firstDayIndex) {
				rows[rowIndex] = [...rows[rowIndex], 0];
			} else {
				rows[rowIndex] = [...rows[rowIndex], currentDayIndex];
				currentDayIndex++;
			}

			index++;
		}
	}

	function nextMonth() {
		handledDate = new Date(handledDate.setMonth(handledDate.getMonth() + 1));
	}

	function previousMonth() {
		handledDate = new Date(handledDate.setMonth(handledDate.getMonth() - 1));
	}

	function chooseDate(thisDate: Date) {
		if (minDate && thisDate <= minDate) {
			return;
		}

		if (maxDate && thisDate >= maxDate) {
			return;
		}
		date = thisDate;
		setDate(thisDate);
		if (closePopup && popupId) closePopup(popupId);
	}
</script>

<section class="Calendar vertical-flex space">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<header class="space-between">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="button transparent" on:click={previousMonth}>
			<span class="material-icons notranslate">chevron_left</span>
		</div>
		<span class="text-size-m"
			>{handledDate.toLocaleString("default", {
				month: "long",
				year: "numeric",
			})}</span
		>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="button transparent" on:click={nextMonth}>
			<span class="material-icons notranslate">chevron_right</span>
		</div>
	</header>
	<article class="columns">
		{#each rows as row}
			<div class="rows">
				{#each row as day}
					{@const thisDate = new Date(
						Date.UTC(handledDate.getFullYear(), handledDate.getMonth(), day)
					)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class={date?.toDateString() === thisDate.toDateString()
							? `primary`
							: `transparent`}
						class:button={day !== 0}
						class:disabled={(minDate && thisDate <= minDate) ||
							(maxDate && thisDate >= maxDate) ||
							disabled}
						on:click={() => {
							chooseDate(thisDate);
						}}
					>
						<span class="text-noselect">{day ? day.toString() : ""}</span>
					</div>
				{/each}
			</div>
		{/each}
	</article>
</section>

<style lang="scss">
	.columns {
		display: grid;
		gap: 8px;
		grid-template-rows: repeat(6, 1fr);
	}

	.rows {
		display: grid;
		gap: 8px;
		grid-template-columns: repeat(7, 1fr);
	}

	.button {
		aspect-ratio: 1 / 1;
		justify-content: center;
		padding: 4px;
		background-color: var(--button-background-color-hover);
		&.primary {
			background-color: var(--primary-color);
		}

		&.disabled {
			opacity: 0.5;

			&:hover {
				background-color: transparent;
			}
		}
	}
</style>
