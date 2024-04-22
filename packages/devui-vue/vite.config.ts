import { resolve } from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@devui/theme', replacement: resolve(__dirname, '../devui-theme/src') },
      { find: '@devui/shared/components', replacement: resolve(__dirname, './devui') },
      { find: '@devui', replacement: resolve(__dirname, './devui') },
      { find: 'vue-devui', replacement: resolve(__dirname, './devui') },
    ],
  },
  plugins: [vue(), vueJsx({}), svgLoader()],
  optimizeDeps: {
    exclude: ['lodash-es', 'mitt', 'async-validator', 'css-vars-ponyfill', 'rxjs', '@vueuse/core', '@floating-ui/dom', 'vue-router'],
  },
  server: {
    open: '/site.html',
    fs: {
      strict: false,
    },
  },
});
