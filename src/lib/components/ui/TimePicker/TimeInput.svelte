<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte";
	import type { CreatePopup } from "../../widgets/PopUp.svelte";
	import TimeWheel from "./TimeWheel.svelte";
	import { getTimeFromDate } from "$lib/utils/datetime";
	import InputButton from "../InputButton.svelte";

	export let value: Date;

	const createPopup: CreatePopup = getContext("createPopup");
	const dispatch = createEventDispatcher();

	function confirmTime(hours: number, minutes: number, seconds: number) {
		value = new Date(value.setUTCHours(hours, minutes, seconds));
		dispatch("change");
	}

	function openTimeWheel(event: Event) {
		event?.preventDefault();
		createPopup({
			header: "Time setup",
			content: {
				component: TimeWheel,
				props: {
					hours: value.getUTCHours(),
					minutes: value.getUTCMinutes(),
					seconds: value.getUTCSeconds(),
					confirmTime: confirmTime,
				},
			},
		});
	}
</script>

<InputButton on:click={openTimeWheel} bind:value mask={getTimeFromDate} />
