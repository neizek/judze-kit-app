<script lang="ts">
	import Calendar from './Calendar.svelte';
	import { formatDateSimple } from '$lib/utils/datetime';
	import { createEventDispatcher } from 'svelte';
	import InputButton from '../InputButton.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { Calendar1Icon, CalendarDays } from '@lucide/svelte';

	export let value: Date | undefined = undefined;
	export let minDate: Date | undefined = undefined;
	export let maxDate: Date | undefined = undefined;
	export let full: boolean = false;

	const dispatch = createEventDispatcher();

	function setDate(date: Date) {
		value = date;
		dispatch('change');
	}

	function openCalendar() {
		createPopup({
			header: 'Calendar',
			icon: CalendarDays,
			content: {
				component: Calendar,
				props: {
					date: value,
					minDate,
					maxDate,
					setDate,
				},
			},
		});
	}
</script>

<InputButton
	on:click={openCalendar}
	icon={CalendarDays}
	bind:value
	mask={formatDateSimple}
	{full}
	{...$$restProps} />
