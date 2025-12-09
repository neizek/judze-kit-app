<script lang="ts">
	import Button from '$ui/Button.svelte';
	import Section from '$ui/Section.svelte';
	import AddVoyageForm from './AddVoyageForm.svelte';
	import EmptySection from '$ui/EmptySection.svelte';
	import { title } from '$lib/stores/meta';
	import VoyageCard from './VoyageCard.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { Cog, Plus, Settings, Waves } from '@lucide/svelte';
	import SeaServiceSettings from './SeaServiceSettings.svelte';
	import { seaServiceVisible } from '$lib/stores/seaService';
	import { flip } from 'svelte/animate';
	import StatsSection from './StatsSection.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';

	function openAddVoyageFormPopUp() {
		createPopup({
			header: 'New voyage',
			icon: Plus,
			content: {
				component: AddVoyageForm,
			},
		});
	}

	function openSeaServiceSettingsPopUp() {
		createPopup({
			header: 'Sea service settings',
			icon: Cog,
			content: {
				component: SeaServiceSettings,
			},
		});
	}

	$title = 'Sea service';
</script>

<EqualGrid --desktopColumnsQty={2} --tabletColumnsQty={1} --mobileColumnsQty={1}>
	{#if $seaServiceVisible && $seaServiceVisible.length > 0}
		{#key $seaServiceVisible}
			<StatsSection />
		{/key}
	{/if}
	<Section title="List of sea service" transparent paddingless>
		<div class="flex space-s" slot="controls">
			<Button type="transparent" icon={Plus} label="Add" onclick={openAddVoyageFormPopUp} />
			<Button type="transparent" icon={Settings} onclick={openSeaServiceSettingsPopUp} />
		</div>
		{#if !$seaServiceVisible || $seaServiceVisible.length === 0}
			<EmptySection note="No any voyages added" icon={Waves} />
		{:else}
			{#each $seaServiceVisible as voyage (voyage.id)}
				<div animate:flip={{ duration: 200 }}>
					<VoyageCard {voyage} />
				</div>
			{/each}
		{/if}
	</Section>
</EqualGrid>
