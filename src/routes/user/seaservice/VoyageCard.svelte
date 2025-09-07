<script lang="ts">
	import type { Voyage } from '$lib/types/seaservice';
	import DurationText from './DurationText.svelte';

	export let voyage: Voyage;
</script>

<div class="section-box vertical-flex space">
	<div class="text-size-m">{voyage.vessel}</div>
	<div class="space-between">
		<span>{voyage.vesselType}</span>
		{#if voyage.duration}
			<DurationText duration={voyage.duration} />
		{/if}
	</div>
</div>
