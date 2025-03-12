<script lang="ts">
  import { title } from "$lib/meta";
  import { getContext } from "svelte";
  import EqualGrid from "../../../components/ui/EqualGrid.svelte";
  import Image from "../../../components/ui/Image.svelte";
  import Section from "../../../components/ui/Section.svelte";
  import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
  import DetailsCard from "../../../components/ui/DetailsCard.svelte";
  import { text } from "@sveltejs/kit";

	$title = 'Distress Signals'

	type DistressSignalType = {
		img: string;
		label: string;
		description: string;
		rule: string;
	}

	const distressSignals: DistressSignalType[] = [
		{
			img: 'fire.svg',
			label: 'Flame on Vessel',
			description: 'Flames on the vessel (as from a burning tar barrel, oil barrel, etc.)',
			rule: 'COLREG / Annex IV / 1(h)'
		},
		{
			img: 'horn.svg',
			label: 'Fog Horn',
			description: 'A continuous sounding with any fog-signaling apparatus',
			rule: 'COLREG / Annex IV / 1(b)'
		},
		{
			img: 'sos-new.svg',
			label: 'SOS',
			description: 'A signal made by any signaling method consisting of the group "SOS" in the Morse Code',
			rule: 'COLREG / Annex IV / 1(d)'
		},
		{
			img: 'walkie-talkie.svg',
			label: 'MayDay by Radio',
			description: 'A signal sent by radiotelephony consisting of the spoken word "Mayday"',
			rule: 'COLREG / Annex IV / 1(e)'
		},
		{
			img: 'gun.svg',
			label: 'Gun Fired',
			description: 'A gun or other explosive signal fired at intervals of about a minute',
			rule: 'COLREG / Annex IV / 1(a)'
		},
		{
			img: 'parachute.svg',
			label: 'Parachute Flare',
			description: 'A rocket parachute flare or a hand flare showing a red light',
			rule: 'COLREG / Annex IV / 1(i)'
		},
		{
			img: 'smoke.svg',
			label: 'Smoke',
			description: 'A smoke signal giving off orange-colored smoke',
			rule: 'COLREG / Annex IV / 1(j)'
		},
		{
			img: 'red-star-shells.svg',
			label: 'Red Star Shells',
			description: 'Rockets or shells, throwing red stars fired one at a time at short intervals',
			rule: 'COLREG / Annex IV / 1(c)'
		},
		{
			img: 'november-charlie.svg',
			label: 'N.C. Signal',
			description: 'The International Code Signal of distress indicated by N.C.',
			rule: 'COLREG / Annex IV / 1(f)'
		},
		{
			img: 'ball-square.svg',
			label: 'Square Flag & Ball',
			description: 'A signal consisting of a square flag having above or below it a ball or anything resembling a ball',
			rule: 'COLREG / Annex IV / 1(g)'
		},
		{
			img: 'radiobeacon.svg',
			label: 'EPIRB',
			description: 'Signals transmitted by emergency position-indicating radio beacons',
			rule: 'COLREG / Annex IV / 1(n)'
		},
		{
			img: 'radio.svg',
			label: 'DSC',
			description: 'A distress alert by means of digital selective calling (DSC) transmitted on: (i) VHF channel 70, or (ii) MF/HF on the frequencies 2187.5 kHz, 8414.5 kHz, 4207.5 kHz, 6312 kHz, 12577 kHz or 16804.5 kHz',
			rule: 'COLREG / Annex IV / 1(l)'
		},
		{
			img: 'satellite.svg',
			label: 'Ship-to-shore',
			description: 'A ship-to-shore distress alert transmitted by the ship`s Inmarsat or other mobile satellite service provider ship earth station',
			rule: 'COLREG / Annex IV / 1(m)'
		},
		{
			img: 'sart.svg',
			label: 'SART',
			description: 'Approved signals transmitted by radiocommunication systems, including survival craft radar transponders',
			rule: 'COLREG / Annex IV / 1(o)'
		},
		{
			img: 'waving-hand.svg',
			label: 'Waving Arms',
			description: 'Slowly and repeatedly raising and lowering arms outstretched to each side',
			rule: 'COLREG / Annex IV / 1(k)'
		}
	];

	const createPopup: CreatePopup = getContext('createPopup');

	function openDescription(signal: DistressSignalType) {
		createPopup({
			header: signal.label,
			content: {
				component: DetailsCard,
				props: {
					image: {
						src: `/distress/${signal.img}`,
						alt: signal.label,
						bgColor: 'transparent'
					},
					details: [
						{
							tag: 'span',
							text: signal.description
						},
						{
							tag: 'span',
							text: signal.rule
						}
					]
				}
			}
		})
	}
</script>

<section class="vertical-flex max-width">
	<Section>
		<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{6}">
	{#each distressSignals as signal}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="vertical-flex space" role="button" tabindex="0" on:click={() => openDescription(signal)}>
							<Image
								src="/distress/{signal.img}"
								alt="{signal.label}"
								--aspect-ratio="1/1"
								--height="auto"
								--width="100%"
								--object-fit="cover"
								--border-radius="5px"
								--padding="16px"
							/>
							<span>{signal.label}</span>
						</div>
					{/each}
				</EqualGrid>
			</Section>
</section>