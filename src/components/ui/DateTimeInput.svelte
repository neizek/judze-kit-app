<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Input from "./Input.svelte";
    import FormItem from "./FormItem.svelte";

	let day: number;
	let month: number;
	let year: number;
	let hours: number;
	let minutes: number;
	let seconds: number;

	export let value: Date;

	if (value) {
		day = value.getUTCDay();
		month = value.getUTCMonth() + 1;
		year = value.getUTCFullYear();
		hours = value.getUTCHours();
		minutes = value.getUTCMinutes();
		seconds = value.getUTCSeconds();
	}

	const dispatch = createEventDispatcher();

	$: {
		if (day, month, year, hours, minutes, seconds) {
			value = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
			dispatch('change')
		}
	}
</script>
<div class="vertical-flex space max-width">
	<FormItem label="UTC Date">
		<div class="Date">
			<Input type="number" bind:value="{day}" min="{1}" max="{31}" />
			<Input type="number" bind:value="{month}" min="{1}" max="{12}"/>
			<Input type="number" bind:value="{year}" min="{1994}" max="{2300}" />
		</div>
	</FormItem>
	<FormItem label="UTC Time">
		<div class="Time">
			<Input type="number" bind:value="{hours}" min="{0}" max="{23}" />
			<Input type="number" bind:value="{minutes}" min="{0}" max="{59}" />
			<Input type="number" bind:value="{seconds}" min="{0}" max="{59}" />
		</div>
	</FormItem>
</div>

<style lang="scss">
	.Date,
	.Time {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 6px;
		align-items: center;
	}
</style>