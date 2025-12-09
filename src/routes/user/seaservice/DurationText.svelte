<script lang="ts">
	import type { DurationParams } from '$lib/types/seaservice';
	import { Clock } from '@lucide/svelte';

	let { duration, withIcon = true }: { duration: DurationParams; withIcon?: boolean } = $props();
</script>

<div class="line-blocks space">
	{#if withIcon}
		<Clock size={18} />
	{/if}
	{#if duration.years}
		<span>{duration.years} Y</span>
	{/if}
	{#if duration.months}
		<span>{duration.months} M</span>
	{/if}
	{#if duration.days}
		<span>{duration.days} D</span>
	{/if}
</div>
