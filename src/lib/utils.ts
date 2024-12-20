import { browser } from "$app/environment";

/** Dispatch event on click outside of node */
export function clickOutside(node: Node) {
	const handleClick = (event: MouseEvent) => {
		if (
			node &&
			!node.contains(event.target as Node) &&
			!event.defaultPrevented
		) {
			node.dispatchEvent(
				new CustomEvent('click_outside', node as CustomEventInit)
			);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export function scrollLocker(locked: boolean) {
	if(!browser) {
		return;
	}
	
	if (locked) {
		document.body.style.cssText = `
			overflow:hidden;
			position:fixed;
			left: 0;
			right: 0;
			top: -${window.scrollY}px;
		`;
		window.scrollTo(0, 1);
		return;
	}

	const savedScrollPsn = document.body.style.top;
	document.body.removeAttribute('style');
	window.scrollTo(0, parseInt(savedScrollPsn || '0') * -1);
}