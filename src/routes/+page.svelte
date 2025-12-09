<script lang="ts">
	import { isAuthorised } from '$lib/stores/auth';
	import { daysCounterEnabled } from '$lib/stores/daysCounter';
	import { title } from '$lib/stores/meta';
	import { seaServiceVisible } from '$lib/stores/seaService';
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
				{ label: 'ETA', icon: 'calendar-clock', link: 'navigation/eta' },
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
				// { label: 'Notes', icon: 'chime', link: 'other/notes' },
			],
		},
	];

	title.set('Judze');
</script>

<div class="vertical-flex space-xl max-width">
	{#if $daysCounterEnabled && $isAuthorised}
		<DaysLeft voyage={$seaServiceVisible[0]} />
	{/if}
	<Menu {navTree} />
</div>
