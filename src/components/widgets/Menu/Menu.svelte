<script context="module" lang="ts">
    import type { MenuItem } from "./Grid.svelte";
    import Grid from "./Grid.svelte";

	export interface MenuSection {
		label: string;
		items: MenuItem[]
	}
</script>
	
<script lang="ts">
	export let menu: MenuSection[];
</script>

<div class="vertical-flex space">
	{#each menu as section }
		<div class="vertical space">
			<h2>{section.label}</h2>
			<Grid items="{section.items}" />
		</div>
	{/each}
</div>