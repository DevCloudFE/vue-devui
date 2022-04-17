import type { App } from 'vue';
import Tag from './src/tag';
export * from './src/tag-types';

export { Tag };

export default {
  title: 'Tag 标签',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Tag.name, Tag);
  },
};
