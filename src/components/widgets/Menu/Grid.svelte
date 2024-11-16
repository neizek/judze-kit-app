<script context="module" lang="ts">
	export interface MenuItem {
		icon: string;
		label: string;
		link: string;
	}
</script>

<script lang="ts">
    import EqualGrid from "../../ui/EqualGrid.svelte";
    import Image from "../../ui/Image.svelte";

	export let items: MenuItem[];
</script>

<EqualGrid --mobileColumnsQty="{4}" --desktopColumnsQty="{6}" class="section-box">
	{#each items as item}
		<a href="{ item.link }" class="vertical-flex space centered-content" title="{ item.label }">
			<Image src="/icons/{item.icon}.svg" alt="{item.label}" --height="50px" --width="50px"/>
			<span>{ item.label }</span>
		</a>
	{/each}
</EqualGrid>