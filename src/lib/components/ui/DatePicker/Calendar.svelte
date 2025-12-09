<script lang="ts">
	import Button from '$ui/Button.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	interface CalendarRow {
		label: string;
		disabled?: boolean;
		active?: boolean;
		onclick?: () => void;
	}

	export let date: Date | undefined = undefined;
	export let minDate: Date | undefined = undefined;
	export let maxDate: Date | undefined = undefined;
	// export let disabled: boolean = false;
	export let setDate: (date: Date) => void;
	export let closePopup: (() => void) | undefined = undefined;

	if (minDate) minDate.setUTCHours(0, 0, 0, 0);
	if (maxDate) maxDate.setUTCHours(0, 0, 0, 0);

	let handledDate: Date = date ? new Date(date) : new Date();
	let rows: CalendarRow[][];
	let mode: 'days' | 'months' | 'years' = 'days';

	$: {
		handledDate;
		if (mode === 'days') constructDays();
		if (mode === 'months') constructMonths();
		if (mode === 'years') constructYears();
	}

	// #region Constructors

	function constructDays() {
		mode = 'days';
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
				rows[rowIndex] = [...rows[rowIndex], { label: '', disabled: true }];
			} else {
				const thisDate = new Date(
					Date.UTC(handledDate.getFullYear(), handledDate.getMonth(), currentDayIndex)
				);

				rows[rowIndex] = [
					...rows[rowIndex],
					{
						label: String(currentDayIndex),
						onclick: () => chooseDate(thisDate),
						active: date?.toDateString() === thisDate.toDateString(),
						disabled:
							(minDate && thisDate <= minDate) || (maxDate && thisDate >= maxDate),
					},
				];

				currentDayIndex++;
			}

			index++;
		}
	}

	function constructMonths() {
		mode = 'months';
		const monthsQty = 12;
		let currentMonthIndex = 0;
		let rowIndex = 0;
		let index = 0;
		rows = Array(4).fill([]);

		while (currentMonthIndex < monthsQty) {
			if (!rows[rowIndex]) {
				rows[rowIndex] = [];
			}

			if (index % 3 === 0 && index > 0) rowIndex++;

			const thisDate = new Date(
				Date.UTC(handledDate.getFullYear(), currentMonthIndex, handledDate.getDate())
			);

			rows[rowIndex] = [
				...rows[rowIndex],
				{
					label: thisDate.toLocaleString('default', { month: 'long' }),
					onclick: () => chooseMonth(thisDate),
					active: handledDate.getMonth() === thisDate.getMonth(),
					disabled: (minDate && thisDate <= minDate) || (maxDate && thisDate >= maxDate),
				},
			];

			currentMonthIndex++;
			index++;
		}
	}

	function constructYears() {
		mode = 'years';
		const currentYear = handledDate.getFullYear();
		const minYear = currentYear - 7;
		const maxYear = currentYear + 8;
		let currentYearIndex = minYear;
		let rowIndex = 0;
		let index = 0;
		rows = Array(4).fill([]);

		while (currentYearIndex < maxYear) {
			if (!rows[rowIndex]) {
				rows[rowIndex] = [];
			}

			if (index % 4 === 0 && index > 0) rowIndex++;

			const thisDate = new Date(
				Date.UTC(currentYearIndex, handledDate.getMonth(), handledDate.getDate())
			);

			rows[rowIndex] = [
				...rows[rowIndex],
				{
					label: thisDate.toLocaleString('default', { year: 'numeric' }),
					onclick: () => chooseYear(thisDate),
					active: date?.getFullYear() === thisDate.getFullYear(),
					disabled: (minDate && thisDate < minDate) || (maxDate && thisDate > maxDate),
				},
			];

			currentYearIndex++;
			index++;
		}
	}

	//#region Handling controls

	function nextMonth() {
		handledDate = new Date(handledDate.setMonth(handledDate.getMonth() + 1));
	}

	function previousMonth() {
		handledDate = new Date(handledDate.setMonth(handledDate.getMonth() - 1));
	}

	function nextYears() {
		handledDate = new Date(handledDate.setFullYear(handledDate.getFullYear() + 10));
	}

	function previousYears() {
		handledDate = new Date(handledDate.setFullYear(handledDate.getFullYear() - 10));
	}

	// #region Handling chosing

	function chooseDate(thisDate: Date) {
		if (minDate && thisDate <= minDate) {
			return;
		}

		if (maxDate && thisDate >= maxDate) {
			return;
		}

		date = thisDate;
		setDate(thisDate);
		if (closePopup) closePopup();
	}

	function chooseMonth(thisDate: Date) {
		if (minDate && thisDate <= minDate) {
			return;
		}

		if (maxDate && thisDate >= maxDate) {
			return;
		}

		handledDate = thisDate;
		date = thisDate;
		constructDays();
	}

	function chooseYear(thisDate: Date) {
		if (minDate && thisDate <= minDate) {
			return;
		}

		if (maxDate && thisDate >= maxDate) {
			return;
		}

		handledDate = thisDate;
		date = thisDate;
		constructMonths();
	}
