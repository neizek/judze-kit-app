<script lang="ts">
    import { getContext } from "svelte";
    import type { CreatePopup } from "../PopUp.svelte";
    import Donations from "./Donations.svelte";
    import { isMobileScreen } from "$lib/deviceDetector";
    import AboutUs from "./AboutUs.svelte";
	// import WaveSVG from "../../../../static/wave.svg"

	const createPopup: CreatePopup = getContext('createPopup');

	function openPopUp(header: string, component: ConstructorOfATypedSvelteComponent) {
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
		<span class="link pa-l" on:click="{() => openPopUp('Support Us', Donations)}">Support Us</span>
		<span class="link pa-l" on:click="{() => openPopUp('About Us', AboutUs)}">About Us</span>
	</div>
	<span>Judze {new Date().getFullYear()}</span>
	<!-- <WaveSVG />  -->
</footer>

<style lang="scss">
	
	footer {
		padding-top: 24px;
		padding-bottom: calc(16px + env(safe-area-inset-bottom));
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		// background: url('/wave.svg') no-repeat center center;
		// background-size: cover;
	}
</style>