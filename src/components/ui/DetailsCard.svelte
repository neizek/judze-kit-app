<script lang="ts">
    import Image from "./Image.svelte";


	export let image;
	export let details;
</script>

<div class="horizontal-layout space big">
	<Image
		src="{image.src}"
		alt="{image.alt}"
		--width="100px"
		--height="100px"
		--border-radius="5px"
		--background-color="#ffffff"
	/>
	<div class="vertical-flex space">
		{#each details as detail}
			<svelte:element this="{detail.tag}">
				{detail.text}
			</svelte:element>
		{/each}
	</div>
</div>