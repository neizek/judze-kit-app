<script lang="ts">
	import { addChime } from "$lib/chime";
	import Button from "../../../components/ui/Button.svelte";
	import FormItem from "../../../components/ui/FormItem.svelte";
	import Input from "../../../components/ui/Input.svelte";

	let body: string;

	function handleAdd() {
	addChime({
		title: 'Judze',
		body: body,
		id: 0,
		schedule: {
			at: new Date(Date.now() + 5000)
		}
	})
	}
</script>

<div class="vertical-flex space-xl">
	<FormItem label="Notification's text">
		<Input bind:value="{body}" />
	</FormItem>
	<div class="space-between">
		<Button type="primary" label="Add" on:click="{handleAdd}" />
		<Button type="transparent" label="Cancel" />
	</div>
</div>
