import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			// Fix for "Too many open files"
			ignored: ["**/.direnv/**"]
		}
	}
});
