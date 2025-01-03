<script lang="ts">
    import { getContext, type ComponentType, type SvelteComponent } from "svelte";
    import type { CreatePopup } from "../PopUp.svelte";
    import Donations from "./Donations.svelte";
    import { isMobileScreen } from "$lib/deviceDetector";
    import AboutUs from "./AboutUs.svelte";

	const createPopup: CreatePopup = getContext('createPopup');

	function openPopUp(header: string, component: ComponentType) {
		createPopup({
			header: header,
			content: {
				component: component,
			},
			bottomSticked: isMobileScreen
		});
	}
</script>

<footer class="vertical-flex space">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="line-blocks space big">
		<span class="link" on:click="{() => openPopUp('Donations', Donations)}">Donations</span>
		<span class="link" on:click="{() => openPopUp('About Us', AboutUs)}">About Us</span>
	</div>
	<span>Judze {new Date().getFullYear()}</span>
</footer>

<style lang="scss">
	footer {
		padding: 10px;
		padding-bottom: calc(10px + env(safe-area-inset-bottom, 0));
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>