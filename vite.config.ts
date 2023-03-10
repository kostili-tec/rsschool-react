import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  build: {
    brotliSize: false,
    manifest: false,
    minify: mode === 'development' ? false : true,
    outDir: 'dist',
    sourcemap: command === 'serve' ? 'inline' : false,
  },

  plugins: [react(), eslint()],
}));
