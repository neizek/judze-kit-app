<script lang="ts">
  import { title } from "$lib/meta";
  import EqualGrid from "../../../components/ui/EqualGrid.svelte";
  import Image from "../../../components/ui/Image.svelte";
  import Section from "../../../components/ui/Section.svelte";

	$title = 'Distress Signals'

	type DistressSignalType = {
		img: string;
		label: string;
	}

	const distressSignals: DistressSignalType[] = [
		{img: 'fire', label: 'Flame on Vessel'},
		{img: 'horn', label: 'Fog Horn'},
		{img: 'sos', label: 'SOS'},
		{img: 'radio', label: 'MayDay by Radio'},
		{img: 'gun', label: 'Gun Fired'},
		{img: 'parachute', label: 'Parachute Flare'}
	];

	function openDescription(signal: DistressSignalType) {
		console.log('Heyaaaa', signal);
	}
</script>

<section class="vertical-flex max-width">
	<Section title="{$title}">
		<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{6}">
	{#each distressSignals as signal}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="vertical-flex space" role="button" tabindex="0" on:click={() => openDescription(signal)}>
							<Image
								src="/distress/{signal.img}.svg"
								alt="{signal.label}"
								--aspect-ratio="1/1"
								--height="auto"
								--width="100%"
								--object-fit="cover"
								--border-radius="5px"
								--padding="20px"
							/>
							<span>{signal.label}</span>
						</div>
					{/each}
				</EqualGrid>
			</Section>
</section>