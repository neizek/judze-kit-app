<script lang="ts">
	export let name: string;
</script>

<span class="Icon material-icons notranslate">{name}</span>

<style lang="scss">
	.Icon {
		font-size: var(--size);
		margin: var(--margin, 0);
	}
</style>