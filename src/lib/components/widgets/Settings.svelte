<script lang="ts">
	import { isOfflineMode } from '$lib/stores/offlineMode';
	import { theme, themesItems } from '$lib/stores/theme';
	import FormItem from '../ui/FormItem.svelte';
	import SelectButtons from '../ui/SelectButtons.svelte';
	import Switch from '../ui/Switch.svelte';
</script>

<div class="Settings vertical-flex space-xl">
	<FormItem label="Color theme">
		<SelectButtons items={themesItems} bind:selectedItem={$theme} />
	</FormItem>
	<FormItem label="Offline mode">
		<Switch label="Disable data consumption" bind:value={$isOfflineMode} />
	</FormItem>
</div>

<style lang="scss">
	@include after-mobile {
		.Settings {
			min-width: 300px;
		}
	}
</style>
