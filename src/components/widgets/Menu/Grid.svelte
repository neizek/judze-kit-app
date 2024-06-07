<script context="module" lang="ts">
	interface MenuItem {
		icon: string;
		label: string;
		link: string;
	}
</script>

<script lang="ts">
	export let items: MenuItem[];
</script>

<div>
	{#each items as item}
		<a href="{ item.link }">
			<span>{ item.label }</span>
		</a>
	{/each}
</div>

<style lang="scss">
	
</style>