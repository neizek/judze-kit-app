<script lang="ts">
	import { chimes } from "$lib/chime";
	import { title } from "$lib/meta";
	import { getContext } from "svelte";
	import Button from "../../../components/ui/Button.svelte";
	import Details from "../../../components/ui/Details.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
  import NewChimeForm from "./NewChimeForm.svelte";

	$title = 'Custom notifications'

	const createPopup: CreatePopup = getContext('createPopup');

	function addLocalNotification() {
		createPopup({
			header: "Create new custom notification",
			content: {
				component: NewChimeForm,
				props: {
					
				}
			}
		})
	}
</script>

<section class="vertical-flex max-width">
	<Section>
		<Details header="Description">
			This section is made for creating custom notifications to plan your job accordingly.
		</Details>
		<Button type="primary" label="Add new" on:click="{addLocalNotification}" />
		{#if $chimes.length !== 0}
			{#each $chimes as chime}
				<div class="space-between">
					<div class="vertical space">
						<h4>{ chime.title }</h4>
						<span>{ chime.body }</span>
					</div>
				</div>
			{/each}
		{:else}
			<span>There are no any custom notifications</span>
		{/if}
	</Section>
</section>