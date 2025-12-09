import type { Icon } from "@lucide/svelte";

export interface SelectItem {
	value: any;
	label: string;
	icon?: typeof Icon;
}
