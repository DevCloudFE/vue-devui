import type { App } from 'vue';
import CodeEditor from './src/code-editor';
export * from './src/code-editor-types';

export { CodeEditor };

export default {
  title: 'Code Editor 代码编辑器',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.component(CodeEditor.name, CodeEditor);
  },
};
