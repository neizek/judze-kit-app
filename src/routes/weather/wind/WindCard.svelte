<script lang="ts">
    import { fly } from "svelte/transition";
    import Image from "../../../components/ui/Image.svelte";

	export let windStep;
	export let isBf: boolean;
	let showDetails: boolean = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="WindCard" on:click="{() => showDetails = !showDetails}" on:mouseenter={() => showDetails = true} on:mouseleave="{() => showDetails = false}">
	<Image
		src="/wind/{windStep.image}.jpg"
		alt="Wind" --width="100%"
		--aspect-ratio="1.5/1"
		--border-radius="5px"
		--object-fit="cover"
	/>
	<div class="header space-between space max-width">
		<h3>{isBf ? 'BF ': ''}{windStep.number}</h3>
		<div class="vertical-flex" style="text-align: right;">
			<h3>{windStep.description}</h3>
			{#if windStep.windSpeed}
				<span>{windStep.windSpeed}</span>
			{/if}
		</div>
	</div>
	{#if showDetails && windStep.seaConditions}
		<div class="description vertical-flex space" transition:fly="{{ y: 200, duration: 200}}">
			{#if windStep.seaState && windStep.seaState}
				<div class="space-between">
					<span>State: {windStep.seaState}</span>
					<span>Waves: {windStep.waveHeight}</span>
				</div>
			{/if}
			<p>{windStep.seaConditions}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.WindCard {
		--padding: 4px 8px;
		overflow: hidden;
		display: flex;

		p {
			font-size: 12px;
		}

		> div.header {
			position: absolute;
			top: 0;
			padding: var(--padding);
			text-shadow: 1px 1px 2px black;
		}

		> div.description {
			background: rgb(0,0,0);
			background: linear-gradient(0deg, rgba(0,0,0,0.6038748262977065) 0%, rgba(0,0,0,0) 100%);
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: var(--padding);
			border-radius: 5px;
			// background-color: #00000060;
		}
	}
</style>