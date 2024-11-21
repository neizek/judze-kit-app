<script lang="ts">
    import { onMount } from "svelte";
    import Input from "./Input.svelte";

	export let value: any = undefined;

	function format() {
		if (value < 0) {
			value = 0;
		} else if (value > 360) {
			value = 360;
		}
			value = value.toString().padStart(3, '0');
	}

	onMount(()=> {
		format();
	})
</script>

<Input type="number" max="{360}" min="{0}" bind:value="{value}" on:change="{format}"/>