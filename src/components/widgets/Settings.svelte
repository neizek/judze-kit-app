<script>
    import { theme, themesItems } from "$lib/theme";


    import FormItem from "../ui/FormItem.svelte";
    import SelectButtons from "../ui/SelectButtons.svelte";

</script>
<div class="vertical-flex space wrapper w400">
	<FormItem label="Color theme">
		<SelectButtons
			items="{themesItems}"
			bind:selectedItem={$theme}
		/>
	</FormItem>
</div>