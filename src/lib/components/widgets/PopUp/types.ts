import type { AnyObject } from "$lib/types/types";
import type { Icon } from "@lucide/svelte";
import type { Component } from "svelte";

	export interface PopUpComponent {
		component: Component<any>;
		props?: AnyObject;
	}

	export interface PopUp {
		header?: string;
		icon?: typeof Icon;
		content: string | PopUpComponent;
		onConfirm?: () => void;
		onCancel?: () => void;
	}

	export interface CreatedPopUp extends PopUp {
		id: number;
	}

	export type CreatePopup = (data: PopUp) => void;
	export type ClosePopup = (id: number) => void;