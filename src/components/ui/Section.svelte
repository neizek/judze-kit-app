<script lang="ts">
	export let title: string | undefined = undefined;
</script>

<div class="vertical-flex space max-width">
	{#if title}
		<h2>{title}</h2>
	{/if}
	<div class="section-box">
		<slot></slot>
	</div>
</div>