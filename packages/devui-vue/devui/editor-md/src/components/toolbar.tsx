import { defineComponent } from 'vue';
import ToolbarItem from './toolbar-item';
import { useToolbar } from '../composables/use-editor-md-toolbar';
import './toolbar.scss';

export default defineComponent({
  name: 'DMdToolbar',
  setup() {
    const { toolbars, toolbarConfig, customToolbars } = useToolbar();
    const tempToolbars = { ...toolbars, ...customToolbars?.value };
    return () => (
      <div class="md-toolbar-container">
        {toolbarConfig.value.map((item, index) =>
          Array.isArray(item) ? (
            <>
              {item.map((key, idx) => (
                <ToolbarItem config={tempToolbars[key]} key={`${index}-${idx}`} />
              ))}
              <span class="md-toolbar-span"></span>
            </>
          ) : (
            <ToolbarItem config={tempToolbars[item]} key={index} />
          )
        )}
      </div>
    );
  },
});
