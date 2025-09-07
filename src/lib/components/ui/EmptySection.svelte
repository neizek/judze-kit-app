<script lang="ts">
	import Icon from './Icon.svelte';

	export let note: string;
	export let icon: string;
</script>

<div class="section-box centered-content vertical-flex space">
	<Icon name={icon} />
	<span>{note}</span>
</div>
