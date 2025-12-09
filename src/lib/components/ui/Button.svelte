<script lang="ts">
	import type { ButtonProps } from '$lib/types/ui';
	import { ChevronRight, ShipWheel } from '@lucide/svelte';

	let {
		icon,
		type = 'primary',
		label,
		submit = false,
		bordered = false,
		disabled = false,
		isLoading = false,
		full = false,
		withChevron = false,
		size,
		onclick,
	}: ButtonProps = $props();

	const Icon = icon;
	const clases = $derived([
		type,
		bordered ? 'bordered' : '',
		full ? 'max-width' : '',
		withChevron && !isLoading ? 'menu' : '',
		'space-m',
		size ? `size-${size}` : '',
	]);

	function handleClick(e: MouseEvent) {
		(e.currentTarget as HTMLButtonElement).blur();
		if (onclick) onclick();
	}
</script>

<button onclick={handleClick} class={clases} {disabled} type={submit ? 'submit' : 'button'}>
	{#if isLoading}
		<ShipWheel size={20} class="spin" />
	{:else}
		{#if icon}
			<div class="icon">
				<Icon size={20} />
			</div>
		{/if}
		{#if label}
			<span>{label}</span>
		{/if}
		{#if withChevron}
			<ChevronRight size={20} />
		{/if}
	{/if}
</button>

<style lang="scss">
	button {
		white-space: nowrap;
		justify-content: center;
	}

	.menu {
		text-align: start;
		align-content: center;
		gap: var(--size-l);

		> span {
			flex: 1;
		}
	}

	.icon {
		margin-top: -3px;
		margin-bottom: -3px;
		display: flex;
		align-items: center;
	}
</style>
