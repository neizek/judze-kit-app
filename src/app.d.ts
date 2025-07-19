declare module '*.svg';

declare global {
	namespace App {}
};

declare module 'svelte/elements' {
	interface HTMLAttributes<T> {
		'on:click_outside'?: (event: CustomEvent<any>) => void;
	}
};

export {};
