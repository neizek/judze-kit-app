<script>
    import { theme, themesItems } from "$lib/theme";


    import FormItem from "../ui/FormItem.svelte";
    import SelectButtons from "../ui/SelectButtons.svelte";

</script>
<div class="Settings vertical-flex space">
	<FormItem label="Color theme">
		<SelectButtons
			items="{themesItems}"
			bind:selectedItem={$theme}
		/>
	</FormItem>
</div>

<style lang="scss">
	@include after-mobile {
		.Settings {
			min-width: 300px;
		}
	}
</style>