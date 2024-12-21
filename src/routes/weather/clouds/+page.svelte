<script lang="ts">
    import isMobile, { isMobileScreen } from "$lib/deviceDetector";
import { title } from "$lib/meta";
    import { getContext } from "svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Image from "../../../components/ui/Image.svelte";
    import Section from "../../../components/ui/Section.svelte";
    import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
    import DetailsCard from "../../../components/ui/DetailsCard.svelte";

	$title = 'Clouds'

	const cloudsArray = [
		{
			header: "High 5.000m - 13.000m",
			clouds: [
				{title: 'Cirrus', img: 'cirrus', description: 'Random, isolated cirrus do not have any particular significance. A large number of cirrus clouds can be a sign of an approaching frontal system or upper air disturbance.'},
				{title: 'Cirrocumulus', img: 'cirrocumulus', description: 'If there are only small patches of cirrocumulus and perhaps some wisps of cirrus, it usually means a continuation of good weather and if it is seen after rain it usually means improving weather.'},
				{title: 'Cirrostratus', img: 'cirrostratus', description: 'Sometimes signal the beginning of a warm front if they form after cirrus and spread from one area across the sky and thus may be signs that precipitation might follow in the next 12 to 24 hours or as soon as 6-8 hours.'}
			]
		},
		{
			header: 'Middle 2.000m - 7.000m',
			clouds: [
				{title: 'Altocumulus', img: 'altocumulus', description: 'It often seen in a fragmented form behind a frontal system alongside stratus fractus or stratocumulus. Altocumulus is also commonly found between the warm and cold fronts in a depression.'},
				{title: 'Altostratus', img: 'altostratus', description: 'May be composed of either water droplets or ice crystals. In some ice crystal altostratus, very thin, rapidly-disappearing horizontal sheets of water droplets appear at random.'}			
			]
		},
		{
			header: 'Low 0m - 2.000m',
			clouds: [
				{title: 'Nimbostratus', img: 'nimbostratus', description: 'Usually, nimbostratus is a sign of steady moderate to heavy precipitation, as opposed to the shorter period of typically heavier precipitation released by a cumulonimbus cloud.'},
				{title: 'Stratocumulus', img: 'stratocumulus', description: 'These clouds are often seen at either the front or tail end of worse weather, so may indicate storms to come, in the form of thunderheads or gusty winds.'},
				{title: 'Stratus', img: 'stratus', description: 'Indicating a continuation of prolonged cloudy weather with drizzle for several hours and then an improvement as it breaks into stratocumulus. Stratus clouds can persist for days in anticyclone conditions.'}	
			]
		},
		{
			header: 'Vertically Developed to 13.000m',
			clouds: [
				{title: 'Cumulus', img: 'cumulus', description: 'Appearing as small- or medium-sized puffy shapes in the sky, often occur in times of fair weather. However, cumulus clouds can grow into cumulonimbus.'},
				{title: 'Cumulonimbus', img: 'cumulonimbus', description: 'Cumulonimbus storm cells can produce heavy rain of a convective nature and flash flooding, as well as straight-line winds. Most storm cells die after about 20 minutes.'}			]
		}
	]

	const createPopup: CreatePopup = getContext('createPopup');

	function openDescription(cloud: any) {
		createPopup({
			header: cloud.title,
			content: {
				component: DetailsCard,
				props: {
					image: {
						src: `/clouds/${cloud.img}.jpg`,
						alt: cloud.title
					},
					details: [
						{
							tag: 'p',
							text: cloud.description
						}
					]
				}
			},
			bottomSticked: isMobileScreen
		});
	}
</script>
<section class="vertical-flex max-width">
	{#each cloudsArray as cloudCategory}
		<Section title="{cloudCategory.header}">
			<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{3}">
					{#each cloudCategory.clouds as cloud}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="vertical-flex space" role="button" tabindex="0" on:click={() => openDescription(cloud)}>
							<Image
								src="/clouds/{cloud.img}.jpg"
								alt="{cloud.title}"
								--aspect-ratio="1/1"
								--height="auto"
								--width="100%"
								--object-fit="cover"
								--border-radius="5px"
							/>
							<span>{cloud.title}</span>
						</div>
					{/each}
			</EqualGrid>
		</Section>
	{/each}
</section>

