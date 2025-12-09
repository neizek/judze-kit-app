<script lang="ts">
	import type { Icon as IconType } from '@lucide/svelte';

	export let note: string;
	export let icon: typeof IconType;
</script>

<div class="section-box centered-content vertical-flex space">
	<svelte:component this={icon} />
	<span>{note}</span>
</div>
