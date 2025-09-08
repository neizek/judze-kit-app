<script context="module" lang="ts">
	import type { MenuItem } from './Grid.svelte';
	import Grid from './Grid.svelte';

	export interface MenuSection {
		label: string;
		items: MenuItem[];
	}
</script>

<script lang="ts">
	import Section from '../../ui/Section.svelte';

	export let navTree: MenuSection[];
</script>

{#each navTree as section}
	<Section title={section.label}>
		<Grid items={section.items} />
	</Section>
{/each}
