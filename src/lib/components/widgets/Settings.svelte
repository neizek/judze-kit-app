<script lang="ts">
	import { daysCounterStore } from "$lib/stores/daysCounter";
	import { theme, themesItems } from "$lib/stores/theme";
	import { getContext } from "svelte";
	import Button from "../ui/Button.svelte";
	import FormItem from "../ui/FormItem.svelte";
	import SelectButtons from "../ui/SelectButtons.svelte";
	import Switch from "../ui/Switch.svelte";
	import type { CreatePopup } from "./PopUp.svelte";
	import DaysCounterSetup from "./Menu/DaysCounter/DaysCounterSetup.svelte";

	const createPopup: CreatePopup = getContext("createPopup");

	let daysCounterEnabled: boolean = $daysCounterStore.enabled;

	function openDaysCounterSetup() {
		createPopup({
			header: "Days Counter setup",
			content: {
				component: DaysCounterSetup,
			},
		});
	}
</script>

<div class="Settings vertical-flex space-xl">
	<FormItem label="Color theme">
		<SelectButtons items={themesItems} bind:selectedItem={$theme} />
	</FormItem>
	<FormItem label="Days counter">
		<Switch
			bind:value={daysCounterEnabled}
			onChange={() => ($daysCounterStore.enabled = !daysCounterEnabled)}
			label="Switch on / off days counter"
		/>
		{#if $daysCounterStore.enabled}
			<Button
				icon="settings"
				label="Set up widget"
				type="transparent"
				on:click={openDaysCounterSetup}
				bordered
			/>
		{/if}
	</FormItem>
</div>

<style lang="scss">
	@include after-mobile {
		.Settings {
			min-width: 300px;
		}
	}
</style>
