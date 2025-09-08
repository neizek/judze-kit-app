<script lang="ts">
	import { isMobileScreen } from '$lib/utils/deviceDetector';
	import { title } from '$lib/stores/meta';
	import Button from '$ui/Button.svelte';
	import Image from '$ui/Image.svelte';
	import Section from '$ui/Section.svelte';
	import VisibilityRange from './VisibilityRange.svelte';
	import { createPopup } from '$widgets/PopUp';

	const lights = [
		{
			title: 'Power-driven vessels underway',
			lights: [
				{
					description: 'A power-driven vessel underway (over 50 meters in length)',
					images: ['underway-bow', 'underway-side', 'underway-stern'],
				},
				{
					description: 'A power-driven vessel underway (under 50 meters in length)',
					images: ['underway-50m-bow', 'underway-50m-side', 'underway-50m-stern'],
				},
				{
					description: 'A power-driven vessel underway (under 12 meters in length)',
					images: ['underway-12m-bow', 'underway-12m-side', 'underway-12m-stern'],
				},
			],
		},
		{
			title: 'Vessels at anchor or aground',
			lights: [
				{
					description: 'A vessel at anchor',
					images: ['anchored-bow', 'anchored-side', 'anchored-bow'],
				},
				{
					description: 'A vessel at anchor (over 100m in length)',
					images: ['anchored-bow', 'anchored-100m-side', 'anchored-bow'],
				},
				{
					description: 'A vessel aground',
					images: ['aground-bow', 'aground-side', 'aground-bow'],
				},
			],
		},
		{
			title: 'Restricted or constrained vessels',
			lights: [
				{
					description: 'A vessel not under command',
					images: ['nuc-bow', 'nuc-side', 'nuc-bow'],
				},
				{
					description: 'A vessel not under command but making way',
					images: ['underway-nuc-bow', 'underway-nuc-side', 'underway-nuc-stern'],
				},
				{
					description: 'A vessel restricted in her ability to maneuver',
					images: ['restricted-bow', 'restricted-side', 'restricted-bow'],
				},
				{
					description: 'A vessel restricted in her ability to maneuver at anchor',
					images: [
						'anchored-restricted-bow',
						'anchored-restricted-side',
						'anchored-restricted-bow',
					],
				},
				{
					description: 'A vessel restricted in her ability to maneuver  making way',
					images: [
						'underway-restricted-bow',
						'underway-restricted-side',
						'underway-restricted-stern',
					],
				},
				{
					description: 'A vessel constrained by her draught',
					images: ['constrained-bow', 'constrained-side', 'constrained-stern'],
				},
			],
		},
		{
			title: 'Other vessels',
			lights: [
				{
					description: 'A pilot vessel underway',
					images: ['pilot-bow', 'pilot-side', 'pilot-stern'],
				},
				{
					description: 'A vessel engaged in mine cleaning operations',
					images: ['minesweeper-bow', 'minesweeper-side', 'minesweeper-stern'],
				},
				{
					description: 'A sailing vessel',
					images: ['sailing-bow', 'sailing-side', 'sailing-stern'],
				},
			],
		},
	];

	function openVisibilityRanges() {
		createPopup({
			header: 'Visibility range of lights',
			content: {
				component: VisibilityRange,
			},
			bottomSticked: isMobileScreen,
		});
	}

	title.set('Lights');
</script>

<section class="vertical-flex max-width space-xl">
	<div class="line-blocks space" style="align-self: end;">
		<Button
			icon="pie_chart"
			type="transparent"
			bordered
			label="Visibility ranges"
			on:click={openVisibilityRanges} />
	</div>
	{#each lights as lightscategory}
		<Section title={lightscategory.title}>
			<div class="vertical-flex space-xl">
				{#each lightscategory.lights as light}
					<div class="Card vertical-flex space">
						<div class="bow">
							<Image
								src="/lights/{light.images[0]}.svg"
								alt="Ship's bow"
								--aspect-ratio="1/1"
								--width="100%"
								--height="auto"
								--object-fit="cover"
								--border-radius="5px" />
							<span>Bow</span>
						</div>
						<div class="side">
							<Image
								src="/lights/{light.images[1]}.svg"
								alt="Ship's bow"
								--aspect-ratio="2/1"
								--width="100%"
								--object-fit="cover"
								--border-radius="5px" />
							<span>Starboard side</span>
						</div>
						<div class="stern">
							<Image
								src="/lights/{light.images[2]}.svg"
								alt="Ship's bow"
								--aspect-ratio="1/1"
								--width="100%"
								--height="auto"
								--object-fit="cover"
								--border-radius="5px" />
							<span>Stern</span>
						</div>
						<span>{light.description}</span>
					</div>
				{/each}
			</div>
		</Section>
	{/each}
</section>

<style lang="scss">
	.Card {
		display: grid;

		.bow,
		.side,
		.stern {
			> span {
				position: absolute;
				color: #{$c-chalk};
				bottom: 8px;
				left: 8px;
			}
		}

		@include mobile {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, auto);
			.bow {
				grid-area: 1 / 1 / 2 / 2;
			}
			.stern {
				grid-area: 1 / 2 / 2 / 3;
			}
			.side {
				grid-area: 2 / 1 / 3 / 3;
			}
			:last-child {
				grid-area: 3 / 1 / 4 / 3;
			}
		}

		@include after-mobile {
			grid-template-columns: 1fr 2fr 1fr;
			grid-gap: 6px;

			:last-child {
				grid-column: 1 / -1;
			}
		}
	}
</style>
