import path from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@devui', replacement: path.resolve(__dirname, '../devui') },
    ]
  },
  plugins: [
    vueJsx({}),
    svgLoader(),
  ],
  optimizeDeps:{
    exclude: ['vue','@vue/runtime-core','lodash','lodash-es','mitt','async-validator'],
    include: ['lodash']
  },
})