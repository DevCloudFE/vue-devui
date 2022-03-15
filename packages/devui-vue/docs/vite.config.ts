import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@devui', replacement: path.resolve(__dirname, '../devui') }
    ]
  },
  plugins: [
    vueJsx({}),
    svgLoader(),
  ],
  optimizeDeps:{
    exclude: ['lodash-es','mitt','async-validator', 'css-vars-ponyfill', 'rxjs'],
    include: ['lodash']
  },
  server: {
    fs: {
      strict: false
    }
  }
});
