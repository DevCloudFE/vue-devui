import { defineComponent, inject, reactive } from 'vue';
import { Dropdown } from '../../../dropdown';
import { Tooltip } from '../../../tooltip';
import { EditorMdInjectionKey, IEditorMdInjection, MdToolbarItemProps, mdToolbarItemProps } from '../editor-md-types';
import FontColor from './font-color';
import FontSize from './font-size';

export default defineComponent({
  name: 'DMdToolbarItem',
  props: mdToolbarItemProps,
  setup(props: MdToolbarItemProps) {
    const config = reactive(props.config);
    const { showFullscreen, getEditorIns, t } = inject(EditorMdInjectionKey) as IEditorMdInjection;
    const getTooltipContent = (name?: string, shortKey?: string) => {
      if (!name && !shortKey) {
        return '';
      }
      if (name === 'fullscreen') {
        return `<center>${showFullscreen.value ? t(config.exitName!) : t(name)}</center>`;
      }
      let n: string | undefined = undefined;
      if (name?.includes('&')) {
        const temp = name.split('&');
        n = t(temp[0]) + ' & ' + t(temp[1]);
      }
      return `<center>${n ?? t(name!) ?? ''}<br>${shortKey ?? ''}</center>`;
    };

    const onToolbarItemClick = () => {
      const editorIns = getEditorIns();
      if (config.id === 'fullscreen') {
        showFullscreen.value = !showFullscreen.value;
        if (window) {
          const event = new Event('resize');
          window.dispatchEvent(event);
        }
      }
      config.handler?.(editorIns, config.params);
    };

    return () => (
      <>
        {config.type === 'button' && (
          <Tooltip position={['top', 'bottom']} content={getTooltipContent(config.name, config.shortKey)} hide-after={1000}>
            <span
              class="md-toolbar-item"
              onClick={onToolbarItemClick}
              innerHTML={config.id === 'fullscreen' ? (showFullscreen.value ? config.exitIcon : config.icon) : config.icon}></span>
          </Tooltip>
        )}
        {config.type === 'dropDown' && (
          <Dropdown position={['bottom-start']} align="start">
            {{
              default: () => (
                <span>
                  <Tooltip position={showFullscreen.value ? ['right'] : ['top']} content={getTooltipContent(config.name)} hide-after={1000}>
                    <span class="md-toolbar-item" onClick={() => config.handler?.()} innerHTML={config.icon}></span>
                  </Tooltip>
                </span>
              ),
              menu: () => (
                <>
                  {config.component === 'FontSize' && <FontSize />}
                  {config.component === 'FontColor' && <FontColor />}
                </>
              ),
            }}
          </Dropdown>
        )}
      </>
    );
  },
});
