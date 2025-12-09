<script lang="ts">
	import type { VoyageModel } from '$lib/types/seaservice';
	import { removeVoyage } from '$lib/utils/seaService';
	import Button from '$ui/Button.svelte';
	import { Trash } from '@lucide/svelte';
	import VoyageCardExtended from './VoyageCardExtended.svelte';

	let {
		voyage,
		closePopup,
	}: {
		voyage: VoyageModel;
		closePopup: () => void;
	} = $props();

	function onDelete() {
		removeVoyage(voyage.id);
		if (closePopup) closePopup();
	}
</script>

<div class="vertical-flex space-xl">
	<VoyageCardExtended {voyage} />
	<Button
		type="dangerous"
		icon={Trash}
		label="Delete record"
		full
		withChevron
		onclick={onDelete} />
</div>
