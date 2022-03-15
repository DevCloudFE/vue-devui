import type { App } from 'vue';
import ReadTip from './src/read-tip';

ReadTip.install = function (app: App): void {
  app.component(ReadTip.name, ReadTip);
};

export { ReadTip, };

export default {
  title: 'ReadTip 阅读提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.use(ReadTip as any);
  }
};
