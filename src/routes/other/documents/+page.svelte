<script lang="ts">
	import {
		getCategories,
		initializeDocuments,
		type DocumentsCategoryType,
	} from "$lib/documents";
	import { title } from "$lib/meta";
	import { getContext, onMount } from "svelte";
	import Button from "../../../components/ui/Button.svelte";
	import Loader from "../../../components/ui/Loader.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
	import NewDocumentForm from "./NewDocumentForm.svelte";

	initializeDocuments();

	title.set("Documents");
	let categories: DocumentsCategoryType[] | undefined = undefined;

	const createPopup: CreatePopup = getContext("createPopup");

	onMount(() => {
		getCategories().then((categoriesFromDB) => {
			categories = categoriesFromDB;
		});
	});

	function handleNewDocument() {
		createPopup({
			header: "Add new document",
			content: {
				component: NewDocumentForm,
				props: {
					categories: categories,
				},
			},
		});
	}

	// const documentCategories = getCategories();
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
				<div class="centered-content vertical-flex space">
					<span class="material-icons notranslate">folder_off</span>
					<span>No any documents added</span>
				</div>
			</Section>
		{/each}
	</div>
{/if}
