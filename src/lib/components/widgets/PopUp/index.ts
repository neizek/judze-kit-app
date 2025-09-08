import { scrollLocker } from "$lib/utils/other";
import { writable, type Writable } from "svelte/store";
import type { CreatedPopUp, PopUp } from "./types";

export const popUps: Writable<CreatedPopUp[]> = writable([]);
let count = 0;

popUps.subscribe(current => scrollLocker(current.length > 0))

export const createPopup = (data: PopUp) => {
	const newCount = count + 0;

	if (typeof data.content !== 'string') {
		data.content = {
			component: data.content.component,
			props: {
				...data.content.props,
				closePopup: () => closePopUp(newCount),
				popupId: newCount,
			},
		};
	}
	popUps.update((current) => {
		const newArray = [...current, { id: newCount, ...data }];
		count += 1;
		return newArray;
	});
};

export const closePopUp = (id: number) => {
	popUps.update((current) => current.filter((popup) => popup.id !== id));
};

export const closeAllPopUps = () => {
	popUps.set([]);
}