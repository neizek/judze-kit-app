import { type Icon as IconType } from '@lucide/svelte';

// #region Button

type ButtonPropsType = 'primary' | 'secondary' | 'dangerous' | 'transparent' | 'tonal' | undefined;
type ButtonPropsSize = 's' | 'xs';

export interface ButtonProps {
	icon?: typeof IconType;
	type?: ButtonPropsType;
	label?: string;
	submit?: boolean;
	bordered?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
	withChevron?: boolean;
	full?: boolean;
	size?: ButtonPropsSize;
	onclick?: () => void | Promise<void>;
	onsubmit?: () => void;
}

// #endregion
// #region Selector

type SelectorPropsValue = string | number | boolean;

export interface SelectorItem {
	value: SelectorPropsValue;
	icon?: typeof IconType;
	label: string;
}

export interface SelectorProps {
	items: SelectorItem[];
	value: SelectorPropsValue;
	onSelect?: () => void;
}