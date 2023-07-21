import type { App } from 'vue';
import EditorMd from './src/editor-md';
import MdRender from './src/components/md-render';
export * from './src/editor-md-types';

export { EditorMd, MdRender };

export default {
  title: 'Markdown MD编辑器',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.component(EditorMd.name, EditorMd);
    app.component(MdRender.name, MdRender);
  }
};
