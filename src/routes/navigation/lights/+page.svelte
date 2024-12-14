<script lang="ts">
    import Image from "../../../components/ui/Image.svelte";
import Section from "../../../components/ui/Section.svelte";

	const lights = [
		{
			description: 'A vessel at anchor',
			images: [
				'anchored-bow',
				'anchored-side',
				'anchored-bow'
			]
		},
		{
			description: 'A vessel at anchor (over 100m in length)',
			images: [
				'anchored-bow',
				'anchored-100m-side',
				'anchored-bow'
			]
		},
		{
			description: 'A vessel not under command',
			images: [
				'nuc-bow',
				'nuc-side',
				'nuc-bow'
			]
		},
		{
			description: 'A vessel restricted in her ability to maneuver',
			images: [
				'restricted-bow',
				'restricted-side',
				'restricted-bow'
			]
		}
	]
</script>

<Section title="Navigational lights">
	<div class="vertical-flex space big">
		{#each lights as light}
			<div class="vertical-flex space">
				<div class="bam">
					{#each light.images as image, i}
						<Image
							src="/lights/{image}.svg"
							alt="sad"
							--aspect-ratio="{i === 1 ? `1/2` : `1/1`}"
							--width="100%"
							--height="200px"
							--object-fit="cover"
							--border-radius="5px"
						/>
					{/each}
				</div>
				<span>{light.description}</span>
			</div>
		{/each}
	</div>
</Section>

<style lang="scss">
	.bam {

		@include after-mobile {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			grid-gap: 6px;
		}
	}
</style>