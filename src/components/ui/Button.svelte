<script lang="ts">
	// import Loader from "../Loader/Loader.svelte";

	export let icon: string | undefined = undefined;
	export let type: 'primary' | 'secondary' | 'dangerous' | 'transparent' | undefined = undefined;
	export let label: string | undefined = undefined;
	export let submit = false;
	export let bordered = false;
	export let disabled = false;
	// export let isLoading = false;
	export let maxwidth = false;
</script>

<button
	on:click
	class="{(type ?? '') + (bordered ? ' bordered' : '') + (maxwidth ? ' max-width' : '')}"
	disabled="{disabled}"
	type="{submit ? 'submit' : 'button'}"
>
	{#if icon}
		<i class="fa-solid fa-{icon}"></i>
	{/if}
	{#if label}
		<span>{label}</span>
	{/if}
	<!-- {#if isLoading}
		<Loader --size="16px" --line-width="2px" --fill-color="#ffffff" />
	{/if} -->
</button>

<style lang="scss">
	button {
		white-space: nowrap;
		justify-content: center;

		@include mobile {
			width: 100%;
		}
		
		&:disabled {
			span,
			i {
				opacity: 0.5;
				text-shadow: none;
			}
		}

		span {
			display: block;
		}

		i:not(:only-child) {
			font-size: 14px;
		}
	}

	.loader {
		width: 16px;
		height: 16px;
	}
</style>
