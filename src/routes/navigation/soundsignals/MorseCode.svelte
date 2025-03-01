<script lang="ts">
	import type { SoundSignalType } from "./types";

	export let morse: SoundSignalType['morse'];
</script>

{#if typeof morse === 'string'}
	<span class="morse">{morse}</span>		
{:else}
	<svelte:component this="{morse}" />
{/if}

<style lang="scss">
	.morse {
		font-family: monospace;
		letter-spacing: 2px;
		font-size: 32px;
	}
</style>