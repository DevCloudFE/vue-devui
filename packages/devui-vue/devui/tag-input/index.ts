import type { App } from 'vue';
import TagInput from './src/tag-input';

TagInput.install = function (app: App) {
  app.component(TagInput.name, TagInput);
};

export { TagInput };

export default {
  title: 'TagInput 标签输入框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.use(TagInput as any);
  }
};
