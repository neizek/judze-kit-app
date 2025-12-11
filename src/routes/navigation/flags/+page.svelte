<script lang="ts">
	import { title } from '$lib/stores/meta';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import Section from '$ui/Section.svelte';
	import FlagCard from './FlagCard.svelte';
	import { allFlags, type FlagCategory } from './flagsArrays';
	import FlagItem from './FlagItem.svelte';
	import Selector from '$ui/Selector.svelte';
	import Input from '$ui/Input.svelte';
	import PageControls from '$ui/PageControls.svelte';
	import EmptySection from '$ui/EmptySection.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { Flag, FlagOff, Search } from '@lucide/svelte';
	import DetailsCard from '$ui/DetailsCard/DetailsCard.svelte';

	let searchValue: string = '';
	let isNavigational: boolean = true;
	let flagsArray: FlagCategory[];

	function getAllFlags() {
		const search = searchValue.toLowerCase();

		flagsArray = allFlags
			.filter((category) => category.isNavigational === isNavigational)
			.map((category) => ({
				...category,
				flags: category.flags.filter(
					(flag) => search === '' || flag.name.toLowerCase().includes(search)
				),
			}));
	}

	$: {
		isNavigational;
		searchValue;
		getAllFlags();
	}

	function openDescription(flag: any) {
		if (flag.description !== '' && flag.description) {
			createPopup({
				header: `"${flag.name}" flag meaning`,
				icon: Flag,
				content: {
					component: FlagCard,
					props: {
						flag,
					},
				},
			});
		} else {
			createPopup({
				header: flag.name,
				icon: Flag,
				content: {
					component: DetailsCard,
					props: {
						image: {
							src: `/flagIcons/national/${flag.icon.toLowerCase()}.svg`,
						},
						isBigImage: true,
						details: [
							{
								tag: 'div',
								class: 'flex space-between space-l',
								children: [
									{ tag: 'span', title: 'ISO Code', text: flag.iso },

									{ tag: 'span', title: 'Phone code', text: `+${flag.code}` },
								],
							},
						],
					},
				},
			});
		}
	}

	title.set('Flags');
</script>

<div class="vertical-flex space-xl max-width">
	<PageControls>
		<div>
			<Input
				bind:value={searchValue}
				icon={Search}
				placeholder="Search..."
				borderless
				clearable />
		</div>
		<Selector
			items={[
				{ label: 'Navigational', value: true },
				{ label: 'National', value: false },
			]}
			bind:value={isNavigational} />
	</PageControls>
	{#each flagsArray as flagCategory}
		<Section title={flagCategory.header}>
			{#if flagCategory.flags.length > 0}
				<EqualGrid --mobileColumnsQty={3} --desktopColumnsQty={6} --tabletColumnsQty={4}>
					{#each flagCategory.flags as flag}
						<FlagItem
							{isNavigational}
							icon="{isNavigational
								? 'navigational'
								: 'national'}/{flag.icon.toLocaleLowerCase()}.svg"
							title={flag.letter ? `${flag.letter} - ${flag.name}` : flag.name}
							on:click={() => openDescription(flag)} />
					{/each}
				</EqualGrid>
			{:else}
				<EmptySection note="No any flags were found" icon={FlagOff} />
			{/if}
		</Section>
	{/each}
</div>
