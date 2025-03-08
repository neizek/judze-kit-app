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
	}

	const distressSignals: DistressSignalType[] = [
		{img: 'fire.svg', label: 'Flame on Vessel', description: 'Flames on the vessel (as from a burning tar barrel, oil barrel, etc.)'},
		{img: 'horn.svg', label: 'Fog Horn', description: 'A continuous sounding with any fog-signaling apparatus'},
		{img: 'sos.svg', label: 'SOS', description: 'A signal made by any signaling method consisting of the group "SOS" in the Morse Code'},
		{img: 'walkie-talkie.svg', label: 'MayDay by Radio', description: 'A signal sent by radiotelephony consisting of the spoken word "Mayday"'},
		{img: 'gun.svg', label: 'Gun Fired', description: 'A gun or other explosive signal fired at intervals of about a minute'},
		{img: 'parachute.svg', label: 'Parachute Flare', description: 'A rocket parachute flare or a hand flare showing a red light'},
		{img: 'smoke.svg', label: 'Smoke', description: 'A smoke signal giving off orange-colored smoke'},
		{img: 'red-star-shells.svg', label: 'Red Star Shells', description: 'Rockets or shells, throwing red stars fired one at a time at short intervals'},
		{img: 'november-charlie.svg', label: 'N.C. Signal', description: 'The International Code Signal of distress indicated by N.C.'},
		{img: 'ball-square.svg', label: 'Square Flag & Ball', description: 'A signal consisting of a square flag having above or below it a ball or anything resembling a ball'},
		{img: 'radiobeacon.svg', label: 'EPIRB', description: 'Signals transmitted by emergency position-indicating radio beacons'},
		{img: 'radio.svg', label: 'DSC', description: 'A distress alert by means of digital selective calling (DSC) transmitted on: (i) VHF channel 70, or (ii) MF/HF on the frequencies 2187.5 kHz, 8414.5 kHz, 4207.5 kHz, 6312 kHz, 12577 kHz or 16804.5 kHz'},
		{img: 'satellite.svg', label: 'Ship-to-shore', description: 'A ship-to-shore distress alert transmitted by the ship`s Inmarsat or other mobile satellite service provider ship earth station'},
		{img: 'sart.svg', label: 'SART', description: 'Approved signals transmitted by radiocommunication systems, including survival craft radar transponders'},
		{img: 'waving-hand.svg', label: 'Waving Arms', description: 'Slowly and repeatedly raising and lowering arms outstretched to each side'}
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
					details: [{
						tag: 'span',
						text: signal.description
					}]
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