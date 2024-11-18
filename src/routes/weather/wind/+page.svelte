<script lang="ts">
    import { title } from "$lib/meta";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Section from "../../../components/ui/Section.svelte";
    import WindCard from "./WindCard.svelte";

	title.set('Wind')

	const windTable = [
		{
			header: 'Beaufort scale',
			steps: [
				{number: 0, description: 'Calm', windSpeed: '< 1 kn', waveHeight: '0m', seaState: '0', image: 'bf-0', seaConditions: 'Sea like a mirror'},
				{number: 1, description: 'Light air', windSpeed: '1–3 kn', waveHeight: '0 – 0.3m', seaState: '1', image: 'bf-1', seaConditions: 'Ripples with appearance of scales are formed, without foam crests'},
				{number: 2, description: 'Light breeze', windSpeed: '4–6 kn', waveHeight: '0.3 – 0.6m', seaState: '2', image: 'bf-2', seaConditions: 'Small wavelets still short but more pronounced; crests have a glassy appearance but do not break'},
				{number: 3, description: 'Gentle breeze', windSpeed: '7–10 kn', waveHeight: '0.6–1.2 m', seaState: '3', image: 'bf-3', seaConditions: 'Large wavelets; crests begin to break; foam of glassy appearance; perhaps scattered white horses '},
				{number: 4, description: 'Moderate breeze', windSpeed: '11–16 kn', waveHeight: '1–2 m', seaState: '3-4', image: 'bf-4', seaConditions: 'Small waves becoming longer; fairly frequent white horses'},
				{number: 5, description: 'Fresh breeze', windSpeed: '17–21 kn', waveHeight: '2–3 m', seaState: '4', image: 'bf-5', seaConditions: 'Moderate waves taking a more pronounced long form; many white horses are formed; chance of some spray'},
				{number: 6, description: 'Strong breeze', windSpeed: '22–27 kn', waveHeight: '3–4 m', seaState: '5', image: 'bf-6', seaConditions: 'Large waves begin to form; the white foam crests are more extensive everywhere; probably some spray'},
				{number: 7, description: 'Near gale', windSpeed: '28–33 kn', waveHeight: '4–5.5 m', seaState: '5-6', image: 'bf-7', seaConditions: 'Sea heaps up and white foam from breaking waves begins to be blown in streaks along the direction of the wind; spindrift begins to be seen '},
				{number: 8, description: 'Gale', windSpeed: '34–40 kn', waveHeight: '5.5–7.5 m', seaState: '6-7', image: 'bf-8', seaConditions: 'Moderately high waves of greater length; edges of crests break into spindrift; foam is blown in well-marked streaks along the direction of the wind '},
				{number: 9, description: 'Strong gale', windSpeed: '41–47 kn', waveHeight: '7–10 m', seaState: '7', image: 'bf-9', seaConditions: 'High waves; dense streaks of foam along the direction of the wind; sea begins to roll; spray affects visibility '},
				{number: 10, description: 'Storm', windSpeed: '48–55 kn', waveHeight: '9–12.5 m', seaState: '8', image: 'bf-10', seaConditions: 'Very high waves with long overhanging crests; resulting foam in great patches is blown in dense white streaks along the direction of the wind; on the whole the surface of the sea takes on a white appearance; rolling of the sea becomes heavy; visibility affected '},
				{number: 11, description: 'Violent storm', windSpeed: '56–63 kn', waveHeight: '11.5–16 m', seaState: '8', image: 'bf-11', seaConditions: 'Exceptionally high waves; small- and medium-sized ships might be for a long time lost to view behind the waves; sea is covered with long white patches of foam; everywhere the edges of the wave crests are blown into foam; visibility affected '},
				{number: 12, description: 'Hurricane', windSpeed: '≥ 64 kn', waveHeight: '≥ 14 m', seaState: '9', image: 'bf-12', seaConditions: 'The air is filled with foam and spray; sea is completely white with driving spray; visibility very seriously affected '},					
			]
		}
	]
</script>
{#each windTable as windTableType}
	<Section title="{windTableType.header}">
		<EqualGrid --desktopColumnsQty="{3}" --mobileColumnsQty{1}>
			{#each windTableType.steps as step}
				<WindCard windStep="{step}" />
			{/each}
		</EqualGrid>
	</Section>
{/each}