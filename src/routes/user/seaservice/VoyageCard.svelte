<script lang="ts">
	import type { VoyageModel } from '$lib/types/seaservice';
	import DurationText from './DurationText.svelte';
	import { createPopup } from '$widgets/PopUp';
	import SeaServiceMenu from './SeaServiceMenu.svelte';
	import { ranksMap, vesselTypesMap } from '$lib/stores/lookups';
	import Badge from '$ui/Badge.svelte';

	export let voyage: VoyageModel;

	function openSeaServiceMenuPopUp() {
		createPopup({
			header: 'Voyage menu',
			content: {
				component: SeaServiceMenu,
				props: { voyage },
			},
		});
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="section-box vertical-flex space" onclick={openSeaServiceMenuPopUp}>
	<div class="text-size-l">{voyage.vessel}</div>
	<div class="space-between">
		<div class="flex space-m">
			<span>{$vesselTypesMap.get(voyage.vesselTypeId)?.name}</span>
			{#if voyage.rankId}
				<span>•</span>
				<span>{$ranksMap.get(voyage.rankId)?.name}</span>
			{/if}
		</div>
		{#if voyage.duration}
			<DurationText duration={voyage.duration} />
		{/if}
	</div>
	{#if voyage.syncStatus !== 'clean'}
		<div class="Badge-container">
			<Badge label="Not synced" size="xs" color="red" />
		</div>
	{/if}
</div>

<style lang="scss">
	.Badge-container {
		position: absolute;
		top: -5px;
		right: -5px;
	}
</style>
