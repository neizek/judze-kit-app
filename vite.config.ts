import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svelte-svgr';

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/styles/abstract/abstract.scss";`
			}
		}
	},
	server: {
		port: 5100
	},
	plugins: [sveltekit(), svgr()]
});
