<script lang="ts">
    import Image from "../../../components/ui/Image.svelte";
	export let isNavigational: boolean;
	export let icon: string;
	export let title: string;
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="vertical-flex space Flag" on:click>
	<Image
		src="/flagIcons/{icon}"
		alt="{title}"
		--width="100%"
		--aspect-ratio="{isNavigational ? `1/1` : `4/3`}"
		--object-fit="contain"
		--border-radius="5px"
		dropShadow
	/>
	<span>{title}</span>
</div>