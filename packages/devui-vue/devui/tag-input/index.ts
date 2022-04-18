import type { App } from 'vue';
import TagInput from './src/tag-input';

export * from './src/tag-input-types';

export { TagInput };

export default {
  title: 'TagInput 标签输入框',
  category: '数据录入',
  status: '90%',
  install(app: App): void {
    app.component(TagInput.name, TagInput);
  }
};
