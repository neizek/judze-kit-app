<script lang="ts">
	import { ranksMap } from '$lib/stores/lookups';
	import { seaServiceVisible } from '$lib/stores/seaService';
	import type { DurationParams, VoyageModel } from '$lib/types/seaservice';
	import { sumDurations } from '$lib/utils/datetime';
	import FormItem from '$ui/FormItem.svelte';
	import Section from '$ui/Section.svelte';
	import DurationText from './DurationText.svelte';

	function getTotalDurationFromVoyages(voyages: VoyageModel[]): DurationParams {
		return sumDurations(
			voyages.flatMap((voyage) => {
				if (!voyage.duration) {
					return [];
				}

				return voyage.duration;
			})
		);
	}

	const totalSeaService = getTotalDurationFromVoyages($seaServiceVisible);

	const lastContract = $seaServiceVisible[0];
	const lastRank = $ranksMap.get(lastContract.rankId);

	const totalSeaSericeInLastRank = getTotalDurationFromVoyages(
		$seaServiceVisible.filter((voyage) => voyage.rankId === lastContract.rankId)
	);
</script>

<Section title="Sea service statistics">
	<div class="flex flex-column space-m">
		<FormItem label="Total sea service" inline>
			<DurationText duration={totalSeaService} withIcon={false} />
		</FormItem>
		<FormItem label="Sea service as {lastRank?.name}" inline>
			<DurationText duration={totalSeaSericeInLastRank} withIcon={false} />
		</FormItem>
	</div>
</Section>
