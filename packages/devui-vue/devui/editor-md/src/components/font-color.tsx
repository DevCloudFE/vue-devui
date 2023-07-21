import { defineComponent, inject } from 'vue';
import { EditorMdInjectionKey, IEditorMdInjection } from '../editor-md-types';
import { FONT_COLORS } from '../toolbar-config';

export default defineComponent({
  name: 'FontColor',
  setup() {
    const { getEditorIns, t } = inject(EditorMdInjectionKey) as IEditorMdInjection;
    const setColor = (type: 'ft' | 'bg', color: string) => {
      const editorIns = getEditorIns();
      const selection = editorIns.getSelection();
      const styleType = type === 'bg' ? 'background-color:' : 'color:';
      editorIns.focus();
      editorIns.replaceSelection(`<span style="${styleType}${color};">${selection}</span>`);
      setTimeout(() => {
        if (selection === '') {
          const cursor = editorIns.getCursor();
          editorIns.setCursor(cursor.line, cursor.ch - 7);
        }
      });
    };

    return () => (
      <div class="dropdown-font-color">
        <div class="color-wrap">
          <p>{t('color')}</p>
          <ul class="color-picker">
            {FONT_COLORS.map((item, index) => (
              <li key={index} style={{ backgroundColor: item }} onClick={() => setColor('ft', item)}></li>
            ))}
          </ul>
        </div>
        <div class="color-wrap">
          <p>{t('background')}</p>
          <ul class="color-picker">
            {FONT_COLORS.map((item, index) => (
              <li key={index} style={{ backgroundColor: item }} onClick={() => setColor('bg', item)}></li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
});