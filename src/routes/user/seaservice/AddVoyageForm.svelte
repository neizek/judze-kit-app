<script lang="ts">
	import { dbStoresEnum } from '$lib/enums/db';
	import { RankEnum } from '$lib/enums/ranks';
	import { VesselTypeEnum } from '$lib/enums/vessels';
	import type { Voyage } from '$lib/types/seaservice';
	import { createField, createForm } from '$lib/utils/forms/forms';
	import { required } from '$lib/utils/forms/validators';
	import { addItem } from '$lib/utils/idb';
	import Button from '$ui/Button.svelte';
	import DatePicker from '$ui/DatePicker/DatePicker.svelte';
	import EqualGrid from '$ui/EqualGrid.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Select from '$ui/Select/Select.svelte';
	import Separator from '$ui/Separator.svelte';

	export let addNewVoyage: (voyage: Partial<Voyage>) => void;
	export let closePopup: () => void;

	const vessel = createField<string>('vessel', '', [required(`Vessel's name can't be empty`)]);
	const vesselType = createField<undefined | VesselTypeEnum>('vesselType', undefined, [
		required(`Choose your vessel's type`),
	]);
	const rank = createField<undefined | RankEnum>('vessel', undefined, []);
	const dateFrom = createField('vessel', new Date(), []);
	const dateTo = createField('vessel', new Date(), []);
	const voyageForm = createForm(vessel, vesselType);

	const vesselTypes = Object.entries(VesselTypeEnum).map(([label, value]) => ({ label, value }));

	function confirmNewVoyage() {
		voyageForm.validate().then((success) => {
			if (success) {
				addNewVoyage({
					vessel: $vessel.value,
					vesselType: $vesselType.value,
					rank: $rank.value,
					dateFrom: $dateFrom.value,
					dateTo: $dateTo.value,
				});
				closePopup();
			}
		});
	}
</script>

<div class="vertical-flex space-l">
	<FormItem label="Name of the vessel" errors={$vessel.errors}>
		<Input placeholder="Flex Freedom" bind:value={$vessel.value} hasError={!$vessel.valid} />
	</FormItem>
	<FormItem label="Type of the vessel" errors={$vesselType.errors}>
		<Select
			items={vesselTypes}
			bind:value={$vesselType.value}
			placeholder="Choose type of the vessel"
			hasError={!$vesselType.valid} />
	</FormItem>
	<EqualGrid --mobileColumnsQty="2">
		<FormItem label="Start of sailing">
			<DatePicker bind:value={$dateFrom.value} />
		</FormItem>
		<FormItem label="End of sailing">
			<DatePicker bind:value={$dateTo.value} />
		</FormItem>
	</EqualGrid>
	<Separator transparent />
	<Button type="primary" icon="check" label="Add new voyage" on:click={confirmNewVoyage} />
	<Button icon="close" label="Cancel" />
</div>
