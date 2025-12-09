<script lang="ts">
	import type { DetailType } from './types';
	import DetailRow from './DetailRow.svelte';

	let { detail }: { detail: DetailType } = $props();
</script>

{#if detail.tag !== undefined}
	<svelte:element this={detail.tag} class={detail.class}>
		{#if detail.title}
			{detail.title}:
		{/if}
		{#if detail.text}
			{detail.text}
		{/if}
		{#if detail.children}
			{#each detail.children as child}
				<DetailRow detail={child} />
			{/each}
		{/if}
	</svelte:element>
{/if}
