<script lang="ts">
	import { ranksOptions, vesselTypesOptions } from '$lib/stores/lookups';
	import { getDuration, getOneWeekLater } from '$lib/utils/datetime';
	import { createField, createForm } from '$lib/utils/forms/forms';
	import { required } from '$lib/utils/forms/validators';
	import { addVoyage } from '$lib/utils/seaService';
	import Button from '$ui/Button.svelte';
	import DatePicker from '$ui/DatePicker/DatePicker.svelte';
	import FormItem from '$ui/FormItem.svelte';
	import Input from '$ui/Input.svelte';
	import Select from '$ui/Select/Select.svelte';
	import { Plus, XIcon } from '@lucide/svelte';

	export let closePopup: () => void;

	const vessel = createField<string>('vessel', '', [required('Name of the vessel is mandatory')]);
	const vesselType = createField<string | undefined>('vesselType', undefined, [
		required('Choose type of the vessel'),
	]);
	const rank = createField<string | undefined>('rank', undefined, [required('Choose your rank')]);
	const dateFrom = createField<Date | undefined>('dateFrom', undefined, [required()]);
	const dateTo = createField<Date | undefined>('dateTo', undefined, [required()]);

	const voyageForm = createForm(vessel, vesselType, rank, dateFrom, dateTo);

	function confirmNewVoyage() {
		voyageForm.validate().then((success) => {
			if (success && $vesselType.value && $rank.value && $dateFrom.value && $dateTo.value) {
				addVoyage({
					vessel: $vessel.value,
					vesselTypeId: Number($vesselType.value),
					rankId: Number($rank.value),
					dateFrom: $dateFrom.value,
					dateTo: $dateTo.value,
					duration: getDuration($dateFrom.value, $dateTo.value),
				});
				closePopup();
			}
		});
	}
</script>

<div class="vertical-flex space-l">
	<FormItem label="Name of the vessel" errors={$vessel.errors}>
		<Input
			type="text"
			placeholder="Santa Maria"
			bind:value={$vessel.value}
			hasError={!$vessel.valid} />
	</FormItem>
	<FormItem label="Type of the vessel" errors={$vesselType.errors}>
		<Select
			items={$vesselTypesOptions}
			bind:value={$vesselType.value}
			placeholder="Choose type of the vessel"
			hasError={!$vesselType.valid} />
	</FormItem>
	<FormItem label="Your rank" errors={$rank.errors}>
		<Select
			items={$ranksOptions}
			bind:value={$rank.value}
			placeholder="Choose your rank"
			hasError={!$rank.valid} />
	</FormItem>
	<FormItem
		label="Duration of sailing"
		errors={!$dateFrom.valid || !$dateTo.valid ? ['Enter duration of the voyage'] : []}>
		<div class="line-blocks space-m max-width">
			<DatePicker
				bind:value={$dateFrom.value}
				maxDate={$dateTo.value}
				hasError={!$dateFrom.valid} />
			<DatePicker
				bind:value={$dateTo.value}
				minDate={$dateFrom.value}
				hasError={!$dateTo.valid} />
		</div>
	</FormItem>
	<div class="flex space-m space-between mt-m">
		<Button type="primary" icon={Plus} label="Add new voyage" onclick={confirmNewVoyage} full />
		<Button type="tonal" icon={XIcon} label="Cancel" onclick={closePopup} />
	</div>
</div>
