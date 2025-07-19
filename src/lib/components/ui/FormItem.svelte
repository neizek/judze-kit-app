<script lang="ts">
	export let label: string | undefined = undefined;
	export let errors: string[] = [];
	export let messages: { [error: string]: string } = {};
	export let required = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="formItem">
	{#if label}
		<span class="label">
			<span>{label}</span>
			{#if required}
				<span class="required">*</span>
			{/if}
		</span>
	{/if}
	{#if errors.length > 0}
		<ul class="errors">
			{#each errors as error}
				<li>{messages[error]}</li>
			{/each}
		</ul>
	{/if}
	<slot />
</div>

<style lang="scss">
	:root {
		--FormItem-required-color: #{$c-blood};

		&[data-theme="dark"] {
			--FormItem-required-color: #{$c-lightRed};
		}
	}

	.formItem {
		display: grid;
		gap: 8px;

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

		li {
			list-style-type: none;
			color: var(--error-font-color);
			font-size: 13.5px;
			margin: 5px 0;

			&::before {
				content: "×";
				padding-right: 8px;
			}
		}
	}
</style>
