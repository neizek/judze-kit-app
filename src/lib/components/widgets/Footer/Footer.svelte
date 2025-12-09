<script lang="ts">
	import Donations from './Donations.svelte';
	import AboutUs from './AboutUs.svelte';
	import { createPopup } from '$widgets/PopUp';

	function openPopUp(header: string, component: ConstructorOfATypedSvelteComponent) {
		createPopup({
			header: header,
			content: {
				component: component,
			},
		});
	}
</script>

<footer class="vertical-flex space">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="line-blocks space-l">
		<span class="link pa-m" on:click={() => openPopUp('Support Us', Donations)}>
			Support Us
		</span>
		<span class="link pa-m" on:click={() => openPopUp('About Us', AboutUs)}>About Us</span>
	</div>
	<span>Judze {new Date().getFullYear()}</span>
</footer>

<style lang="scss">
	footer {
		padding-top: 24px;
		padding-bottom: calc(16px + env(safe-area-inset-bottom));
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>
