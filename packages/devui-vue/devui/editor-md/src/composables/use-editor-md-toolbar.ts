import { inject } from 'vue';
import { EditorMdInjectionKey, IEditorMdInjection } from '../editor-md-types';

export function useToolbar(): IEditorMdInjection {
  return inject(EditorMdInjectionKey) as IEditorMdInjection;
}
