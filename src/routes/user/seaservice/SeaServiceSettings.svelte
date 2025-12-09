<script>
	import { daysCounterEnabled } from '$lib/stores/daysCounter';
	import FormItem from '$ui/FormItem.svelte';
	import Hint from '$ui/Hint.svelte';
	import Switch from '$ui/Switch.svelte';
</script>

<FormItem label="Days counter">
	<Switch label="Enable days counter widget" bind:value={$daysCounterEnabled} />
	<Hint>
		Toggle this setting to show a days counter on the main page. It automatically counts days
		from your most recent voyage.
	</Hint>
</FormItem>
