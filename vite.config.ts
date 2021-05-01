import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import markdown from 'vite-plugin-md';

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
})
