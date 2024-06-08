<script context="module" lang="ts">
	export interface MenuItem {
		icon: string;
		label: string;
		link: string;
	}
</script>

<script lang="ts">
	export let items: MenuItem[];
</script>

<div class="Grid section-box">
	{#each items as item}
		<a href="{ item.link }" class="vertical-flex space centered-content" title="{ item.label }">
			<img src="/icons/{item.icon}.svg" alt="{item.label}" />
			<span>{ item.label }</span>
		</a>
	{/each}
</div>

<style lang="scss">
	.Grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 16px;
		
		@include desktop {
			grid-template-columns: repeat(6, 1fr);
		}

		img {
			height: 50px;
			width: 50px;
		}
	}
</style>