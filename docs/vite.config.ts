import path from 'path'
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    alias: [{ find: '@devui', replacement: path.resolve(__dirname, '../devui') }],
  },
  plugins: [
    vueJsx({}),
  ],
})
