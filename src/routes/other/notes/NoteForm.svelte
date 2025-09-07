<script lang="ts">
	import Button from '$ui/Button.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import DateTimeInput from '$ui/DateTimeInput.svelte';
	import TextArea from '$ui/TextArea.svelte';
	import { createField, createForm } from '$lib/utils/forms/forms';
	import { required } from '$lib/utils/forms/validators';

	export let closePopup: undefined | (() => void) = undefined;

	// let enableNotification: boolean = false;

	const description = createField('title', '', [required('Description is mandatory')]);
	const details = createField('details', '', []);
	const dueDateTime = createField('dueDateTime', undefined, []);

	const noteForm = createForm(description, details, dueDateTime);

	function onAddToDoItem() {
		noteForm.validate().then((success) => {
			if (success) {
				if (closePopup) closePopup();
			}
		});
	}
</script>

<div class="vertical-flex space-xl">
	<FormItem label="Short description">
		<Input bind:value={$description.value} />
	</FormItem>
	<FormItem label="Details (optional)">
		<TextArea bind:value={$details.value} />
	</FormItem>
	<FormItem>
		<DateTimeInput bind:value={$dueDateTime.value} />
	</FormItem>
	<!-- <FormItem>
		<Switch bind:value={enableNotification} label="Enable notification reminder"></Switch>
	</FormItem> -->
	<div class="space-between space">
		<Button type="primary" label="Add" on:click={onAddToDoItem} />
		<Button type="transparent" label="Cancel" bordered />
	</div>
</div>
