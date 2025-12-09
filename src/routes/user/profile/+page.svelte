<script lang="ts">
	import { countriesMap } from '$lib/constants/countries';
	import { user } from '$lib/stores/auth';
	import { title } from '$lib/stores/meta';
	import { isOfflineMode } from '$lib/stores/offlineMode';
	import { autoSyncEnabled } from '$lib/stores/sync';
	import { openProfileMenuPopUp } from '$lib/utils/auth';
	import { preventIfOfflineModeOn } from '$lib/utils/offlineMode';
	import { manualSync } from '$lib/utils/sync';
	import Badge from '$ui/Badge.svelte';
	import Button from '$ui/Button.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Section from '$ui/Section.svelte';
	import Switch from '$ui/Switch.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { createErrorToast, createToast } from '$widgets/Toaster';
	import { Ellipsis, FolderSync, MessageCircleQuestionMark } from '@lucide/svelte';

	$title = 'My profile';

	let isLoading = false;

	function onManualSync() {
		preventIfOfflineModeOn().then((permitted) => {
			if (!permitted) return;

			isLoading = true;

			manualSync()
				.then(() => {
					createToast({
						type: 'success',
						text: 'Manual synchronization was completed successfully',
					});
				})
				.catch((error) => createErrorToast(error))
				.finally(() => {
					isLoading = false;
				});
		});
	}

	function openDataBackupHelpPopUp() {
		createPopup({
			header: 'Data backup',
			icon: MessageCircleQuestionMark,
			content:
				'Here you can synchronize your data with an external secure database. When enabled, the app will automatically back up your data once per day. If not, you can do it manually using the button below. Data marked with "not synced" will be kept only on your device, however will not appear on another one.',
		});
	}
</script>

<EqualGrid --desktopColumnsQty={2} --mobileColumnsQty={1} --tabletColumnsQty={1}>
	<Section title="Personal info">
		<div slot="controls">
			<Button icon={Ellipsis} type="transparent" onclick={openProfileMenuPopUp} size="xs" />
		</div>
		<FormItem label="First name" text={$user?.user_metadata.firstName ?? 'N/A'} />
		<FormItem label="Last name" text={$user?.user_metadata.lastName ?? 'N/A'} />
		<FormItem
			label="Nationality"
			text={countriesMap.get($user?.user_metadata.nationality)?.name ?? 'N/A'} />
	</Section>
	<Section title="Account Status">
		<div slot="controls">
			<Button
				icon={MessageCircleQuestionMark}
				type="transparent"
				onclick={openDataBackupHelpPopUp}
				size="xs" />
		</div>
		<FormItem label="Status" inline>
			<Badge size="xs" color="green" label="Free" />
		</FormItem>
		<FormItem label="Data backup" errors={$isOfflineMode ? ['Offline mode is enabled'] : []}>
			<Switch
				label="Automatic daily synchronization with external database"
				bind:value={$autoSyncEnabled}
				disabled={$isOfflineMode} />
		</FormItem>
		<Button
			type="tonal"
			icon={FolderSync}
			label="Manual synchronization"
			full
			{isLoading}
			onclick={onManualSync} />
	</Section>
</EqualGrid>
