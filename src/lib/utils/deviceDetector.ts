import { browser } from "$app/environment";

const isMobile: boolean = (() => {
	if(!browser) return false;
	const mobileBrowsers = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
    
	return mobileBrowsers.some((browser) => {
		
		return navigator.userAgent.match(browser);
	});
})();

export function isFirefox(): boolean {
	if (!browser) return false;
	return navigator.userAgent.indexOf('Firefox') > 0;
}

export const isMobileScreen = (() => {
	if (browser) {
		return (window.innerWidth < 768)
	}

	return false;
})();

export default isMobile;
