<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let title: string | undefined = undefined;
	export let transparent: boolean = false;
	export let paddingless: boolean = false;
</script>

<div class="flex flex-column space-l max-width">
	<div class="space-between space-l ai-center">
		{#if title}
			<h2 style="text-indent: var(--size-m);" in:fade>{title}</h2>
		{/if}
		<slot name="controls"></slot>
	</div>
	<div class="section-box flex flex-column space-l" class:transparent class:paddingless>
		<slot></slot>
	</div>
</div>
