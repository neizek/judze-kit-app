<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import TimeWheel from './TimeWheel.svelte';
	import { getTimeFromDate } from '$lib/utils/datetime';
	import InputButton from '../InputButton.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { Clock } from '@lucide/svelte';

	export let value: Date;
	export let withSeconds: boolean = true;

	const dispatch = createEventDispatcher();

	function confirmTime(hours: number, minutes: number, seconds: number) {
		value = new Date(value.setUTCHours(hours, minutes, seconds));
		dispatch('change');
	}

	function openTimeWheel(event: Event) {
		event?.preventDefault();

		createPopup({
			header: 'Time setup',
			content: {
				component: TimeWheel,
				props: {
					hours: value.getUTCHours(),
					minutes: value.getUTCMinutes(),
					seconds: value.getUTCSeconds(),
					withSeconds: withSeconds,
					confirmTime: confirmTime,
				},
			},
		});
	}
</script>

<InputButton
	on:click={openTimeWheel}
	bind:value
	icon={Clock}
	mask={(value) => getTimeFromDate(value, withSeconds)} />
