import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'build',
    lib: {
      entry: path.resolve(__dirname, 'src/theme/index.ts'),
      name: 'DevuiTheme',
      fileName: (format) => `index.${format}.js`,
    },
  },
});
