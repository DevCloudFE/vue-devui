import type { App } from 'vue';
import AutoFocus from './src/auto-focus-directive';

export { AutoFocus };

export default {
  title: 'AutoFocus 自动聚焦',
  category: '公共',
  install(app: App): void {
    app.directive('dAutoFocus', AutoFocus);
  },
};
