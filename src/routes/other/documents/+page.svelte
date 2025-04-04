<script lang="ts">
	import {
		getDocuments,
		type DocumentsCategoryType,
		type DocumentType,
	} from "$lib/documents";
	import { title } from "$lib/meta";
	import { getContext, onMount } from "svelte";
	import Button from "../../../components/ui/Button.svelte";
	import Loader from "../../../components/ui/Loader.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
	import NewDocumentForm from "./NewDocumentForm.svelte";
	import { formatDateSimple } from "$lib/datetime";
	import DocumentDetails from "./DocumentDetails.svelte";

	title.set("Documents");

	interface CategoryType extends DocumentsCategoryType {
		documents?: DocumentType[];
	}

	let categories: CategoryType[] | undefined = undefined;

	const createPopup: CreatePopup = getContext("createPopup");

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
			header: "Add new document",
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
		<div class="line-blocks space" style="align-self: end;">
			<Button
				label="New document"
				icon="add"
				type="primary"
				on:click={handleNewDocument}
			/>
		</div>
		{#each categories as category}
			<Section title={category.label}>
				{#if !category.documents || category.documents?.length === 0}
					<div class="centered-content vertical-flex space">
						<span class="material-icons notranslate">folder_off</span>
						<span>No any documents added</span>
					</div>
				{:else}
					<div class="vertical-flex space-l">
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						{#each category.documents as document}
							<div class="space-between" on:click={() => showDetails(document)}>
								<span>{document.name}</span>
								<span class="text-size-xs"
									>{formatDateSimple(document.expiryDate)}</span
								>
							</div>
						{/each}
					</div>
				{/if}
			</Section>
		{/each}
	</div>
{/if}
