<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$ui/Button.svelte';
	import PageControls from '$ui/PageControls.svelte';
	import Section from '$ui/Section.svelte';

	const controls = [
		{ label: 'Profile', link: 'profile' },
		{ label: 'Documents', link: 'documents' },
		{ label: 'Sea service', link: 'seaservice' },
	];

	function onButtonClick(link: string) {
		goto(`/user/${link}`, {
			replaceState: true,
		});
	}
</script>

<section class="vertical-flex space-xl max-width">
	<Section transparent>
		<div class="line-blocks space-xl">
			<div class="Photo"></div>
			<div class="vertical-flex space">
				<h4>Pavels Huhrjanskis</h4>
				<span>3rd Officer</span>
			</div>
		</div>
	</Section>
	<PageControls>
		{#each controls as button}
			<Button
				type={button.link === $page.url.pathname.split('/').at(-1) ? 'tab' : 'transparent'}
				label={button.label}
				on:click={() => onButtonClick(button.link)} />
		{/each}
	</PageControls>
	<slot></slot>
</section>

<style lang="scss">
	.Photo {
		width: 100px;
		height: 100px;
		border-radius: 100%;
		background-color: var(--box-background-color);
	}
</style>
