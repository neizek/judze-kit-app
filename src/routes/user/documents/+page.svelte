<script lang="ts">
	import {
		getDocuments,
		type DocumentsCategoryType,
		type DocumentType,
	} from '$lib/utils/documents';
	import { title } from '$lib/stores/meta';
	import { onMount } from 'svelte';
	import Button from '$ui/Button.svelte';
	import Loader from '$ui/Loader.svelte';
	import Section from '$ui/Section.svelte';
	import NewDocumentForm from './NewDocumentForm.svelte';
	import { formatDateSimple } from '$lib/utils/datetime';
	import DocumentDetails from './DocumentDetails.svelte';
	import EmptySection from '$ui/EmptySection.svelte';
	import { createPopup } from '$widgets/PopUp';

	title.set('Documents');

	interface CategoryType extends DocumentsCategoryType {
		documents?: DocumentType[];
	}

	let categories: CategoryType[] | undefined = undefined;

	onMount(() => {
		getDocuments().then((result) => {
			if (!result) {
				return;
			}

			categories = result.categories;
			const docs = result.list;

			docs.forEach((document) => {
				let desiredCategory = categories?.find(
					(category) => category.id === document.category
				);
				if (desiredCategory && categories) {
					if (!desiredCategory.documents) {
						desiredCategory.documents = [];
					}
					desiredCategory.documents = [...desiredCategory.documents, document];
				}
			});
		});
	});

	function handleNewDocument() {
		createPopup({
			header: 'Add new document',
			content: {
				component: NewDocumentForm,
				props: {
					categories: categories?.map((category) => ({
						value: category.id,
						label: category.label,
					})),
				},
			},
		});
	}

	function showDetails(document: DocumentType) {
		createPopup({
			header: "Document's detals",
			content: {
				component: DocumentDetails,
				props: {
					document,
				},
			},
		});
	}
</script>

{#if !categories}
	<div class="absolute-center">
		<Loader --size="48px" --line-width="4px" />
	</div>
{:else}
	<div class="vertical-flex space-xl max-width">
		{#each categories as category}
			<Section title={category.label}>
				<div slot="controls">
					<Button label="New document" icon="add" on:click={handleNewDocument} />
				</div>
				{#if !category.documents || category.documents?.length === 0}
					<EmptySection note="No any documents added" icon="folder_off" />
				{:else}
					<div class="vertical-flex space-l">
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						{#each category.documents as document}
							<div class="space-between" on:click={() => showDetails(document)}>
								<span>{document.name}</span>
								<span class="text-size-xs">
									{formatDateSimple(document.expiryDate)}
								</span>
							</div>
						{/each}
					</div>
				{/if}
			</Section>
		{/each}
	</div>
{/if}
