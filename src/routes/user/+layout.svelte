<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { seaServiceStore } from '$lib/stores/seaService';
	import Selector from '$ui/Selector.svelte';
	import { Ship, User } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const controls = [
		{ label: 'Profile', value: '/user/profile', icon: User },
		{ label: 'Sea service', value: '/user/seaservice', icon: Ship },
		// { label: 'Documents', link: 'documents' },
	];

	let currentTab = page.url.pathname;

	function onButtonClick() {
		goto(currentTab, {
			replaceState: true,
		});
	}
</script>

<section class="vertical-flex space-xl max-width">
	<div style="align-self: end;">
		<Selector items={controls} bind:value={currentTab} onSelect={onButtonClick} />
	</div>
	<slot></slot>
</section>
