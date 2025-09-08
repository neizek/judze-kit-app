<script lang="ts">
	import { createField } from '$lib/utils/forms/forms';
	import { isEmail, required } from '$lib/utils/forms/validators';
	import Button from '$ui/Button.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';

	const email = createField('email', '', [required('Email is missing'), isEmail()]);
</script>

<div class="vertical-flex space-xl">
	<FormItem label="E-mail" errors={$email.errors}>
		<Input bind:value={$email.value} hasError={!$email.valid} />
	</FormItem>
	<Button type="primary" label="Sign In" />
</div>
