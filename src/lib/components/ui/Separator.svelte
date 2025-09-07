<script lang="ts">
	export let transparent: boolean = false;
</script>

<hr class:transparent />

<style lang="scss">
	hr {
		border: none;
		border-top: 1px solid var(--input-border-color);

		&.transparent {
			border-top: none;
		}
	}
</style>
