import { resolve } from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import { MdTransformer } from './.vitepress/plugins/md-transformer';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@devui/theme', replacement: resolve(__dirname, '../../devui-theme/src') },
      { find: '@devui/shared/components', replacement: resolve(__dirname, '../devui') },
      { find: '@devui', replacement: resolve(__dirname, '../devui') }
    ],
  },
  plugins: [vueJsx({}), svgLoader(), MdTransformer()],
  optimizeDeps: {
    exclude: ['lodash-es', 'mitt', 'async-validator', 'css-vars-ponyfill', 'rxjs', '@vueuse/core', '@floating-ui/dom', 'vue-router'],
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
