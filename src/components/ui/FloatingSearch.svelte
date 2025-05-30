<script lang="ts">
  import { fly, scale } from "svelte/transition";
import Input from "./Input.svelte";
	export let value: string; 
	let isActive: boolean = false;

	function handleClick() {
		if (isActive) value = '';
		isActive = !isActive;
	}
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="Float space-between space">
	{#if isActive}
		<div transition:fly="{{y: 200}}" class="max-width" style="max-width: 400px;">
			<Input bind:value="{value}" placeholder="Start typing..." />
		</div>
	{/if}
	<div class="SearchButton" style="border-radius: 100%" on:click={handleClick}>
		{#if isActive}
			<i in:scale class="material-icons">close</i>
		{:else}
			<i in:scale class="material-icons">search</i>
		{/if}
	</div>
</div>

<style lang="scss">
	.Float {
		z-index: 99;
		border-radius: 16px;
		position: fixed;
		bottom: 16px;
		right: 16px;
		left: 16px;
		justify-content: flex-end;

		& .SearchButton {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			> i {
				font-size: 36px;
			}
		}

		> * {
			padding: 8px;
			border-radius: 8px;
			background-color: var(--box-border-color);
		}
	}
</style>