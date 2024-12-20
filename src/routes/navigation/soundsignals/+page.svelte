<script lang="ts">
    import isMobile, { isMobileScreen } from "$lib/deviceDetector";
	import { title } from "$lib/meta";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Image from "../../../components/ui/Image.svelte";
    import Bell from "./Bell.svelte";
    import BellGong from "./BellGong.svelte";

	$title = 'Sound signals'

	const signalsArray = [
		{
			header: "Perfect visibility",
			signals: [
				{morse: '·', description: 'Altering course to starboard'},
				{morse: '··', description: 'Altering course to port'},
				{morse: '···', description: 'Operating reverse propulsion'},
				{morse: '·····', description: 'I do not agree. I am unclear as to your intentions'},
				{morse: '--·', description: 'I wish to overtake to your starboard'},
				{morse: '--··', description: 'I wish to overtake to your starboard'},
				{morse: '-·-·', description: 'I agree with your overtake'}
			]
		},
		{
			header: "Restricted visibility",
			signals: [
				{morse: '-', description: 'Under power, under way and making way'},
				{morse: '--', description: 'Under power, under way and NOT making way'},
				{morse: '-··', description: 'Towing vessel | Not under command | Constrained by draft | Restricted maneuvrebility | Fishing'},
				{morse: '-···', description: 'Towed vessel'},
				{morse: '·-·', description: 'At anchor'},
				{morse: '····', description: 'Pilot vessel'},
				{morse: Bell, description: 'A vessel at anchor (< 100m length)'},
				{morse: BellGong, description: 'A vessel at anchor (> 100m length)'}
			]
		}
	]
</script>
<section class="equal-flex mobile max-width">
	{#each signalsArray as signalCategory}
		<div class="vertical-flex max-width space">
			<h2>{ signalCategory.header }</h2>
			<div class="Signals section-box equal-flex">
				{#each signalCategory.signals as signal}
					{#if typeof signal.morse === 'string'}
						<span class="morse">{signal.morse}</span>		
					{:else}
						<svelte:component this="{signal.morse}" />
					{/if}
					<span>{signal.description}</span>
				{/each}
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	.Signals {
		display: grid;
		grid-template-columns: 1fr 2fr;
		width: 100%;
		grid-gap: 16px;
		align-items: center;

		@include after-mobile {
			grid-template-columns: 1fr 2fr;
			grid-gap: 32px;
		}

		.morse {
			font-family: monospace; /* Use a monospace font for better alignment */
			letter-spacing: 2px; /* Space between characters */
			font-size: 36px;
		}
	}
</style>

