<script lang="ts">
    import { getContext } from "svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Image from "../../../components/ui/Image.svelte";
    import Section from "../../../components/ui/Section.svelte";
    import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
    import { isMobileScreen } from "$lib/deviceDetector";
    import BuoyDetails from "./BuoyDetails.svelte";
	const buoysArray = [
		{
			header: 'Lateral marks',
			buoys: [
				{title: 'Lateral port mark', image: 'lateral-port.png', description: 'Lateral marks indicate the port and starboard sides of channels. The marks topped by a red can shape are called Port Marks.'},
				{title: 'Lateral starboard mark', image: 'lateral-stbd.png', description: 'Lateral marks indicate the port and starboard sides of channels. The marks topped topped by a green triangle shape are called Starboard Marks.'},
			]
		},
		{
			header: 'Cardinal marks',
			buoys: [
				{title: 'North cardinal mark', image: 'cardinal-north.png', description: 'Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the north of this cardinal mark.'},
				{title: 'East cardinal mark', image: 'cardinal-east.svg', description: 'Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the east of this cardinal mark.'},
				{title: 'South cardinal mark', image: 'cardinal-south.png', description: 'Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the south of this cardinal mark.'},
				{title: 'West cardinal mark', image: 'cardinal-west.png', description: 'Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the west of this cardinal mark.'}
			]
		},
		{
			header: 'Other marks',
			buoys: [
				{title: 'Isolated danger mark', image: 'isolated-danger.png', description: 'Isolated danger marks indicate a specific danger with navigable water all around. The mark is a black pillar with a red band in the middle with 2 black sphere top marks. If an isolated danger mark is lit, it will have a white light flashing in groups of 2. In general, keep clear of an isolated danger mark.'},
				{title: 'Safe water mark', image: 'safe-water.png', description: 'Safe water marks indicate that there is safe water all around. It is often used to mark the seaward end of channels into ports. They are sometimes used to mark the centre of a channel; or are used in a series down the middle of a channel instead of lateral marks on the edges of the channel. Safe water marks have red and white vertical stripes and may have a red top mark.'},
				{title: 'Special mark', image: 'special.png', description: 'Special marks are used to indicate special areas or features, such as: traffic separation marks, spoil ground (for waste or dredging material), aquaculture. Special marks are yellow and have a cross-shaped top mark. If lit, a special mark will have a yellow light that flashes in a different pattern to cardinal, isolated danger and safe water marks.'},
				{title: 'New danger mark', image: 'new-mark.png', description: ''}
			]
		}
	];

	const createPopup: CreatePopup = getContext('createPopup');

	function openDescription(buoy: any) {
		// if (description !== '') {
			createPopup({
				header: buoy.title,
				content: {
					component: BuoyDetails,
					props: {
						buoy
					}
				},
				bottomSticked: isMobileScreen
			});
		// }
	}
</script>
<section class="vertical-flex max-width">
	{#each buoysArray as buoysCategory}
		<Section title="{buoysCategory.header}">
			<EqualGrid --desktopColumnsQty="{4}" --mobileColumnsQty="{2}">
				{#each buoysCategory.buoys as buoy}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="vertical-flex space" role="button" tabindex="0" on:click="{() => openDescription(buoy)}">
						<Image
							src="/buoys/{buoy.image}"
							alt="{buoy.title}"
							--width="100%"
							--aspect-ratio="1/1"
							--object-fit="contain"
							--border-radius="5px"
						/>
						<span>{buoy.title}</span>
					</div>
				{/each}
			</EqualGrid>
		</Section>
	{/each}
</section>