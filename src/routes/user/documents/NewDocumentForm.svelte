<script lang="ts">
	import { addRecordsToDB } from '$lib/utils/documents';
	import Button from '$ui/Button.svelte';
	import DatePicker from '$ui/DatePicker/DatePicker.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Select from '$ui/Select/Select.svelte';
	import Separator from '$ui/Separator.svelte';

	export let categories;

	let category: string | undefined = categories[0].value;
	let name: string = '';
	let issueDate: Date;
	let expiryDate: Date;

	function addDocument() {
		addRecordsToDB('list', [
			{
				category,
				name,
				issueDate,
				expiryDate,
			},
		]);
	}
</script>

<div class="vertical-flex space-l">
	<FormItem label="Category of the document">
		<Select items={categories} bind:value={category} />
	</FormItem>
	<FormItem label="Name of the document">
		<Input bind:value={name} />
	</FormItem>
	<div class="equal-flex space">
		<FormItem label="Date issued">
			<DatePicker bind:value={issueDate} />
		</FormItem>
		<FormItem label="Expiration date">
			<DatePicker bind:value={expiryDate} />
		</FormItem>
	</div>
	<Separator />
	<div class="line-blocks space">
		<Button label="Confirm new file" type="primary" onclick={addDocument} />
		<Button label="Cancel" type="transparent" bordered />
	</div>
</div>
