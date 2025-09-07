<script lang="ts">
	import type { Duration } from '$lib/types/seaservice';

	export let duration: Duration;
</script>

<div class="line-blocks space">
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
