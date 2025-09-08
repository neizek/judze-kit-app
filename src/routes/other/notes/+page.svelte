<script lang="ts">
	import { title } from '$lib/stores/meta';
	import Button from '$ui/Button.svelte';
	import Section from '$ui/Section.svelte';
	import NoteForm from './NoteForm.svelte';
	import EmptySection from '$ui/EmptySection.svelte';
	import { getAll } from '$lib/utils/idb';
	import { dbStoresEnum } from '$lib/enums/db';
	import type { Note } from '$lib/types/notes';
	import { createPopup } from '$widgets/PopUp';

	$title = 'Notes';

	$: notes = getAll<Note>(dbStoresEnum.note);

	function openNoteFormPopup(event: Event, id?: number) {
		createPopup({
			header: 'Create a new note',
			content: {
				component: NoteForm,
				props: {
					id,
				},
			},
		});
	}
</script>

<section class="vertical-flex max-width">
	<Section title="List of notes" transparent paddingless>
		<div slot="controls">
			<Button label="Add note" icon="data_alert" on:click={openNoteFormPopup} />
		</div>
		{#await notes then notes}
			{#if !notes || notes.length === 0}
				<EmptySection note="No any notes added" icon="waves" />
			{:else}
				{#each notes as note}
					<div class="section-box vertical-flex space">
						<div class="text-size-m">{note.title}</div>
						<span class="text-s">{note.details}</span>
					</div>
				{/each}
			{/if}
		{/await}
	</Section>
</section>
