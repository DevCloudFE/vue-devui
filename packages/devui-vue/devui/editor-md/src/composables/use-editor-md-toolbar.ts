import { inject } from 'vue';
import { EditorMdInjectionKey, IEditorMdInjection } from '../editor-md-types';

export function useToolbar() {
  const { toolbars, toolbarConfig, customToolbars } = inject(EditorMdInjectionKey) as IEditorMdInjection;

  return { toolbars, toolbarConfig, customToolbars };
}
