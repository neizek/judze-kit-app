<script lang="ts">
    import { getContext } from "svelte";
    import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
    import { title } from "$lib/meta";
    import isMobile, { isMobileScreen } from "$lib/deviceDetector";
    import Image from "../../../components/ui/Image.svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Section from "../../../components/ui/Section.svelte";
    import FlagCard from "./FlagCard.svelte";

	const flagsArray = [
		{
			header: 'General flags',
			flags: [
				{letter: 'A', morse: '·-', name: 'Alpfa', icon: 'A', description: 'I have a diver down; keep well clear at slow speed.'},
				{letter: 'B', morse: '-···', name: 'Bravo', icon: 'B', description: 'I am taking in or discharging or carrying dangerous goods.'},
				{letter: 'C', morse: '-·-·', name: 'Charlie', icon: 'C', description: 'Affirmative.'},
				{letter: 'D', morse: '-··', name: 'Delta', icon: 'D', description: 'Keep clear of me; I am maneuvering with difficulty.'},
				{letter: 'E', morse: '·', name: 'Echo', icon: 'E', description: 'I am altering my course to starboard.'},
				{letter: 'F', morse: '··-·', name: 'Foxtrot', icon: 'F', description: 'I am disabled; communicate with me.'},
				{letter: 'G', morse: '--·', name: 'Golf', icon: 'G', description: 'I require a pilot or I am hauling nets (by fishing boats)'},
				{letter: 'H', morse: '····', name: 'Hotel', icon: 'H', description: 'I have a pilot on board.'},
				{letter: 'I', morse: '··', name: 'India', icon: 'I', description: 'I am altering my course to port.'},
				{letter: 'J', morse: '·---', name: 'Juliet', icon: 'J', description: 'I am on fire and have dangerous cargo on board: keep well clear of me. Or I am leaking dangerous cargo.'},
				{letter: 'K', morse: '-·-', name: 'Kilo', icon: 'K', description: 'I wish to communicate with you.'},
				{letter: 'L', morse: '·-··', name: 'Lima', icon: 'L', description: 'Stop immediately.'},
				{letter: 'M', morse: '--', name: 'Mike', icon: 'M', description: 'My vessel is stopped and making no way through the water.'},
				{letter: 'N', morse: '-·', name: 'November', icon: 'N', description: 'Negative.'},
				{letter: 'O', morse: '---', name: 'Oscar', icon: 'O', description: 'Man overboard.'},
				{letter: 'P', morse: '·--·', name: 'Papa', icon: 'P', description: ''},
				{letter: 'Q', morse: '--·-', name: 'Quebec', icon: 'Q', description: 'My vessel is healthy and I request free pratique.'},
				{letter: 'R', morse: '·-·', name: 'Romeo', icon: 'R', description: 'No ICS meaning as single flag. Prior to 1969: The way is off my ship; you may feel your way past me.'},
				{letter: 'S', morse: '···', name: 'Sierra', icon: 'S', description: 'I am operating astern propulsion.'},
				{letter: 'T', morse: '-', name: 'Tango', icon: 'T', description: 'Keep clear of me. Fishing boats: "Keep clear of me; I am engaged in pair trawling."'},
				{letter: 'U', morse: '··-', name: 'Uniform', icon: 'U', description: '"You are running into danger."'},
				{letter: 'V', morse: '···-', name: 'Victor', icon: 'V', description: '"I require assistance." '},
				{letter: 'W', morse: '·--', name: 'Whiskey', icon: 'W', description: '"I require medical assistance." '},
				{letter: 'X', morse: '-··-', name: 'X-ray', icon: 'X', description: '"Stop carrying out your intentions and watch for my signals." '},
				{letter: 'Y', morse: '-·--', name: 'Yankee', icon: 'Y', description: '"I am dragging my anchor." '},
				{letter: 'Z', morse: '--··', name: 'Zulu', icon: 'Z', description: '"I require a tug."By fishing vessels near fishing grounds: "I am shooting nets."'},
			]
		},
		{
			header: 'Numeric flags',
			flags: [
				{letter: '0', morse: '·----', name: 'Zero', icon: '0', description: 'Zero'},
				{letter: '1', morse: '··---', name: 'One', icon: '1', description: 'One'},
				{letter: '2', morse: '···--', name: 'Two', icon: '2', description: 'Two'},
				{letter: '3', morse: '····-', name: 'Three', icon: '3', description: 'Three'},
				{letter: '4', morse: '·····', name: 'Four', icon: '4', description: 'Four'},
				{letter: '5', morse: '-····', name: 'Five', icon: '5', description: 'Five'},
				{letter: '6', morse: '--···', name: 'Six', icon: '6', description: 'Six'},
				{letter: '7', morse: '---··', name: 'Seven', icon: '7', description: 'Seven'},
				{letter: '8', morse: '----·', name: 'Eight', icon: '8', description: 'Eight'},
				{letter: '9', morse: '-----', name: 'Nine', icon: '9', description: 'Nine'},				
			]
		}
	]
	// const flags = [
	// 	{letter: 'A', name: 'Alpfa', icon: 'A', description: 'I have a diver down; keep well clear at slow speed.'},
	// 	{letter: 'B', name: 'Bravo', icon: 'B', description: 'I am taking in or discharging or carrying dangerous goods.'},
	// 	{letter: 'C', name: 'Charlie', icon: 'C', description: 'Affirmative.'},
	// 	{letter: 'D', name: 'Delta', icon: 'D', description: 'Keep clear of me; I am maneuvering with difficulty.'},
	// 	{letter: 'E', name: 'Echo', icon: 'E', description: 'I am altering my course to starboard.'},
	// 	{letter: 'F', name: 'Foxtrot', icon: 'F', description: 'I am disabled; communicate with me.'},
	// 	{letter: 'G', name: 'Golf', icon: 'G', description: 'I require a pilot or I am hauling nets (by fishing boats)'},
	// 	{letter: 'H', name: 'Hotel', icon: 'H', description: 'I have a pilot on board.'},
	// 	{letter: 'I', name: 'India', icon: 'I', description: 'I am altering my course to port.'},
	// 	{letter: 'J', name: 'Juliet', icon: 'J', description: 'I am on fire and have dangerous cargo on board: keep well clear of me. Or I am leaking dangerous cargo.'},
	// 	{letter: 'K', name: 'Kilo', icon: 'K', description: 'I wish to communicate with you.'},
	// 	{letter: 'L', name: 'Lima', icon: 'L', description: 'Stop immediately.'},
	// 	{letter: 'M', name: 'Mike', icon: 'M', description: 'My vessel is stopped and making no way through the water.'},
	// 	{letter: 'N', name: 'November', icon: 'N', description: 'Negative.'},
	// 	{letter: 'O', name: 'Oscar', icon: 'O', description: 'Man overboard.'},
	// 	{letter: 'P', name: 'Papa', icon: 'P', description: ''},
	// 	{letter: 'Q', name: 'Quebec', icon: 'Q', description: 'My vessel is healthy and I request free pratique.'},
	// 	{letter: 'R', name: 'Romeo', icon: 'R', description: 'No ICS meaning as single flag. Prior to 1969: The way is off my ship; you may feel your way past me.'},
	// 	{letter: 'S', name: 'Sierra', icon: 'S', description: 'I am operating astern propulsion.'},
	// 	{letter: 'T', name: 'Tango', icon: 'T', description: 'Keep clear of me. Fishing boats: "Keep clear of me; I am engaged in pair trawling."'},
	// 	{letter: 'U', name: 'Uniform', icon: 'U', description: '"You are running into danger."'},
	// 	{letter: 'V', name: 'Victor', icon: 'V', description: '"I require assistance." '},
	// 	{letter: 'W', name: 'Whiskey', icon: 'W', description: '"I require medical assistance." '},
	// 	{letter: 'X', name: 'X-ray', icon: 'X', description: '"Stop carrying out your intentions and watch for my signals." '},
	// 	{letter: 'Y', name: 'Yankee', icon: 'Y', description: '"I am dragging my anchor." '},
	// 	{letter: 'Z', name: 'Zulu', icon: 'Z', description: '"I require a tug."By fishing vessels near fishing grounds: "I am shooting nets."'},
	// 	{letter: '0', name: 'Zero', icon: '0', description: ''},
	// 	{letter: '1', name: 'One', icon: '1', description: ''},
	// 	{letter: '2', name: 'Two', icon: '2', description: ''},
	// 	{letter: '3', name: 'Three', icon: '3', description: ''},
	// 	{letter: '4', name: 'Four', icon: '4', description: ''},
	// 	{letter: '5', name: 'Five', icon: '5', description: ''},
	// 	{letter: '6', name: 'Six', icon: '6', description: ''},
	// 	{letter: '7', name: 'Seven', icon: '7', description: ''},
	// 	{letter: '8', name: 'Eight', icon: '8', description: ''},
	// 	{letter: '9', name: 'Nine', icon: '9', description: ''},
	// ]

	const createPopup: CreatePopup = getContext('createPopup');

	function openDescription(flag: any) {
		// if (flag.description !== '') {
			createPopup({
				header: `"${flag.name}" flag meaning`,
				content: {
					component: FlagCard,
					props: {
						flag
					}
				},
				bottomSticked: isMobileScreen
			})
		// }
	}

	title.set('Flags')
</script>
<section class="vertical-flex max-width">
	{#each flagsArray as flagCategory}
		<Section title="{flagCategory.header}">
			<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{6}">
				{#each flagCategory.flags as flag }
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="vertical-flex space Flag"
						on:click={() => openDescription(flag)}
					>
						<Image
							src="/flagIcons/{flag.icon.toLowerCase()}.svg"
							alt="{flag.letter}"
							--height="100%"
							--width="100%"
							--aspect-ratio="1/1"
							--object-fit="contain"
							--border-radius="5px"
						/>
						<span>{flag.letter} - {flag.name}</span>
					</div>
				{/each}
			</EqualGrid>
		</Section>
	{/each}
</section>

<!-- <style lang="scss">
	.Flag {
		:global(img) {
			background-color: rgba(0, 0, 0, 0.1);
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
		}
	}
</style> -->


