<script lang="ts">
	import { daysCounterStore } from "$lib/daysCounter";
	import { theme, themesItems } from "$lib/theme";
	import Button from "../ui/Button.svelte";
	import DatePicker from "../ui/DatePicker/DatePicker.svelte";
	import FormItem from "../ui/FormItem.svelte";
	import SelectButtons from "../ui/SelectButtons.svelte";
	import Switch from "../ui/Switch.svelte";

	export let closePopup: ((id: number) => void) | undefined = undefined;
	export let popupId: number | undefined = undefined;

	let startDate: Date = $daysCounterStore.startFrom;
	let endDate: Date = $daysCounterStore.endTo;
	let daysCounterEnabled: boolean = $daysCounterStore.enabled;
	
	function handleSave() {
		$daysCounterStore.startFrom = startDate;
		$daysCounterStore.endTo = endDate;
		if (closePopup && popupId) closePopup(popupId);
	}
</script>
<div class="Settings vertical-flex space-xl">
	<FormItem label="Color theme">
		<SelectButtons
			items="{themesItems}"
			bind:selectedItem={$theme}
		/>
	</FormItem>
	<FormItem label="Days counter">
		<Switch
			bind:value="{daysCounterEnabled}"
			onChange="{() => $daysCounterStore.enabled = !daysCounterEnabled}"
			label="Switch on / off days counter"
		/>
	</FormItem>
	{#if $daysCounterStore.enabled}
		<FormItem label="Start of the contract">
			<DatePicker bind:value="{startDate}" maxDate="{endDate}"/>
		</FormItem>
		<FormItem label="End of the contract">
			<DatePicker bind:value="{endDate}" minDate="{startDate}"/>
		</FormItem>
		<Button label="Save" type="primary" on:click="{handleSave}" />
	{/if}
</div>

<style lang="scss">
	@include after-mobile {
		.Settings {
			min-width: 300px;
		}
	}
</style>