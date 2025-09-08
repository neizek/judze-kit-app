<script lang="ts">
	import Button from '$ui/Button.svelte';
	import Section from '$ui/Section.svelte';
	import { onMount } from 'svelte';
	import AddVoyageForm from './AddVoyageForm.svelte';
	import EmptySection from '$ui/EmptySection.svelte';
	import { title } from '$lib/stores/meta';
	import { addItem, getAll } from '$lib/utils/idb';
	import { dbStoresEnum } from '$lib/enums/db';
	import type { Voyage } from '$lib/types/seaservice';
	import { getDuration } from '$lib/utils/datetime';
	import VoyageCard from './VoyageCard.svelte';
	import { createPopup } from '$widgets/PopUp';

	let voyages: Voyage[] = [];
	let isLoading: boolean = false;

	function openAddVoyageFormPopUp() {
		createPopup({
			header: 'Add new voyage',
			content: {
				component: AddVoyageForm,
				props: {
					addNewVoyage: addVoyage,
				},
			},
		});
	}

	function addVoyage(voyage: Voyage) {
		addItem(dbStoresEnum.voyage, voyage);
		retrieveVoyages();
	}

	function retrieveVoyages() {
		isLoading = true;

		getAll<Voyage>(dbStoresEnum.voyage).then((thisVoyages) => {
			isLoading = false;
			voyages = thisVoyages.map((voyage) => ({
				...voyage,
				duration: getDuration(voyage.dateFrom, voyage.dateTo),
			}));
		});
	}

	onMount(() => {
		retrieveVoyages();
	});

	$title = 'Sea service';
</script>

<Section title="List of sea service" transparent paddingless>
	<div slot="controls">
		<Button icon="add" label="Add voyage" on:click={openAddVoyageFormPopUp}></Button>
	</div>
	{#if !voyages || voyages.length === 0}
		<EmptySection note="No any voyages added" icon="waves" />
	{:else}
		{#each voyages as voyage}
			<VoyageCard {voyage} />
		{/each}
	{/if}
</Section>
