<script lang="ts">
	import PageControls from '$ui/PageControls.svelte';
	import Selector from '$ui/Selector.svelte';
	import { Gauge, Clock } from '@lucide/svelte';
	import SpeedMode from './SpeedMode.svelte';
	import TimeMode from './TimeMode.svelte';
	import { title } from '$lib/stores/meta';

	let mode: 'speed' | 'time' = 'speed';

	$title = 'ETA Calculations';
</script>

<div class="vertical-flex space-xl max-width">
	<PageControls>
		<Selector
			items={[
				{ label: 'Speed', icon: Gauge, value: 'speed' },
				{ label: 'Time', icon: Clock, value: 'time' },
			]}
			bind:value={mode} />
	</PageControls>
	{#if mode === 'speed'}
		<SpeedMode />
	{:else if mode === 'time'}
		<TimeMode />
	{/if}
</div>
