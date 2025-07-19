<script lang="ts">
	import { addChime } from '$lib/utils/todos';
	import Button from '$ui/Button.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import DateTimeInput from '$ui/DateTimeInput.svelte';
	import Switch from '$ui/Switch.svelte';
	import TextArea from '$ui/TextArea.svelte';

	let description: string;
	let details: string;
	let dueDateTime: Date;
	let enableNotification: boolean = false;

	function onAddToDoItem() {
		addChime({
			title: 'Judze',
			body: details,
			id: 0,
			schedule: {
				at: new Date(Date.now() + 5000),
			},
		});
	}
</script>

<div class="vertical-flex space-xl">
	<FormItem label="Short description">
		<Input bind:value={description} />
	</FormItem>
	<FormItem label="Details (optional)">
		<TextArea bind:value={details} />
	</FormItem>
	<FormItem>
		<DateTimeInput bind:value={dueDateTime} />
	</FormItem>
	<FormItem>
		<Switch bind:value={enableNotification} label="Enable notification reminder"></Switch>
	</FormItem>
	<div class="space-between space">
		<Button type="primary" label="Add" on:click={onAddToDoItem} />
		<Button type="transparent" label="Cancel" bordered />
	</div>
</div>
