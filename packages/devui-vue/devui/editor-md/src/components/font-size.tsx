import { defineComponent, inject } from 'vue';
import { EditorMdInjectionKey, IEditorMdInjection } from '../editor-md-types';
import { FONT_SIZE_LIST } from '../toolbar-config';

export default defineComponent({
  name: 'FontSize',
  setup() {
    const { getEditorIns } = inject(EditorMdInjectionKey) as IEditorMdInjection;
    const setSize = (val: number) => {
      const editorIns = getEditorIns();
      const selection = editorIns.getSelection();
      editorIns.focus();
      editorIns.replaceSelection(`<span style="font-size:${val}px;">${selection}</span>`);
      setTimeout(() => {
        if (selection === '') {
          const cursor = editorIns.getCursor();
          editorIns.setCursor(cursor.line, cursor.ch - 7);
        }
      });
    };

    return () => (
      <ul class="dropdown-font-size">
        {FONT_SIZE_LIST.map((item, index) => (
          <li key={index} onClick={() => setSize(item.value)}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  },
});
