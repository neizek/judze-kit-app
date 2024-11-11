<script lang="ts">
	// import { compareObjects } from '@utils/common/objects';
	// import { clickOutside } from '@utils/components/clickOutside';
	// import { isMobile } from '@utils/device';
	import { createEventDispatcher } from 'svelte';
	// import BottomBox from '../BottomBox/BottomBox.svelte';
	import ItemsList from './ItemsList.svelte';
	import type { SelectItem } from './types';
    import { compareObjects } from '$lib/objects';
    import { clickOutside } from '$lib/utils';

	function getSelectedLabel(
		selectedValue: any,
		selectItems: SelectItem[]
	): string | undefined {
		for (const item of selectItems) {
			if (typeof selectedValue === 'object' && typeof item.value === 'object') {
				if (compareObjects(item.value, selectedValue)) {

					return item.label;
				}
			} else if (item.value === selectedValue) {
				return item.label;
			}
		}

		return undefined;
	}

	function isEmptyValue(value: any): boolean {
		return value === undefined || value === null || (typeof value === 'number' && isNaN(value));
	}

	export let items: SelectItem[] = [];
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: any = undefined;
	export let currentLabel: string | undefined = getSelectedLabel(value, items);
	export let hasError = false;
	export let icon: string | undefined = undefined;
	export let multiple = false;
	export let disabled = false;
	export let clearable = disabled ? false : true;
	let multiSelectedItems: SelectItem[] = multiple ? items.filter(item => value.includes(item.value)) : [];
	let shownItems = items;
	let open = false;
	const dispatch = createEventDispatcher();

	if (!clearable && isEmptyValue(value)) {
		throw new Error('Not clearable select cannot be without a value.');
	}

	if (multiple && value !== undefined && !Array.isArray(value)) {
		throw new Error('Multiple select value can only be an array.');
	}

	function onClick(event: MouseEvent): boolean {
		const target = event.target as HTMLElement;

		if (target.tagName === 'I') {
			return true;
		}

		if (target.tagName === 'LABEL') {
			if (!disabled) open = !open;

			return true;
		}

		return false;
	}

	function onClear(): void {
		value = undefined;
		currentLabel = undefined;
		dispatch('clear');
	}

	function onInputFocus(event: FocusEvent): void {
		event.preventDefault();
		(event.target as HTMLElement).blur();
		if (!disabled) open = true;
	}

	function addValue(item: SelectItem): void {
		if (multiple) {
			currentLabel = undefined;
			shownItems = items;

			if (value === undefined) {
				value = [item.value];
			} else {
				if (value.includes(item.value)) {
					return;
				}

				value = [...value,
					item.value];
			}

			multiSelectedItems = [...multiSelectedItems,
				item];

			dispatch('select', value);

			return;
		}

		currentLabel = item.label;
		value = item.value;
		dispatch('select', value);
	}

	function onSelect(item: SelectItem): void {
		open = false;
		addValue(item);
	}

	function onInput(event: Event): boolean {
		const keyEvent = event as InputEvent;
		const input = keyEvent.target as HTMLInputElement;

		shownItems = items.filter(item => item.label.includes(input.value));

		return true;
	}

	function onInputChange(): boolean {
		if (shownItems.length === 1) {
			addValue(shownItems[0]);

			return true;
		}

		return false;
	}

	function removeValue(valueToRemove: any): void {
		value = value.filter((v: any) => v !== valueToRemove);

		multiSelectedItems = multiSelectedItems.filter(
			item => item.value !== valueToRemove
		);
	}

	$: currentLabel = getSelectedLabel(value, items);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	use:clickOutside
	on:click_outside="{() => (open = false)}"
	on:click="{onClick}"
	class="select"
>
	<label class="input extended" class:error="{hasError}">
		{#if icon}
			<i class="fa-solid fa-{icon}"></i>
		{/if}
		{#if multiple && multiSelectedItems.length > 0}
			<div class="multiItems">
				{#each multiSelectedItems as multiItem}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="multiItem"
						on:click|preventDefault="{() => removeValue(multiItem.value)}"
					>
						<span>{multiItem.label}</span>
						<i class="fa-solid fa-xmark"></i>
					</div>
				{/each}
			</div>
		{/if}
		<input
			placeholder="{placeholder}"
			name="{name}"
			size="5"
			autocomplete="off"
			on:blur
			on:change="{onInputChange}"
			on:focus="{onInputFocus}"
			on:input="{onInput}"
			bind:value="{currentLabel}"
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#if clearable && !isEmptyValue(value) && !multiple}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<i class="fa-solid fa-xmark clearIcon" on:click|preventDefault="{onClear}"
			></i>
		{/if}
		{#if hasError}
			<div class="errorIcon">!</div>
		{/if}
	</label>
	{#if open}
		<!-- {#if isMobile}
			<BottomBox bind:isOpened={open}>
				<ItemsList shownItems="{shownItems}" onSelect="{onSelect}" />
			</BottomBox>
		{:else} -->
			<ItemsList shownItems="{shownItems}" onSelect={onSelect} />
		<!-- {/if} -->
	{/if}
</div>

<style lang="scss">
	:root {
		--Select-items-shadow-color: #00000020;
		--Select-multiItem-background-color: #00000018;
		--Select-multiItem-background-color-hover: #00000030;

		&[data-theme='dark'] {
			--Select-items-shadow-color: #00000050;
			--Select-multiItem-background-color: #ffffff20;
			--Select-multiItem-background-color-hover: #ffffff30;
		}
	}

	.select {
		display: block;
		width: var(--width, auto);
	}

	:global(.space.compact) {
		> div {
			background-color: red;

			&:focus-within {
				z-index: 1;
			}

			&:not(:last-child) {
				margin-inline-end: -1px;
				border-inline-end-width: 0;
			}
		}
	}

	.multiItems {
		display: flex;
		flex-direction: row;
		gap: 4px;
	}

	.multiItem {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5.5px;
		font-size: 13px;
		padding: 5px 8px;
		margin: -6px 0;
		border-radius: 3px;
		background-color: var(--Select-multiItem-background-color);
		transition: background-color 0.2s;

		&:hover {
			background-color: var(--Select-multiItem-background-color-hover);
			cursor: pointer;
		}

		i.fa-xmark {
			font-size: 12px;
		}
	}

	i.fa-xmark.clearIcon {
		opacity: 0.5;

		&:hover {
			cursor: pointer;
			opacity: 0.8;
		}
	}
</style>
