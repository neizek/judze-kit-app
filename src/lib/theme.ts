import { derived, get, writable, type Writable } from "svelte/store";
import storage from "./storage";
import { browser } from "$app/environment";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";

export const THEME_STORAGE_KEY = 'theme';
export const DARK_THEME_NAME = 'dark';
export const LIGHT_THEME_NAME = 'light';
export const BROWSER_THEME_NAME = 'browser';
export const THEME_ATTRIBUTE = 'data-theme';

export enum Theme {
	Browser = 'browser',
	Light = 'light',
	Dark = 'dark',
}

export function isDarkPreferred(): boolean {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		return true;
	}

	return false;
}

export function isDarkSelected(): boolean {
	const saved = storage.get<Theme>(THEME_STORAGE_KEY);

	if (saved !== null && saved !== Theme.Browser) {
		return saved === Theme.Dark;
	}

	return isDarkPreferred();
}

export function getPreferredTheme(): Theme {
	return isDarkPreferred() ? Theme.Dark : Theme.Light;
}

export function getThemeName(t: Theme): string {
	let selectedTheme: Theme = t;

	if (t === Theme.Browser) {
		selectedTheme = getPreferredTheme();
	}

	return selectedTheme === Theme.Dark ? DARK_THEME_NAME : LIGHT_THEME_NAME;
}

export const theme: Writable<Theme> = writable(getInitialTheme());

function watchPreferredTheme(): void {
	if (browser && window.matchMedia) {
		window.
			matchMedia('(prefers-color-scheme: dark)').
			addEventListener('change', () => {
				const selectedTheme = get(theme);

				if (selectedTheme === Theme.Browser) {
					document.documentElement.setAttribute(
						THEME_ATTRIBUTE,
						getThemeName(selectedTheme)
					);
				}
			});
	}
}

function getInitialTheme() {
	const initTheme = browser ? storage.get(THEME_STORAGE_KEY) as string | null : null;

	if (initTheme !== null) {
		return initTheme as Theme;
	}

	return Theme.Browser;
}

const isDarkTheme = (newTheme: Theme) => {
	switch (newTheme) {
		case Theme.Dark:
			return true;
		case Theme.Light:
			return false;
		default:
			return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	// switch (theme) {
	// 	case 'dark':
	// 		StatusBar.setBackgroundColor({color: '#2A3036'});
	// 		StatusBar.setStyle({style: Style.Dark});
	// 		NavigationBar.setColor({color: '#24282D'});
	// 	break;
	// 	case 'light':
	// 		StatusBar.setBackgroundColor({color: '#2A3036'});
	// 		StatusBar.setStyle({style: Style.Dark});
	// 		NavigationBar.setColor({color: '#24282D'});
	// 	break;
	// }
}

export function initTheme(): void {
	theme.subscribe(newTheme => {
		if (browser) {
			storage.set(THEME_STORAGE_KEY, newTheme);
			document.documentElement.setAttribute(
				THEME_ATTRIBUTE,
				getThemeName(newTheme)
			);
			// if (newTheme === Theme.Light) {
			// 	setAppTheme('light');
			// } else if (newTheme === Theme.Dark) {
			// 	setAppTheme('dark');
			// } else {
			// 	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// 		setAppTheme('dark');
			// 	} else {
			// 		setAppTheme('light');
			// 	}
			// }

			StatusBar.setBackgroundColor({color: isDarkTheme(newTheme) ? '#2A3036': '#FFFFFF'});
			StatusBar.setStyle({style: isDarkTheme(newTheme) ? Style.Dark : Style.Light});
			NavigationBar.setColor({color: isDarkTheme(newTheme) ? '#24282D' : '#F4F4F4'});
			// NavigationBar.setTransparency({isTransparent: true});
		}
	});

	watchPreferredTheme();
}

export const themesItems = [
	{
		label: 'Auto',
		value: Theme.Browser,
		icon: 'night_sight_auto'
	},
	{
		label: 'Light',
		value: Theme.Light,
		icon: 'light_mode'
	},
	{
		label: 'Dark',
		value: Theme.Dark,
		icon: 'dark_mode'
	}
]
