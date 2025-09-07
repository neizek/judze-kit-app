<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let title: string | undefined = undefined;
	export let transparent: boolean = false;
	export let paddingless: boolean = false;
</script>

<div class="vertical-flex space-l max-width">
	<div class="space-between space-l" style="align-items: baseline;">
		{#if title}
			<h2 in:fade>{title}</h2>
		{/if}
		<slot name="controls"></slot>
	</div>
	<div class="section-box vertical space" class:transparent class:paddingless>
		<slot></slot>
	</div>
</div>
