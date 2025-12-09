<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ButtonProps } from '$lib/types/ui';
	import {
		openDeleteUserConfirmationPopUp,
		openEditUserFormPopUp,
		signOut,
	} from '$lib/utils/auth';
	import { preventIfOfflineModeOn } from '$lib/utils/offlineMode';
	import Button from '$ui/Button.svelte';
	import { createErrorToast } from '$widgets/Toaster';
	import { LogOut, Pen, Trash } from '@lucide/svelte';

	export let closePopup: () => void;

	const menu: { [prop: string]: ButtonProps } = {
		edit: {
			type: 'transparent',
			label: 'Edit profile',
			icon: Pen,
			isLoading: false,
			onclick: () => openEditUserFormPopUp(),
		},
		signOut: {
			type: 'transparent',
			label: 'Sign out',
			icon: LogOut,
			isLoading: false,
			onclick: onSignOut,
		},
		delete: {
			type: 'dangerous',
			label: 'Delete account',
			icon: Trash,
			isLoading: false,
			onclick: openDeleteUserConfirmationPopUp,
		},
	};

	async function onSignOut() {
		menu.signOut.isLoading = true;

		await signOut()
			.then(() => {
				closePopup();
				goto('/');
			})
			.catch((error) => {
				createErrorToast(error);
			})
			.finally(() => {
				menu.signOut.isLoading = false;
			});
	}

	function onButtonClick(item: ButtonProps) {
		preventIfOfflineModeOn().then(async (permitted) => {
			if (!permitted) return;

			if (item.onclick) await item.onclick();
			closePopup();
		});
	}
</script>

<div class="flex flex-column space-m">
	{#each Object.values(menu) as item}
		<Button
			type={item.type}
			label={item.label}
			icon={item.icon}
			onclick={() => onButtonClick(item)}
			isLoading={item.isLoading}
			full
			withChevron />
	{/each}
</div>
