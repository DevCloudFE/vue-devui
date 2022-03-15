import type { App } from 'vue';
import Textarea from './src/textarea';

Textarea.install = function(app: App): void {
  app.component(Textarea.name, Textarea);
};

export { Textarea };

export default {
  title: 'Textarea 多行文本框',
  category: '数据录入',
  status: '100%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(Textarea as any);
  }
};
