<script lang="ts">
	import { getContext } from "svelte";
	import EqualGrid from "../../../components/ui/EqualGrid.svelte";
	import Image from "../../../components/ui/Image.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
	import DetailsCard from "../../../components/ui/DetailsCard.svelte";
	import { isMobileScreen } from "$lib/deviceDetector";
	import { title } from "$lib/meta";

	const shapes = [
		{
			title: "Anchored",
			image: "anchored",
			location: "Foremast.",
			description: "A vessel at anchor shows a single ball.",
		},
		{
			title: "Sailing",
			image: "sailing",
			location: "Foremast.",
			description:
				"A sailboat moving under power (motor-sailing) shows a cone with the apex pointing down.  A Canadian modifications to the COLREGS makes this shape optional for vessels of less than 12 metres.",
		},
		{
			title: "Towing",
			image: "towing",
			location: "Foremast for towed vessel & main mast for towing one.",
			description:
				"A vessel engaged in towing, if the tow exceeds 200m, will show a diamond shape. The towed vessel or object will show a diamond as well if the tow exceeds 200m.",
		},
		{
			title: "Fishing",
			image: "fishing",
			location: "Foremast or main mast.",
			description:
				"A vessel engaged in fishing will show two cones, apex to apex, in the shape of an hourglass.",
		},
		{
			title: "NUC",
			image: "nuc",
			location: "Foremast or main mast.",
			description: "A vessel not under command will show two balls. ",
		},
		{
			title: "Minesweeper",
			image: "minesweeping",
			location: "Foremast or fore yard of the vessel.",
			description:
				"A vessel engaged in mine clearance will show three balls. One at the top of a foremast and one at either end of a yard below the first ball. All three in a triangle configuration.",
		},
		{
			title: "Restricted",
			image: "restricted",
			location: "Foremast.",
			description:
				"A vessel restricted in ability to manoeuvre will show two balls with a diamond between them. When on a vessel engaged in towing there may be a separate diamond shape if the tow exceeds 200m.",
		},
		{
			title: "Constrained",
			image: "constrained",
			location: "Main mast.",
			description: "A vessel constrained by draft will show a cylinder.",
		},
		{
			title: "Aground",
			image: "aground",
			location: "Foremast.",
			description: "A vessel aground will show three balls.",
		},
		{
			title: "Restricted with side",
			image: "restricted-side",
			location: "Displayed where it can be best seen.",
			description:
				"A vessel restricted in ability to manoeuvre will show the ball-diamond-ball shapes and, if there is equipment obstructing a side, the blocked side will be indicated by two balls and the open side by two diamonds. ",
		},
		{
			title: "Fishing with gear",
			image: "fishing-with-gear",
			location: "Displayed where it can be best seen.",
			description:
				"A vessel engaged in fishing that has gear over the side extending more than 150m from the vessel will indicate the location of that gear with a cone with the apex pointing upwards. ",
		},
	];

	const createPopup: CreatePopup = getContext("createPopup");

	function openDescription(shape: any) {
		createPopup({
			header: shape.title,
			content: {
				component: DetailsCard,
				props: {
					image: {
						src: `/shapes/${shape.image}.svg`,
						alt: shape.title,
					},
					details: [
						{
							tag: "span",
							title: "Location",
							text: shape.location,
						},
						{
							tag: "p",
							text: shape.description,
						},
					],
				},
			},
			bottomSticked: isMobileScreen,
		});
	}

	title.set("Shapes");
</script>

<Section title="Navigational shapes">
	<EqualGrid --desktopColumnsQty={4} --mobileColumnsQty={2}>
		{#each shapes as shape}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="vertical-flex space"
				role="button"
				tabindex="0"
				on:click={() => openDescription(shape)}
			>
				<Image
					src="/shapes/{shape.image}.svg"
					alt={shape.description}
					--width="100%"
					--aspect-ratio="1/1"
					--object-fit="contain"
					--border-radius="5px"
					--background-color="#ffffff"
				/>
				<span>{shape.title}</span>
			</div>
		{/each}
	</EqualGrid>
</Section>
