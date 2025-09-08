import type { AnyObject } from "$lib/types/types";

	export interface PopUpComponent {
		component: ConstructorOfATypedSvelteComponent;
		props?: AnyObject;
	}

	export interface PopUp {
		header?: string;
		content: string | PopUpComponent;
		onConfirm?: () => void;
		bottomSticked?: boolean;
	}

	export interface CreatedPopUp extends PopUp {
		id: number;
	}

	export type CreatePopup = (data: PopUp) => void;
	export type ClosePopup = (id: number) => void;