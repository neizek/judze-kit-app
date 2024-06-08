<script context="module" lang="ts">
    import type { MenuItem } from "./Grid.svelte";
    import Grid from "./Grid.svelte";

	export interface MenuSection {
		label: string;
		items: MenuItem[]
	}
</script>
	
<script lang="ts">
	export let navTree: MenuSection[];
</script>

<section class="vertical-flex">
	{#each navTree as section }
		<div class="vertical small space">
			<h2>{section.label}</h2>
			<Grid items="{section.items}" />
		</div>
	{/each}
</section>