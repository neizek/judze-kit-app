<script lang="ts">
	import { daysCounterStore } from '$lib/stores/daysCounter';
	import { title } from '$lib/stores/meta';
	import DaysLeft from '$widgets/Menu/DaysCounter/DaysCounter.svelte';
	import Menu from '$widgets/Menu/Menu.svelte';

	const navTree = [
		{
			label: 'Navigation',
			items: [
				{ label: 'Flags', icon: 'flag', link: 'navigation/flags' },
				{
					label: 'Sound Signals',
					icon: 'speaker',
					link: 'navigation/soundsignals',
				},
				{ label: 'Lights', icon: 'lighthouse', link: 'navigation/lights' },
				{ label: 'Shapes', icon: 'shapes', link: 'navigation/shapes' },
				{ label: 'Buoys', icon: 'buoy', link: 'navigation/buoys' },
				{ label: 'Rules', icon: 'books', link: 'navigation/rules' },
			],
		},
		{
			label: 'Weather & Celestial',
			items: [
				{ label: 'Wind', icon: 'wind-rose', link: 'weather/wind' },
				{ label: 'Clouds', icon: 'clouds', link: 'weather/clouds' },
				{ label: 'Gyro Error', icon: 'compass', link: 'celestial/gyroerror' },
			],
		},
		{
			label: 'Other',
			items: [
				{ label: 'Distress Signals', icon: 'lifebuoy', link: 'other/distress' },
				{ label: 'ToDo', icon: 'chime', link: 'other/todo' },
			],
		},
	];

	title.set('Judze');
</script>

<div class="vertical-flex space-xl max-width">
	{#key $daysCounterStore}
		<DaysLeft startDate={$daysCounterStore.startFrom} endDate={$daysCounterStore.endTo} />
	{/key}
	<Menu {navTree} />
</div>
