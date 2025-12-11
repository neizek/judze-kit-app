<script lang="ts">
	import { title } from '$lib/stores/meta';
	import Button from '$ui/Button.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import Section from '$ui/Section.svelte';
	import WindCalculator from './WindCalculator.svelte';
	import Image from '$ui/Image.svelte';
	import DetailsCard from '$ui/DetailsCard/DetailsCard.svelte';
	import Details from '$ui/Details.svelte';
	import Selector from '$ui/Selector.svelte';
	import PageControls from '$ui/PageControls.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { Wind, WindArrowDown } from '@lucide/svelte';

	title.set('Wind');

	const windTable = [
		{
			id: 0,
			header: 'Beaufort scale',
			description:
				'The Beaufort scale, created by Sir Francis Beaufort in 1805, primarily measures wind speed and its effects on the sea surface. It provides a qualitative description of wind strength and its impact on water conditions.',
			steps: [
				{
					number: 0,
					description: 'Calm',
					windSpeed: '< 1 kn',
					waveHeight: '0 m',
					seaState: '0',
					image: 'bf-0',
					seaConditions: 'Sea like a mirror',
				},
				{
					number: 1,
					description: 'Light air',
					windSpeed: '1–3 kn',
					waveHeight: '0 – 0.3 m',
					seaState: '1',
					image: 'bf-1',
					seaConditions:
						'Ripples with appearance of scales are formed, without foam crests',
				},
				{
					number: 2,
					description: 'Light breeze',
					windSpeed: '4–6 kn',
					waveHeight: '0.3 – 0.6 m',
					seaState: '2',
					image: 'bf-2',
					seaConditions:
						'Small wavelets still short but more pronounced; crests have a glassy appearance but do not break',
				},
				{
					number: 3,
					description: 'Gentle breeze',
					windSpeed: '7–10 kn',
					waveHeight: '0.6–1.2 m',
					seaState: '3',
					image: 'bf-3',
					seaConditions:
						'Large wavelets; crests begin to break; foam of glassy appearance; perhaps scattered white horses ',
				},
				{
					number: 4,
					description: 'Moderate breeze',
					windSpeed: '11–16 kn',
					waveHeight: '1–2 m',
					seaState: '3-4',
					image: 'bf-4',
					seaConditions: 'Small waves becoming longer; fairly frequent white horses',
				},
				{
					number: 5,
					description: 'Fresh breeze',
					windSpeed: '17–21 kn',
					waveHeight: '2–3 m',
					seaState: '4',
					image: 'bf-5',
					seaConditions:
						'Moderate waves taking a more pronounced long form; many white horses are formed; chance of some spray',
				},
				{
					number: 6,
					description: 'Strong breeze',
					windSpeed: '22–27 kn',
					waveHeight: '3–4 m',
					seaState: '5',
					image: 'bf-6',
					seaConditions:
						'Large waves begin to form; the white foam crests are more extensive everywhere; probably some spray',
				},
				{
					number: 7,
					description: 'Near gale',
					windSpeed: '28–33 kn',
					waveHeight: '4–5.5 m',
					seaState: '5-6',
					image: 'bf-7',
					seaConditions:
						'Sea heaps up and white foam from breaking waves begins to be blown in streaks along the direction of the wind; spindrift begins to be seen ',
				},
				{
					number: 8,
					description: 'Gale',
					windSpeed: '34–40 kn',
					waveHeight: '5.5–7.5 m',
					seaState: '6-7',
					image: 'bf-8',
					seaConditions:
						'Moderately high waves of greater length; edges of crests break into spindrift; foam is blown in well-marked streaks along the direction of the wind ',
				},
				{
					number: 9,
					description: 'Strong gale',
					windSpeed: '41–47 kn',
					waveHeight: '7–10 m',
					seaState: '7',
					image: 'bf-9',
					seaConditions:
						'High waves; dense streaks of foam along the direction of the wind; sea begins to roll; spray affects visibility ',
				},
				{
					number: 10,
					description: 'Storm',
					windSpeed: '48–55 kn',
					waveHeight: '9–12.5 m',
					seaState: '8',
					image: 'bf-10',
					seaConditions:
						'Very high waves with long overhanging crests; resulting foam in great patches is blown in dense white streaks along the direction of the wind; on the whole the surface of the sea takes on a white appearance; rolling of the sea becomes heavy; visibility affected ',
				},
				{
					number: 11,
					description: 'Violent storm',
					windSpeed: '56–63 kn',
					waveHeight: '11.5–16 m',
					seaState: '8',
					image: 'bf-11',
					seaConditions:
						'Exceptionally high waves; small- and medium-sized ships might be for a long time lost to view behind the waves; sea is covered with long white patches of foam; everywhere the edges of the wave crests are blown into foam; visibility affected',
				},
				{
					number: 12,
					description: 'Hurricane',
					windSpeed: '≥ 64 kn',
					waveHeight: '≥ 14 m',
					seaState: '9',
					image: 'bf-12',
					seaConditions:
						'The air is filled with foam and spray; sea is completely white with driving spray; visibility very seriously affected ',
				},
			],
		},
		{
			id: 1,
			header: 'Douglas scale',
			description:
				'The Douglas scale, also known as the Douglas sea scale or international sea and swell scale, measures the roughness of the sea by assessing wave heights and swell conditions. It was developed in 1921 by Captain H.P. Douglas.',
			steps: [
				{
					number: 0,
					description: 'Glassy',
					waveHeight: '0 m',
					image: 'bf-0',
					seaConditions: 'Sea like a mirror',
				},
				{
					number: 1,
					description: 'Rippled',
					waveHeight: '0 – 0.1 m',
					image: 'bf-1',
					seaConditions:
						'Ripples with appearance of scales are formed, without foam crests',
				},
				{
					number: 2,
					description: 'Smooth',
					waveHeight: '0.1 – 0.5 m',
					image: 'bf-2',
					seaConditions:
						'Small wavelets still short but more pronounced; crests have a glassy appearance but do not break',
				},
				{
					number: 3,
					description: 'Slight',
					waveHeight: '0.5–1.25 m',
					image: 'bf-3',
					seaConditions:
						'Large wavelets; crests begin to break; foam of glassy appearance; perhaps scattered white horses ',
				},
				{
					number: 4,
					description: 'Moderate',
					waveHeight: '1.25–2.5 m',
					image: 'bf-5',
					seaConditions:
						'Moderate waves taking a more pronounced long form; many white horses are formed; chance of some spray',
				},
				{
					number: 5,
					description: 'Rough',
					waveHeight: '2.5–4 m',
					image: 'bf-8',
					seaConditions:
						'Moderately high waves of greater length; edges of crests break into spindrift; foam is blown in well-marked streaks along the direction of the wind',
				},
				{
					number: 6,
					description: 'Very rough',
					waveHeight: '4–6 m',
					image: 'bf-9',
					seaConditions:
						'High waves; dense streaks of foam along the direction of the wind; sea begins to roll; spray affects visibility',
				},
				{
					number: 7,
					description: 'High',
					waveHeight: '6–9 m',
					image: 'bf-10',
					seaConditions:
						'Very high waves with long overhanging crests. The resulting foam, in great patches, is blown in dense white streaks along the direction of the wind. On the whole the surface of the sea takes on a white appearance. The tumbling of the sea becomes heavy and shock-like. Visibility affected.',
				},
				{
					number: 8,
					description: 'Very high',
					waveHeight: '9–14 m',
					image: 'bf-11',
					seaConditions:
						'Exceptionally high waves (small and medium-size ships might be for a time lost to view behind the waves). The sea is completely covered with long white patches of foam lying along the direction of the wind. Everywhere the edges of the wave crests are blown into froth. Visibility affected.',
				},
				{
					number: 9,
					description: 'Phenomenal',
					waveHeight: '> 14 m',
					image: 'bf-12',
					seaConditions:
						'Huge waves. Sea is completely white with foam and spray. Air is filled with driving spray, greately reducing visibility.',
				},
			],
		},
	];

	const windScaleOptions = [
		{ label: 'Beaufort scale', value: 0 },
		{ label: 'Douglas scale', value: 1 },
	];

	let activeSection: number = 0;
	$: windTableType = windTable.find((object) => object.id === activeSection);
	if (!windTableType) windTableType = windTable[0];

	function createCalculator() {
		createPopup({
			header: 'True Wind Calculator',
			icon: WindArrowDown,
			content: {
				component: WindCalculator,
			},
		});
	}

	function openDescription(step: any) {
		createPopup({
			header: step.description,
			icon: Wind,
			content: {
				component: DetailsCard,
				props: {
					image: {
						src: `/wind/${step.image}.jpg`,
						alt: step.description,
					},
					details: [
						{
							tag: 'p',
							text: step.seaConditions,
						},
						{
							tag: 'div',
							class: 'flex space-between',
							text: '',
							children: [
								{
									tag: 'span',
									text: `Waves: ${step.waveHeight}`,
								},
								step.windSpeed
									? {
											tag: 'span',
											text: `Wind: ${step.windSpeed}`,
										}
									: {},
							],
						},
					],
					isBigImage: true,
				},
			},
		});
	}
</script>

<div class="vertical-flex right space-xl max-width">
	<PageControls>
		<div>
			<Button
				type="transparent"
				icon={WindArrowDown}
				label="Calculator"
				onclick={createCalculator}
				bordered />
		</div>
		<Selector items={windScaleOptions} bind:value={activeSection} />
	</PageControls>

	<Section title={windTableType.header}>
		<div class="vertical-flex space-l">
			<Details header="Scale description">
				<p>{windTableType.description}</p>
			</Details>
			<EqualGrid --desktopColumnsQty={4} --tabletColumnsQty={3} --mobileColumnsQty={2}>
				{#each windTableType.steps as step}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="vertical-flex space"
						role="button"
						tabindex="0"
						on:click={() => openDescription(step)}>
						<Image
							src="/wind/{step.image}.jpg"
							alt={step.description}
							--width="100%"
							--aspect-ratio="1/1"
							--object-fit="contain"
							--border-radius="5px"
							--background-color="#ffffff" />
						<span>{step.number} - {step.description}</span>
					</div>
				{/each}
			</EqualGrid>
		</div>
	</Section>
</div>
