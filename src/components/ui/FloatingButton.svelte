<script lang="ts">
	import Icon from "./Icon.svelte";

	export let icon: string;
</script>

<div class="Floating pa-l">
	<Icon name="{icon}" />
</div>

<style lang="scss">
	.Floating {
		display: flex;
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>