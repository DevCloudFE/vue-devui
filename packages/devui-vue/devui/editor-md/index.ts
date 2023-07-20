import type { App } from 'vue';
import EditorMd from './src/editor-md';
import MdRender from './src/components/md-render'
export * from './src/editor-md-types';

export { EditorMd, MdRender };

export default {
  title: 'Markdown MD编辑器',
  category: '数据录入',
  status: '80%',
  install(app: App): void {
    app.component(EditorMd.name, EditorMd);
    app.component(MdRender.name, MdRender);
  }
};
