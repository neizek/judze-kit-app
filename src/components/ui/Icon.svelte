<script lang="ts">
	export let name: string;
	export let filled: boolean = false;
</script>

<span class="Icon material-icons notranslate {filled ? `filled` : ``}"
	>{name}</span
>

<style lang="scss">
	.Icon {
		font-size: var(--size);
		margin: var(--margin, 0);
	}
</style>
