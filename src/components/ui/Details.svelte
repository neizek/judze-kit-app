<script lang="ts">
	export let header: string;
</script>

<details>
	<summary class="space-between">
		<h3>{ header }</h3>
		<i class="fa-solid fa-chevron-left"></i>
	</summary>
	<article><slot></slot></article>
</details>

<style lang="scss">
	summary::marker {
		content: '';
	}

	article {
		border-left: 2px solid $c-sky;
		padding: 10px;
		margin-top: 10px;

		@include after-mobile {
			padding: 20px;
		}
	}

	summary > i {
		transition: transform .2s ease-in-out;
	}

	details[open] > summary > i {
		transform: rotate(-90deg);
	}
</style>