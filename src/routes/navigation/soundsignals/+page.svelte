<script lang="ts">
	import { title } from '$lib/stores/meta';
	import Bell from './Bell.svelte';
	import BellGong from './BellGong.svelte';
	import Bells from './Bells.svelte';
	import BellsGong from './BellsGong.svelte';
	import SoundSignalDetails from './SoundSignalDetails.svelte';
	import MorseCode from './MorseCode.svelte';
	import type { SoundSignalsType, SoundSignalType, SoundsType } from './types';
	import Section from '$ui/Section.svelte';
	import { bellfivemp3, bellmp3, emptymp3, gongfivemp3, prolongedmp3, shortmp3 } from './sounds';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { AudioWaveform, BellRing } from '@lucide/svelte';

	$title = 'Sound signals';

	const signalsArray: SoundSignalsType[] = [
		{
			header: 'Perfect visibility',
			signals: [
				{ morse: '·', pattern: '.', description: 'Altering course to starboard' },
				{ morse: '··', pattern: '. .', description: 'Altering course to port' },
				{ morse: '···', pattern: '. . .', description: 'Operating reverse propulsion' },
				{
					morse: '·····',
					pattern: '. . . . .',
					description: 'I do not agree. I am unclear as to your intentions',
				},
				{
					morse: '--·',
					pattern: '- - .',
					description: 'I wish to overtake to your starboard',
				},
				{
					morse: '--··',
					pattern: '- - . .',
					description: 'I wish to overtake to your port',
				},
				{ morse: '-·-·', pattern: '- . - .', description: 'I agree with your overtake' },
			],
		},
		{
			header: 'Restricted visibility',
			signals: [
				{ morse: '-', pattern: '-', description: 'Under power, under way and making way' },
				{
					morse: '--',
					pattern: '- -',
					description: 'Under power, under way and NOT making way',
				},
				{
					morse: '-··',
					pattern: '- . .',
					description:
						'Towing vessel | Not under command | Constrained by draft | Restricted maneuvrebility | Fishing',
				},
				{ morse: '-···', pattern: '- . . .', description: 'Towed vessel' },
				{ morse: '·-·', pattern: '. - .', description: 'At anchor' },
				{ morse: '····', pattern: '. . . .', description: 'Pilot vessel' },
				{ morse: Bell, pattern: 'B', description: 'A vessel at anchor (< 100m length)' },
				{
					morse: BellGong,
					pattern: 'B G',
					description: 'A vessel at anchor (> 100m length)',
				},
				{
					morse: Bells,
					pattern: 'bbb B bbb',
					description: 'A vessel aground (< 100m length)',
				},
				{
					morse: BellsGong,
					pattern: 'bbb B bbb G',
					description: 'A vessel aground (< 100m length)',
				},
			],
		},
	];

	const sounds: SoundsType = {
		'-': new Audio(prolongedmp3),
		'.': new Audio(shortmp3),
		' ': new Audio(emptymp3),
		b: new Audio(bellmp3),
		B: new Audio(bellfivemp3),
		G: new Audio(gongfivemp3),
	};

	function openDescription(signal: SoundSignalType) {
		if (signal.description !== '' && signal.description) {
			createPopup({
				header: 'Sound signal details',
				icon: AudioWaveform,
				content: {
					component: SoundSignalDetails,
					props: {
						signal,
						sounds,
					},
				},
			});
		}
	}
</script>

<EqualGrid --desktopColumnsQty={2} --tabletColumnsQty={1} --mobileColumnsQty={1}>
	{#each signalsArray as signalCategory}
		<Section title={signalCategory.header}>
			<div class="flex flex-column space-l">
				{#each signalCategory.signals as signal, index}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="equal-flex ai-center space-xl"
						on:click={() => openDescription(signal)}>
						<MorseCode morse={signal.morse} />
						<span class="doubled">{signal.description}</span>
					</div>
				{/each}
			</div>
		</Section>
	{/each}
</EqualGrid>
