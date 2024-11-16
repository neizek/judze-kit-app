<script lang="ts">
    import { getContext } from "svelte";
    import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
    import { title } from "$lib/meta";
    import isMobile from "$lib/deviceDetector";
    import Image from "../../../components/ui/Image.svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";

	const flags = [
		{letter: 'A', name: 'Alpfa', icon: 'A', description: 'I have a diver down; keep well clear at slow speed.'},
		{letter: 'B', name: 'Bravo', icon: 'B', description: 'I am taking in or discharging or carrying dangerous goods.'},
		{letter: 'C', name: 'Charlie', icon: 'C', description: 'Affirmative.'},
		{letter: 'D', name: 'Delta', icon: 'D', description: 'Keep clear of me; I am maneuvering with difficulty.'},
		{letter: 'E', name: 'Echo', icon: 'E', description: 'I am altering my course to starboard.'},
		{letter: 'F', name: 'Foxtrot', icon: 'F', description: 'I am disabled; communicate with me.'},
		{letter: 'G', name: 'Golf', icon: 'G', description: 'I require a pilot or I am hauling nets (by fishing boats)'},
		{letter: 'H', name: 'Hotel', icon: 'H', description: 'I have a pilot on board.'},
		{letter: 'I', name: 'India', icon: 'I', description: 'I am altering my course to port.'},
		{letter: 'J', name: 'Juliet', icon: 'J', description: 'I am on fire and have dangerous cargo on board: keep well clear of me. Or I am leaking dangerous cargo.'},
		{letter: 'K', name: 'Kilo', icon: 'K', description: 'I wish to communicate with you.'},
		{letter: 'L', name: 'Lima', icon: 'L', description: 'Stop immediately.'},
		{letter: 'M', name: 'Mike', icon: 'M', description: 'My vessel is stopped and making no way through the water.'},
		{letter: 'N', name: 'November', icon: 'N', description: 'Negative.'},
		{letter: 'O', name: 'Oscar', icon: 'O', description: 'Man overboard.'},
		{letter: 'P', name: 'Papa', icon: 'P', description: ''},
		{letter: 'Q', name: 'Quebec', icon: 'Q', description: 'My vessel is healthy and I request free pratique.'},
		{letter: 'R', name: 'Romeo', icon: 'R', description: 'No ICS meaning as single flag. Prior to 1969: The way is off my ship; you may feel your way past me.'},
		{letter: 'S', name: 'Sierra', icon: 'S', description: 'I am operating astern propulsion.'},
		{letter: 'T', name: 'Tango', icon: 'T', description: 'Keep clear of me. Fishing boats: "Keep clear of me; I am engaged in pair trawling."'},
		{letter: 'U', name: 'Uniform', icon: 'U', description: '"You are running into danger."'},
		{letter: 'V', name: 'Victor', icon: 'V', description: '"I require assistance." '},
		{letter: 'W', name: 'Whiskey', icon: 'W', description: '"I require medical assistance." '},
		{letter: 'X', name: 'X-ray', icon: 'X', description: '"Stop carrying out your intentions and watch for my signals." '},
		{letter: 'Y', name: 'Yankee', icon: 'Y', description: '"I am dragging my anchor." '},
		{letter: 'Z', name: 'Zulu', icon: 'Z', description: '"I require a tug."By fishing vessels near fishing grounds: "I am shooting nets."'},
		{letter: '0', name: 'Zero', icon: '0', description: ''},
		{letter: '1', name: 'One', icon: '1', description: ''},
		{letter: '2', name: 'Two', icon: '2', description: ''},
		{letter: '3', name: 'Three', icon: '3', description: ''},
		{letter: '4', name: 'Four', icon: '4', description: ''},
		{letter: '5', name: 'Five', icon: '5', description: ''},
		{letter: '6', name: 'Six', icon: '6', description: ''},
		{letter: '7', name: 'Seven', icon: '7', description: ''},
		{letter: '8', name: 'Eight', icon: '8', description: ''},
		{letter: '9', name: 'Nine', icon: '9', description: ''},
	]

	const createPopup: CreatePopup = getContext('createPopup');

	function openDescription(flag: string, description: string) {
		if (description !== '') {
			createPopup({
				header: `"${flag}" flag meaning`,
				content: description,
				bottomSticked: isMobile
			})
		}
	}

	title.set('Flags')
</script>

<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{6}" class="section-box">
	{#each flags as flag }
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="vertical-flex space"
			on:click={() => openDescription(flag.name, flag.description)}
		>
			<Image
				src="/flagIcons/{flag.icon.toLowerCase()}.svg"
				alt="{flag.letter}"
				--height="100%"
				--width="100%"
				--aspect-ratio="1/1"
				--object-fit="contain"
			/>
			<span>{flag.letter} - {flag.name}</span>
		</div>
	{/each}
</EqualGrid>

