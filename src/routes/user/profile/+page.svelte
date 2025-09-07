<script lang="ts">
	import { dbStoresEnum } from '$lib/enums/db';
	import { title } from '$lib/stores/meta';
	import { getAll } from '$lib/utils/idb';
	import Button from '$ui/Button.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Section from '$ui/Section.svelte';

	let user = getAll(dbStoresEnum.user);

	$title = 'My profile';
</script>

<Section title="Personal info">
	<div slot="controls">
		<Button label="Edit" icon="edit" />
	</div>
	<FormItem label="First name" text="Pavels" />
	<FormItem label="Last name" text="Huhrjanskis" />
	<FormItem label="Nationality" text="Latvian" />
</Section>
<Section title="Account Status">
	<FormItem label="Status" text="Premium" />
</Section>
