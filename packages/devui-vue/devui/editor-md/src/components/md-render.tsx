import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { MdRenderProps, mdRenderProps } from '../editor-md-types';
import { useEditorMdRender, useMdRenderWatcher } from '../composables/use-editor-md-render';

export default defineComponent({
  name: 'DMdRender',
  props: mdRenderProps,
  emits: ['mdRenderChange', 'checkedChange'],
  setup(props: MdRenderProps, ctx: SetupContext) {
    const { previewRef, renderService, previewStyleClass, onPreviewClick, setContainerContent } = useEditorMdRender(props, ctx);
    useMdRenderWatcher(props, renderService, setContainerContent);
    return () => (
      <div ref={previewRef} class={`dp-editor-md-preview-container ${previewStyleClass.value}`} onClick={onPreviewClick}>
        {ctx.slots.default?.()}
      </div>
    );
  },
});
