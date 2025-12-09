<script lang="ts">
	import type { VoyageModel } from '$lib/types/seaservice';
	import { formatDate } from '$lib/utils/datetime';
	import { Calendar, Star } from '@lucide/svelte';
	import DurationText from './DurationText.svelte';
	import { ranksMap, vesselTypesMap } from '$lib/stores/lookups';

	let { voyage }: { voyage: VoyageModel } = $props();
</script>

<div class="vertical-flex space-l">
	<div class="flex space-between ai-baseline space-m">
		<div class="text-size-l">{voyage.vessel}</div>
		<span>{$vesselTypesMap.get(voyage.vesselTypeId)?.name}</span>
	</div>
	<div class="flex space-m ai-center">
		<Calendar size={18} />
		<span>{formatDate(voyage.dateFrom)}</span>
		<span>-</span>
		<span>{formatDate(voyage.dateTo)}</span>
	</div>
	<div class="flex space-xl ai-center">
		{#if voyage.rankId}
			<div class="flex space-m ai-center">
				<Star size={18} />
				<span>{$ranksMap.get(voyage.rankId)?.name}</span>
			</div>
		{/if}
		{#if voyage.duration}
			<DurationText duration={voyage.duration} />
		{/if}
	</div>
</div>
