import { get, writable, type Writable } from "svelte/store";
import storage from "../utils/storage";
import { browser } from "$app/environment";
import { SafeArea } from "@capacitor-community/safe-area";
import { Moon, Sun, SunMoon } from "@lucide/svelte";

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

// Initialize the theme store with a default value
export const theme: Writable<Theme> = writable(Theme.Browser);

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

async function getInitialTheme() {
	const savedTheme = browser ? await storage.get(THEME_STORAGE_KEY) as string | null : null;

	if (savedTheme !== null) {
		return savedTheme as Theme;
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
}

export async function initTheme(): Promise<void> {
	// Fetch the initial theme asynchronously and update the store
	const initialTheme = await getInitialTheme();
	theme.set(initialTheme);

	theme.subscribe(newTheme => {
		if (browser) {
			storage.set(THEME_STORAGE_KEY, newTheme);
			document.documentElement.setAttribute(
				THEME_ATTRIBUTE,
				getThemeName(newTheme)
			);

			SafeArea.enable({
				config: {
					customColorsForSystemBars: true,
					statusBarColor: '#00000000', // transparent
					statusBarContent: isDarkTheme(newTheme) ? 'light' : 'dark',
					navigationBarColor: '#00000000', // transparent
					navigationBarContent: isDarkTheme(newTheme) ? 'light' : 'dark',
				},
			});
		}
	});

	watchPreferredTheme();
}

export const themesItems = [
	{
		label: 'Auto',
		value: Theme.Browser,
		icon: SunMoon
	},
	{
		label: 'Light',
		value: Theme.Light,
		icon: Sun
	},
	{
		label: 'Dark',
		value: Theme.Dark,
		icon: Moon
	}
];
