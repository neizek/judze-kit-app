<script lang="ts">
    import Image from "../../../components/ui/Image.svelte";

	export let buoy;
</script>

<div class="horizontal-layout space big">
	<Image
		src="/buoys/{buoy.image}"
		alt="{buoy.title}"
		--width="100px"
		--height="100px"
		--border-radius="5px"
	/>
	<p>{buoy.description}</p>
</div>