</script>

<section class="Calendar vertical-flex space">
	<!-- svelte-ignore a11y_no_static_element_interactions -->

	{#if mode === 'days'}
		<header class="space-between">
			<Button type="transparent" icon={ChevronLeft} onclick={previousMonth} />
			<Button
				type="transparent"
				label={handledDate.toLocaleString('default', { month: 'long' })}
				onclick={constructMonths}
				full />
			<Button
				type="transparent"
				label={String(handledDate.getFullYear())}
				onclick={constructYears}
				full />
			<Button type="transparent" icon={ChevronRight} onclick={nextMonth} />
		</header>
	{/if}
	{#if mode === 'months'}
		<header class="line-blocks centered-content">
			<Button
				type="transparent"
				label={String(handledDate.getFullYear())}
				onclick={constructYears}
				full />
		</header>
	{/if}
	{#if mode === 'years'}
		<header class="space-between">
			<button on:click={previousYears}>
				<ChevronLeft />
			</button>
			<button on:click={nextYears}>
				<ChevronRight />
			</button>
		</header>
	{/if}
	<article class="columns {mode}">
		{#key rows}
			{#each rows as row}
				<div class="rows {mode}">
					{#each row as item}
						<Button
							type={item.active ? 'primary' : 'tonal'}
							label={item.label}
							onclick={item.onclick}
							disabled={item.disabled}
							size="s"
							full />
						<!-- {@const thisDate = new Date(
						Date.UTC(handledDate.getFullYear(), handledDate.getMonth(), day)
					)}
					<button
						class={date?.toDateString() === thisDate.toDateString()
							? `primary`
							: `transparent`}
						class:button={day !== 0}
						class:disabled={(minDate && thisDate <= minDate) ||
							(maxDate && thisDate >= maxDate) ||
							disabled}
						on:click={() => {
							chooseDate(thisDate);
						}}>
						<span class="text-noselect">{day ? day.toString() : ''}</span>
					</button> -->
					{/each}
				</div>
			{/each}
		{/key}
	</article>
</section>

<style lang="scss">
	.columns {
		display: grid;
		gap: 8px;

		&.days {
			grid-template-rows: repeat(6, 1fr);
		}

		&.months {
			grid-template-rows: repeat(4, 1fr);
		}

		&.years {
			grid-template-rows: repeat(4, 1fr);
		}
	}

	.rows {
		display: grid;
		gap: 8px;

		&.days {
			:global(button) {
				aspect-ratio: 1/1;
				height: auto;
			}
			grid-template-columns: repeat(7, 1fr);
		}

		&.months {
			grid-template-columns: repeat(3, 1fr);
		}

		&.years {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
