<script lang="ts">
    import Image from "../../../components/ui/Image.svelte";

	export let flag;
</script>

<div class="horizontal-layout space big">
	<Image
		src="/flagIcons/{flag.letter ? 'navigational' : 'national'}/{flag.icon.toLowerCase()}.svg"
		alt="{flag.letter}"
		--width="100px"
		--height="100px"
		--object-fit="contain"
		--border-radius="5px"
		dropShadow
	/>
	<div class="vertical-flex Description">
		<div class="space-between">
			<span>Morse code: </span>
			<span class="morse">{flag.morse}</span>
		</div>
		<p>Meaning: {flag.description}</p>
	</div>
</div>

<style lang="scss">
	.Description {
		flex: 1;
		@include after-mobile {
			width: 300px;
		}
	}

	.morse {
		font-family: monospace; /* Use a monospace font for better alignment */
		letter-spacing: 2px; /* Space between characters */
		font-size: 36px;
	}
</style>