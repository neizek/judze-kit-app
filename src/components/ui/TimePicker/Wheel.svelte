<script lang="ts">
	import { onMount } from "svelte";

	export let items: number;
	export let choosenItem: number;

	let wheelBlock: HTMLElement;
	let itemHeight: number;

	onMount(() => {
		itemHeight = wheelBlock.scrollHeight / (items + 2);
		wheelBlock.scrollBy({
			top: itemHeight * choosenItem,
		});
	});

	function handleScroll(event: Event) {
		const target = event.target as HTMLElement;
		const scrollTop = target.scrollTop;
		choosenItem = Math.floor(scrollTop / itemHeight);
	}
</script>

<div
	class="vertical-flex space wheel"
	bind:this={wheelBlock}
	on:scroll={handleScroll}
>
	<span>_</span>
	{#each Array(items) as _, index}
		<span class:active={choosenItem === index}>{index}</span>
	{/each}
	<span>_</span>
</div>

<style lang="scss">
	.wheel {
		scroll-snap-type: y mandatory;
		scroll-snap-stop: always;
		overflow-y: scroll;
		height: 100px;
		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		span {
			display: block;
			scroll-snap-align: center;
			text-align: center;
			font-size: 24px;
			opacity: 0.3;
			transform: scale(0.7);

			&.active {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
</style>
