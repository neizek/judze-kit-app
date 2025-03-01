<script lang="ts">
  import { fade, fly } from "svelte/transition";

	export let title: string | undefined = undefined;
</script>

<div class="vertical-flex space big max-width">
	{#if title}
		<h2 in:fade>{title}</h2>
	{/if}
	<div class="section-box">
		<slot></slot>
	</div>
</div>