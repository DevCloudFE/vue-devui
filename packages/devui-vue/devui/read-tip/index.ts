import type { App } from 'vue';
import ReadTip from './src/read-tip';

export * from './src/read-tip-types';

export { ReadTip };

export default {
  title: 'ReadTip 阅读提示',
  category: '反馈',
  status: '90%',
  install(app: App): void {
    app.component(ReadTip.name, ReadTip);
  }
};
