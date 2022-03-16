import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'build-theme-collection',
    lib: {
      entry: path.resolve(__dirname, 'src/theme-collection/index.ts'),
      name: 'DevUIThemeCollection',
      fileName: (format) => `index.${format}.js`,
    },
  },
});
