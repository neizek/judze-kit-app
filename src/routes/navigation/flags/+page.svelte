<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { CreatePopup } from "../../../components/widgets/PopUp.svelte";
	import { title } from "$lib/meta";
	import { isMobileScreen } from "$lib/deviceDetector";
	import EqualGrid from "../../../components/ui/EqualGrid.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import FlagCard from "./FlagCard.svelte";
	import { allFlags, type FlagCategory } from "./flagsArrays";
	import FlagItem from "./FlagItem.svelte";
	import Selector from "../../../components/ui/Selector.svelte";
	// import FloatingSearch from "../../../components/ui/FloatingSearch.svelte";

	// let choosenCategory: 'national' | 'navigational' = 'navigational'
	// let searchValue: string;
	let isNavigational: boolean = true;
	let flagsArray: FlagCategory[];

	function getAllFlags() {
		flagsArray = allFlags.filter((category) => {
			return category.isNavigational === isNavigational;
		});
		// if (searchValue !== '' && searchValue) {
		// 	flagsArray.forEach((category, index) => {
		// 		category.flags = category.flags.filter(flag => flag.name.indexOf(searchValue) !== -1);
		// 	})
		// }
		// console.log(flagsArray)
	}

	getAllFlags();

	$: {
		isNavigational;
		// searchValue;
		getAllFlags();
	}

	const createPopup: CreatePopup = getContext("createPopup");

	function openDescription(flag: any) {
		if (flag.description !== "" && flag.description) {
			createPopup({
				header: `"${flag.name}" flag meaning`,
				content: {
					component: FlagCard,
					props: {
						flag,
					},
				},
				bottomSticked: isMobileScreen,
			});
		}
	}

	title.set("Flags");
</script>

<div class="vertical-flex space-xl max-width">
	<div style="align-self: end;">
		<Selector
			items={[
				{ label: "Navigational", value: true },
				{ label: "National", value: false },
			]}
			bind:value={isNavigational}
		/>
	</div>
	{#each flagsArray as flagCategory}
		<Section title={flagCategory.header}>
			<EqualGrid --mobileColumnsQty={3} --desktopColumnsQty={6}>
				{#each flagCategory.flags as flag}
					<FlagItem
						{isNavigational}
						icon="{isNavigational
							? 'navigational'
							: 'national'}/{flag.icon.toLocaleLowerCase()}.svg"
						title={flag.letter ? `${flag.letter} - ${flag.name}` : flag.name}
						on:click={() => openDescription(flag)}
					/>
				{/each}
			</EqualGrid>
		</Section>
	{/each}
	<!-- <FloatingSearch bind:value="{searchValue}" /> -->
</div>
