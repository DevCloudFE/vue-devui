import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { MdRenderProps, mdRenderProps } from '../editor-md-types';
import { useEditorMdRender, useMdRenderWatcher } from '../composables/use-editor-md-render';

export default defineComponent({
  name: 'DMdRender',
  props: mdRenderProps,
  emits: ['mdRenderChange', 'mdCheckedEvent'],
  setup(props: MdRenderProps, ctx: SetupContext) {
    const { previewRef, renderService, onPreviewClick, setContainerContent } = useEditorMdRender(props, ctx);
    useMdRenderWatcher(props, renderService, setContainerContent);

    return () => (
      <div ref={previewRef} class="dp-editor-md-preview-container dp-md-view" onClick={onPreviewClick}>
        {ctx.slots.default?.()}
      </div>
    );
  }
});