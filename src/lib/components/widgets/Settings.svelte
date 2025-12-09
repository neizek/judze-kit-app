<script lang="ts">
	// import { daysCounterStore } from '$lib/stores/daysCounter';
	import { isOfflineMode } from '$lib/stores/offlineMode';
	import { theme, themesItems } from '$lib/stores/theme';
	// import Button from '../ui/Button.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import SelectButtons from '../ui/SelectButtons.svelte';
	import Switch from '../ui/Switch.svelte';
	// import DaysCounterSetup from './Menu/DaysCounter/DaysCounterSetup.svelte';
	// import { createPopup } from './PopUp';
	// import { Settings } from '@lucide/svelte';

	// let daysCounterEnabled: boolean = $daysCounterStore.enabled;

	// function openDaysCounterSetup() {
	// 	createPopup({
	// 		header: 'Days Counter setup',
	// 		content: {
	// 			component: DaysCounterSetup,
	// 		},
	// 	});
	// }
</script>

<div class="Settings vertical-flex space-xl">
	<FormItem label="Color theme">
		<SelectButtons items={themesItems} bind:selectedItem={$theme} />
	</FormItem>
	<!-- <FormItem label="Days counter">
		<Switch
			bind:value={daysCounterEnabled}
			onChange={() => ($daysCounterStore.enabled = !daysCounterEnabled)}
			label="Switch on / off days counter" />
		{#if $daysCounterStore.enabled}
			<Button
				icon={Settings}
				label="Set up widget"
				type="transparent"
				on:click={openDaysCounterSetup}
				bordered />
		{/if}
	</FormItem> -->
	<FormItem label="Offline mode">
		<Switch label="Disable data consumption" bind:value={$isOfflineMode} />
	</FormItem>
</div>

<style lang="scss">
	@include after-mobile {
		.Settings {
			min-width: 300px;
		}
	}
</style>
