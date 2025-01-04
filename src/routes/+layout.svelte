<script lang="ts">
    import { title } from "$lib/meta";
    import { initTheme } from "$lib/theme";
    import Footer from "../components/widgets/Footer/Footer.svelte";
    import Header from "../components/widgets/Header.svelte";
    import PopUp from "../components/widgets/PopUp.svelte";

	initTheme();
</script>

<svelte:head>
	<title>{ $title }</title>
</svelte:head>
<PopUp>
	<Header />
	<div class="Content wrapper w1000">
		<slot></slot>
	</div>
	<Footer />
</PopUp>

<style lang="scss">
	.Content {
		display: flex;
		flex: 1;
		margin-top: calc(66px + env(safe-area-inset-top));

		@include after-mobile {
			margin-top: calc(82px + env(safe-area-inset-top));
		}
	}
</style>