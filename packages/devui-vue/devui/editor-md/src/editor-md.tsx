import { defineComponent, toRefs, provide, ref, SetupContext } from 'vue';
import { Fullscreen } from '../../fullscreen';
import { useEditorMd } from './composables/use-editor-md';
import { useEditorMdTheme } from './composables/use-editor-md-theme';
import { EditorMdInjectionKey, EditorMdProps, editorMdProps } from './editor-md-types';
import Toolbar from './components/toolbar';
import MdRender from './components/md-render';
import { locale } from './utils';
import './editor-md.scss';

export default defineComponent({
  name: 'DEditorMd',
  props: editorMdProps,
  emits: ['update:modelValue', 'mdCheckedEvent', 'selectHint', 'afterEditorInit', 'contentChange', 'previewContentChange'],
  setup(props: EditorMdProps, ctx: SetupContext) {
    const {
      mode,
      toolbarConfig,
      editorContainerHeight,
      hidePreviewView,
      placeholder,
      maxlength,
      modelValue,
      baseUrl,
      breaks,
      customParse,
      renderParse,
      mdRules,
      customRendererRules,
      customXssRules,
      mdPlugins,
      fullscreenZIndex,
    } = toRefs(props);

    const showFullscreen = ref(false);

    const {
      editorRef,
      renderRef,
      toolbars,
      previewHtmlList,
      onPaste,
      getEditorIns,
      previewContentChange,
      onChecked,
      onPreviewScroll,
      onPreviewMouseout,
      onPreviewMouseover,
    } = useEditorMd(props, ctx);

    const { isDarkMode } = useEditorMdTheme(() => {});

    provide(EditorMdInjectionKey, {
      showFullscreen,
      toolbars,
      toolbarConfig,
      getEditorIns,
      t: locale,
    });

    return () => (
      <Fullscreen v-model={showFullscreen.value} z-index={fullscreenZIndex.value}>
        <div
          class={[
            'dp-md-container',
            { 'dp-md-readonly': mode.value === 'readonly', 'dp-md-editonly': mode.value === 'editonly', 'dp-md-dark': isDarkMode.value },
          ]}>
          <div class="dp-md-toolbar-container">
            <Toolbar />
          </div>
          <div
            class={['dp-md-content-container', { 'hide-preview': hidePreviewView.value }]}
            style={{ height: editorContainerHeight?.value + 'px' }}>
            <div class="dp-md-editor">
              <textarea ref={editorRef} placeholder={placeholder.value}>
                {modelValue.value}
              </textarea>
              {Boolean(maxlength?.value) && (
                <div class="dp-md-count">
                  {modelValue.value.length || 0}/{maxlength.value}
                </div>
              )}
            </div>
            <MdRender
              ref={renderRef}
              base-url={baseUrl.value}
              breaks={breaks.value}
              content={modelValue.value}
              custom-parse={customParse.value}
              render-parse={renderParse.value}
              md-rules={mdRules.value}
              custom-renderer-rules={customRendererRules.value}
              custom-xss-rules={customXssRules.value}
              disable-render
              md-plugins={mdPlugins.value}
              onMdRenderChange={previewContentChange}
              onMdCheckedEvent={onChecked}
              onScroll={onPreviewScroll}
              onMouseover={onPreviewMouseover}
              onMouseout={onPreviewMouseout}>
              {previewHtmlList.value.map((html, index) => (
                <div innerHTML={html} key={index}></div>
              ))}
            </MdRender>
          </div>
        </div>
      </Fullscreen>
    );
  },
});
