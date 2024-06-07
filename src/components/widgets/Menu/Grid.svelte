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
		<a href="{ item.link }" class="vertical-flex space centered-content">
			<i class="fa-solid fa-{item.icon}"></i>
			<span>{ item.label }</span>
		</a>
	{/each}
</div>

<style lang="scss">
	.Grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		a {
			i {
				font-size: 32px;
			}
		}
	}
</style>