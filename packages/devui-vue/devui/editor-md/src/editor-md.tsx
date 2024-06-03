import { defineComponent, toRefs, provide, ref, SetupContext, withModifiers, computed } from 'vue';
import { Fullscreen } from '../../fullscreen';
import { useEditorMd } from './composables/use-editor-md';
import { useEditorMdTheme } from './composables/use-editor-md-theme';
import { EditorMdInjectionKey, EditorMdProps, editorMdProps } from './editor-md-types';
import Toolbar from './components/toolbar';
import MdRender from './components/md-render';
import { locale } from './utils';
import './editor-md.scss';
import { FlexibleOverlay } from '../../overlay';

export default defineComponent({
  name: 'DEditorMd',
  props: editorMdProps,
  emits: ['update:modelValue', 'checkedChange', 'selectHint', 'afterEditorInit', 'contentChange', 'previewContentChange', 'imageUpload'],
  setup(props: EditorMdProps, ctx: SetupContext) {
    const {
      mode,
      toolbarConfig,
      customToolbars,
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
    const finalModelValue = computed(() => {
      if (typeof maxlength.value === 'number') {
        return modelValue.value.substring(0, maxlength.value);
      } else {
        return modelValue.value;
      }
    });

    const {
      editorRef,
      overlayRef,
      cursorRef,
      renderRef,
      containerRef,
      isHintShow,
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
      customToolbars,
      getEditorIns,
      t: locale,
    });

    return () => (
      <Fullscreen v-model={showFullscreen.value} z-index={fullscreenZIndex.value}>
        <div
          ref={containerRef}
          class={[
            'dp-md-container',
            { 'dp-md-readonly': mode.value === 'readonly', 'dp-md-editonly': mode.value === 'editonly', 'dp-md-dark': isDarkMode.value },
          ]}
          onPaste={onPaste}>
          <div class="dp-md-toolbar-container">
            <Toolbar />
          </div>
          <div
            class={['dp-md-content-container', { 'hide-preview': hidePreviewView.value }]}
            style={{ height: editorContainerHeight?.value + 'px' }}>
            <div class="dp-md-editor">
              <textarea ref={editorRef} placeholder={placeholder.value}>
                {finalModelValue.value}
              </textarea>
              <FlexibleOverlay
                ref={overlayRef}
                v-model={isHintShow.value}
                origin={cursorRef.value || undefined}
                align="start"
                position={['bottom-start']}
                onClick={withModifiers(() => {}, ['stop'])}>
                {ctx.slots?.hintTemplate?.()}
              </FlexibleOverlay>
              {Boolean(maxlength?.value) && (
                <div class="dp-md-count">
                  {finalModelValue.value.length || 0}/{maxlength.value}
                </div>
              )}
            </div>
            <MdRender
              ref={renderRef}
              base-url={baseUrl.value}
              breaks={breaks.value}
              content={finalModelValue.value}
              custom-parse={customParse.value}
              render-parse={renderParse.value}
              md-rules={mdRules.value}
              custom-renderer-rules={customRendererRules.value}
              custom-xss-rules={customXssRules.value}
              disable-render
              md-plugins={mdPlugins.value}
              onMdRenderChange={previewContentChange}
              onCheckedChange={onChecked}
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
