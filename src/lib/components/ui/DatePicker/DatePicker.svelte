<script lang="ts">
	import Calendar from "./Calendar.svelte";
	import { formatDateSimple } from "$lib/utils/datetime";
	import type { CreatePopup } from "../../widgets/PopUp.svelte";
	import { createEventDispatcher, getContext, onMount } from "svelte";
	import InputButton from "../InputButton.svelte";

	export let value: Date | undefined = undefined;
	export let minDate: Date | undefined = undefined;
	export let maxDate: Date | undefined = undefined;

	const dispatch = createEventDispatcher();

	function setDate(date: Date) {
		value = date;
		dispatch("change");
	}

	const createPopup: CreatePopup = getContext("createPopup");

	function openCalendar() {
		createPopup({
			header: "Calendar",
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

<InputButton on:click={openCalendar} bind:value mask={formatDateSimple} />
