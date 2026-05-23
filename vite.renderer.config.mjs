import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				dashboard: resolve(__dirname, 'src/dashboard.html'),
			},
		},
	},
});
