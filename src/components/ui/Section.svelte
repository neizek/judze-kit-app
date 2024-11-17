<script lang="ts">
	export let title: string;
</script>

<div class="vertical-flex space max-width">
	<h2>{title}</h2>
	<div class="section-box">
		<slot></slot>
	</div>
</div>