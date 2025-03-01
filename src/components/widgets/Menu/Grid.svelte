<script context="module" lang="ts">
	export interface MenuItem {
		icon: string;
		label: string;
		link: string;
	}
</script>

<script lang="ts">
    import { scale } from "svelte/transition";
import EqualGrid from "../../ui/EqualGrid.svelte";
    import Image from "../../ui/Image.svelte";

	export let items: MenuItem[];
</script>

<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{6}">
	{#each items as item}
		<a href="{ item.link }" class="vertical-flex space centered-content" title="{ item.label }">
			<Image  src="/icons/{item.icon}.svg" alt="{item.label}" --height="55px" --width="55px"/>
			<span>{ item.label }</span>
		</a>
	{/each}
</EqualGrid>