import type { App } from 'vue';
import Fullscreen from './src/fullscreen';

export * from './src/fullscreen-types';

export { Fullscreen };

export default {
  title: 'Fullscreen 全屏',
  category: '基础组件',
  install(app: App): void {
    app.component(Fullscreen.name, Fullscreen);
  },
};
