import type { App } from 'vue';
import Textarea from './src/textarea';

export * from './src/textarea-types';

export { Textarea };

export default {
  title: 'Textarea 多行文本框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Textarea.name, Textarea);
  }
};
