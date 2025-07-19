<script lang="ts">
	import { chimes } from '$lib/utils/todos';
	import { title } from '$lib/stores/meta';
	import { getContext } from 'svelte';
	import Button from '$ui/Button.svelte';
	import Section from '$ui/Section.svelte';
	import type { CreatePopup } from '$widgets/PopUp.svelte';
	import NewToDoItemForm from './NewToDoItemForm.svelte';
	import Icon from '$ui/Icon.svelte';

	$title = 'ToDo List';

	const createPopup: CreatePopup = getContext('createPopup');

	function addToDoItem() {
		createPopup({
			header: 'Create new todo item',
			content: {
				component: NewToDoItemForm,
				props: {},
			},
		});
	}
</script>

<section class="vertical-flex max-width">
	<div class="line-blocks space" style="align-self: end;">
		<Button label="New item" icon="add" type="primary" on:click={addToDoItem} />
	</div>
	<Section>
		{#if $chimes.length !== 0}
			{#each $chimes as chime}
				<div class="space-between">
					<div class="vertical space">
						<h4>{chime.title}</h4>
						<span>{chime.body}</span>
					</div>
				</div>
			{/each}
		{:else}
			<div class="centered-content vertical-flex space">
				<Icon name="data_alert" />
				<span>There are no any todo items</span>
			</div>
		{/if}
	</Section>
</section>
