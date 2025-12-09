<script lang="ts">
	export let label: string | undefined = undefined;
	export let errors: string[] = [];
	// export let messages: { [error: string]: string } = {};
	export let required = false;
	export let text: undefined | string = undefined;
	export let inline: boolean = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="formItem" class:inline={text || inline}>
	{#if label}
		<span class="label">
			<span>{label}</span>
			{#if required}
				<span class="required">*</span>
			{/if}
		</span>
	{/if}
	{#if text}
		<span class="text-size-s">{text}</span>
	{:else}
		<slot />
	{/if}
	{#if errors.length > 0}
		<ul class="errors">
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	:root {
		--FormItem-required-color: #{$c-blood};

		&[data-theme='dark'] {
			--FormItem-required-color: #{$c-lightRed};
		}
	}

	.formItem {
		display: grid;
		gap: 8px;

		&.inline {
			grid-template-columns: 1fr minmax(min-content, max-content);
		}

		&:focus-within .errors {
			display: block;
		}

		span:not(.label) {
			display: flex;
			align-items: end;
		}
	}

	.label {
		font-weight: 500;
		font-size: 13.5px;
	}

	.required {
		color: var(--FormItem-required-color);
	}

	.errors {
		list-style-position: inside;
		margin: 0;
		padding-left: 1rem;

		li {
			list-style-type: none;
			color: var(--error-font-color);
		}
	}
</style>
