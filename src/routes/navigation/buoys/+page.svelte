<script lang="ts">
	import { getContext } from "svelte";
	import EqualGrid from "../../../components/ui/EqualGrid.svelte";
	import Image from "../../../components/ui/Image.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
	import { isMobileScreen } from "$lib/deviceDetector";
	import DetailsCard from "../../../components/ui/DetailsCard.svelte";
	import { title } from "$lib/meta";
	import Selector from "../../../components/ui/Selector.svelte";

	type BuoyType = {
		title: string;
		image: string;
		description: string;
		lightSequence?: string;
		iala?: "a" | "b";
	};

	interface BuoysInterface {
		header: string;
		buoys: BuoyType[];
	}

	let currentIala = "a";
	const buoysArray: BuoysInterface[] = [
		{
			header: "Lateral marks",
			buoys: [
				{
					title: "Lateral port mark",
					image: "lateral-port.svg",
					description:
						"Lateral marks indicate the port and starboard sides of channels. The marks topped by a red can shape are called Port Marks.",
					iala: "a",
				},
				{
					title: "Lateral starboard mark",
					image: "lateral-stbd.svg",
					description:
						"Lateral marks indicate the port and starboard sides of channels. The marks topped topped by a green triangle shape are called Starboard Marks.",
					iala: "a",
				},
				{
					title: "Lateral port mark",
					image: "lateral-port-b.svg",
					description:
						"Lateral marks indicate the port and starboard sides of channels. The marks topped by a red triangle shape are called Port Marks.",
					iala: "b",
				},
				{
					title: "Lateral starboard mark",
					image: "lateral-stbd-b.svg",
					description:
						"Lateral marks indicate the port and starboard sides of channels. The marks topped topped by a green can shape are called Starboard Marks.",
					iala: "b",
				},
			],
		},
		{
			header: "Cardinal marks",
			buoys: [
				{
					title: "North cardinal mark",
					image: "cardinal-north.svg",
					lightSequence: "VQ or Q",
					description:
						"Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the north of this cardinal mark.",
				},
				{
					title: "East cardinal mark",
					image: "cardinal-east.svg",
					lightSequence: "VQ (3) 5s or Q (3) 10s",
					description:
						"Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the east of this cardinal mark.",
				},
				{
					title: "South cardinal mark",
					image: "cardinal-south.svg",
					lightSequence: "VQ (6) + LFL 10s or Q (6) + LFL 15s",
					description:
						"Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the south of this cardinal mark.",
				},
				{
					title: "West cardinal mark",
					image: "cardinal-west.svg",
					lightSequence: "VQ (9) 10s or Q (9) 15s",
					description:
						"Cardinal marks are used where lateral marks would be inappropriate or confusing. They indicate the safe side to pass a danger or a feature, such as a bend in channel or end of a shoal. You should pass to the west of this cardinal mark.",
				},
			],
		},
		{
			header: "Other marks",
			buoys: [
				{
					title: "Isolated danger mark",
					image: "isolated-danger.svg",
					description:
						"Isolated danger marks indicate a specific danger with navigable water all around. The mark is a black pillar with a red band in the middle with 2 black sphere top marks. If an isolated danger mark is lit, it will have a white light flashing in groups of 2. In general, keep clear of an isolated danger mark.",
				},
				{
					title: "Safe water mark",
					image: "safe-water.svg",
					description:
						"Safe water marks indicate that there is safe water all around. It is often used to mark the seaward end of channels into ports. They are sometimes used to mark the centre of a channel; or are used in a series down the middle of a channel instead of lateral marks on the edges of the channel. Safe water marks have red and white vertical stripes and may have a red top mark.",
				},
				{
					title: "Special mark",
					image: "special.svg",
					description:
						"Special marks are used to indicate special areas or features, such as: traffic separation marks, spoil ground (for waste or dredging material), aquaculture. Special marks are yellow and have a cross-shaped top mark. If lit, a special mark will have a yellow light that flashes in a different pattern to cardinal, isolated danger and safe water marks.",
				},
				{
					title: "New danger mark",
					image: "new-mark.svg",
					description:
						"New Danger Marks (also known as Emergency Wreck Marking Buoys) are used to identify newly discovered hazards such as a sandbar, rock, reef or wreck which has not already been marked on boating maps or nautical charts.  The new danger mark displays blue and yellow vertical stripes in equal number dimensions around the mark.",
				},
			],
		},
	];

	const createPopup: CreatePopup = getContext("createPopup");

	function openDescription(buoy: any) {
		createPopup({
			header: buoy.title,
			content: {
				component: DetailsCard,
				props: {
					image: {
						src: `/buoys/${buoy.image}`,
						alt: buoy.title,
					},
					details: [
						{
							tag: "p",
							text: buoy.description,
						},
						{
							tag: "span",
							title: "Light sequence",
							text: buoy.lightSequence,
						},
					],
				},
			},
			bottomSticked: isMobileScreen,
		});
	}

	title.set("Buoys");
</script>

<section class="vertical-flex max-width space-xl">
	<div style="align-self: end;">
		<Selector
			items={[
				{ value: "a", label: "IALA System A" },
				{ value: "b", label: "IALA System B" },
			]}
			bind:value={currentIala}
		/>
	</div>
	{#each buoysArray as buoysCategory}
		<Section title={buoysCategory.header}>
			<EqualGrid --desktopColumnsQty={4} --mobileColumnsQty={2}>
				{#each buoysCategory.buoys as buoy}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if !buoy.iala || (buoy.iala && buoy.iala === currentIala)}
						<div
							class="vertical-flex space"
							role="button"
							tabindex="0"
							on:click={() => openDescription(buoy)}
						>
							<Image
								src="/buoys/{buoy.image}"
								alt={buoy.title}
								--width="100%"
								--aspect-ratio="1/1"
								--object-fit="contain"
								--border-radius="5px"
								--background-color="#ffffff"
							/>
							<span>{buoy.title}</span>
						</div>
					{/if}
				{/each}
			</EqualGrid>
		</Section>
	{/each}
</section>
