<script lang="ts">
	export let icon: string | undefined = undefined;
	export let hasError: boolean = false;
	export let disabled: boolean = false;
	export let value;
	export let mask: (value: Date) => void;

	let shownValue = mask(value);

	$: {
		if (value) {
			shownValue = mask(value);
		}
	}
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<label class="extended" class:error={hasError} class:disabled>
	{#if icon}
		<i class="fa-solid fa-{icon}"></i>
	{/if}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="input" on:click>
		{shownValue}
	</div>
	{#if hasError}
		<div class="errorIcon">!</div>
	{/if}
</label>
