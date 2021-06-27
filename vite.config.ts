import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import markdown from 'vite-plugin-md';
import path from 'path';

export default defineConfig({
  server: {
    port: 2021,
    open: '/',
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }), 
    vueJsx({}),
    markdown()
  ],
  resolve: {
    alias: {
      'hooks': path.resolve(__dirname, './devui/shared/hooks')
    }
  }
})
