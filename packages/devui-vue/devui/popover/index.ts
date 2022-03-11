import type { App } from 'vue';
import Popover from './src/popover';
export * from './src/popover-types';

export { Popover };

export default {
  title: 'Popover 悬浮提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(Popover.name, Popover);
  },
};
