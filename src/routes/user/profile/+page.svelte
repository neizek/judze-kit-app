<script lang="ts">
	import { countriesMap } from '$lib/constants/countries';
	import { user } from '$lib/stores/auth';
	import { title } from '$lib/stores/meta';
	import { isOfflineMode } from '$lib/stores/offlineMode';
	import { autoSyncEnabled } from '$lib/stores/sync';
	import { openProfileMenuPopUp } from '$lib/utils/auth';
	import Badge from '$ui/Badge.svelte';
	import Button from '$ui/Button.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Section from '$ui/Section.svelte';
	import Switch from '$ui/Switch.svelte';
	import { createPopup } from '$widgets/PopUp';
	import { Ellipsis, MessageCircleQuestionMark } from '@lucide/svelte';
	import Help from './Help.svelte';

	$title = 'My profile';

	let isLoading = false;

	function openDataBackupHelpPopUp() {
		createPopup({
			header: 'Help',
			icon: MessageCircleQuestionMark,
			content: {
				component: Help,
			},
		});
	}
</script>

<EqualGrid --desktopColumnsQty={2} --mobileColumnsQty={1} --tabletColumnsQty={1}>
	<Section title="Personal info">
		<div slot="controls">
			<Button icon={Ellipsis} type="transparent" onclick={openProfileMenuPopUp} size="xs" />
		</div>
		<FormItem label="Email" text={$user?.email ?? 'N/A'} />
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
	</Section>
</EqualGrid>
