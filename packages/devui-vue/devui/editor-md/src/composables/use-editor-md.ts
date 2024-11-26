import { cloneDeep } from 'lodash-es';
import { computed, nextTick, onMounted, reactive, Ref, ref, SetupContext, toRefs, watch, onBeforeUnmount } from 'vue';
import { debounce } from '../../../shared/utils';
import { EditorMdProps, Mode } from '../editor-md-types';
import { DEFAULT_TOOLBARS } from '../toolbar-config';
import { parseHTMLStringToDomList } from '../utils';
import { refreshEditorCursor, _enforceMaxLength } from './helper';
import { throttle } from 'lodash-es';

export function useEditorMd(props: EditorMdProps, ctx: SetupContext) {
  const {
    imageUploadToServer,
    hidePreviewView,
    mode,
    maxlength,
    options,
    toolbarConfig,
    customToolbars,
    customHintReplaceFn,
    hintConfig,
    disableChangeEvent,
    modelValue,
    beforeShowHint,
  } = toRefs(props);

  const toolbars = reactive(cloneDeep(DEFAULT_TOOLBARS));
  const editorRef = ref();
  const renderRef = ref();
  const overlayRef = ref();
  const cursorRef = ref();
  const containerRef = ref();
  const isHintShow = ref();
  const previewHtmlList: Ref<any[]> = ref([]);
  let editorIns: any;
  let canPreviewScrollView = false;

  /* 快速提示 */
  let hintList: any[] = [];
  let activeIndex = -1;
  let cursorHint = '';
  let cursorHintEnd = -1;
  let cursorHintStart = -1;
  let prefix: any;
  let hintShow = false;

  let CodeMirror: any;
  const prefixes = computed(() => {
    const result: string[] = [];
    for (const key in hintConfig?.value) {
      if (
        typeof hintConfig?.value[key] === 'function' ||
        (hintConfig?.value[key] && typeof hintConfig?.value[key].handler === 'function')
      ) {
        result.push(key);
      }
    }
    return result;
  });

  const getEditorIns = () => editorIns;

  const editorScroll = () => {
    if (editorIns) {
      const scrollInfo = editorIns.getScrollInfo();
      const height = scrollInfo.height - scrollInfo.clientHeight;
      const ratio = parseFloat(scrollInfo.top) / height;
      const preview = renderRef.value.$el;
      const move = (preview.scrollHeight - preview.clientHeight) * ratio;
      preview.scrollTop = move;
    }
  };

  const previewScroll = () => {
    const preview = renderRef.value.$el;
    const height = preview.scrollHeight - preview.clientHeight;
    const ratio = parseFloat(preview.scrollTop) / height;
    const move = (editorIns.getScrollInfo().height - editorIns.getScrollInfo().clientHeight) * ratio;
    editorIns.scrollTo(0, move);
  };

  const previewContentChange = (html: string) => {
    previewHtmlList.value = [];
    const domList = parseHTMLStringToDomList(html);
    domList.forEach((ele) => {
      if ((ele as HTMLElement).outerHTML) {
        previewHtmlList.value.push(ele.outerHTML);
      }
    });
    setTimeout(() => {
      editorScroll();
    });
    nextTick(() => {
      ctx.emit('previewContentChange', html);
    });
  };

  const onPreviewScroll = () => {
    if (!canPreviewScrollView) {
      return;
    }
    previewScroll();
  };

  const onPreviewMouseover = () => {
    canPreviewScrollView = true;
  };

  const onPreviewMouseout = () => {
    canPreviewScrollView = false;
  };

  const onChecked = (e: string) => {
    ctx.emit('checkedChange', e);
  };

  const scrollToFocusItem = () => {
    // setTimeout(() => {
    //     if (this.focusItemElement) {
    //         this.focusItemElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest' });
    //     }
    // });
  };

  const setPreviousItemActive = () => {
    activeIndex = activeIndex - 1 < 0 ? hintList.length - 1 : activeIndex - 1;
  };

  const setNextItemActive = () => {
    activeIndex = activeIndex + 1 <= hintList.length - 1 ? activeIndex + 1 : 0;
  };

  const selectHintHandler = (row: any) => {
    const cursor = editorIns.getCursor();
    const endCh = cursorHintEnd;
    let startCh;
    let replaceText = '';
    if (customHintReplaceFn?.value) {
      replaceText = customHintReplaceFn.value(prefix, row);
      startCh = cursorHintStart;
    } else {
      replaceText = row.url ? `[${prefix + row.dispalyText}](${row.url})` : row.dispalyText;
      startCh = row.url ? cursorHintStart : cursorHintStart + prefix.length;
    }
    if (editorIns.getLine(cursor.line).length === cursor.ch) {
      editorIns.replaceRange(replaceText + ' ', { line: cursor.line, ch: startCh }, { line: cursor.line, ch: endCh });
    } else {
      editorIns.replaceRange(replaceText, { line: cursor.line, ch: startCh }, { line: cursor.line, ch: endCh });
      editorIns.setCursor(cursor.line, editorIns.getCursor().ch + 1);
    }
    ctx.emit('selectHint', row);
    editorIns.focus();
    activeIndex = -1;
  };

  let timer: any;
  const attachOverlay = () => {
    timer = setTimeout(() => {
      cursorRef.value = editorRef.value?.parentNode.querySelector('.CodeMirror-cursor') || undefined;
      overlayRef.value.updatePosition();
      isHintShow.value = true;
      hintShow = true;
    });
  };

  const hideHint = () => {
    clearTimeout(timer);
    isHintShow.value = false;
  };

  const showHint = () => {
    if (hintShow) {
      hideHint();
    }
    attachOverlay();
  };

  const getHintList = () => {
    let handler;
    if (typeof hintConfig.value[prefix] === 'function') {
      handler = hintConfig.value[prefix];
    } else if (hintConfig.value[prefix] && typeof hintConfig.value[prefix].handler === 'function') {
      handler = hintConfig.value[prefix].handler;
    }

    const callback = (replaceText: string) => {
      const cursor = editorIns.getCursor();
      const endCh = cursorHintEnd;
      const startCh = cursorHintStart;
      if (editorIns.getLine(cursor.line).length === cursor.ch) {
        editorIns.replaceRange(replaceText + ' ', { line: cursor.line, ch: startCh }, { line: cursor.line, ch: endCh });
      } else {
        editorIns.replaceRange(replaceText, { line: cursor.line, ch: startCh }, { line: cursor.line, ch: endCh });
        editorIns.setCursor(cursor.line, editorIns.getCursor().ch + 1);
      }
      editorIns.focus();
      hideHint();
    };

    handler && handler({ prefix, cursorHint, callback });
  };

  const cursorActivityHandler = () => {
    const cursor = editorIns.getCursor();
    let i = prefixes.value.length;
    const value = editorIns.getLine(cursor.line).replace(/\t/g, ' ');
    let result = false;
    if (beforeShowHint?.value) {
      result = beforeShowHint.value(value);
    }
    if (result) {
      return;
    }
    const selection = editorIns.getSelection();
    const isImgRegx = /^\!\[\S+/;
    if (selection) {
      return;
    }
    let nowPrefix = '';
    let hint = '';
    while (i >= 1) {
      i--;
      nowPrefix = prefixes.value[i];
      const startPos = value.lastIndexOf(nowPrefix, cursor.ch);
      const endPos = value.indexOf(' ', cursor.ch) > -1 ? value.indexOf(' ', cursor.ch) : value.length;
      hint = value.slice(startPos, cursor.ch);
      if (startPos < 0 || !hint.includes(nowPrefix) || hint.endsWith(' ') || isImgRegx.test(hint)) {
        cursorHint = '';
        cursorHintStart = -1;
        cursorHintEnd = -1;
      } else {
        prefix = prefixes.value[i];
        cursorHint = hint.slice(prefix.length);
        cursorHintStart = startPos;
        cursorHintEnd = endPos;
        break;
      }
    }
    if (cursorHintStart > -1 && hint[0]) {
      const spacePosition = value.lastIndexOf(' ', cursor.ch);
      if (spacePosition > cursorHintStart) {
        return;
      }
      /* cursor元素将动态变更，设置settimeout保持其可以获取到值 */
      setTimeout(() => {
        showHint();
        getHintList();
      });
    } else {
      hintList = [];
      hideHint();
    }
  };

  const onChange = debounce(
    () => {
      const content = editorIns.getValue();

      if (!disableChangeEvent.value) {
        ctx.emit('update:modelValue', content);
        ctx.emit('contentChange', content);
      }
      if (!canPreviewScrollView) {
        editorScroll();
      }
    },
    disableChangeEvent.value ? 500 : 10,
    true
  );

  const onScroll = () => {
    if (!canPreviewScrollView) {
      editorScroll();
    }
  };

  const initEditor = () => {
    editorIns = CodeMirror.fromTextArea(editorRef.value, {
      mode: 'markdown',
      lineNumbers: false,
      lineWrapping: true,
      ...options.value,
    });
    if (maxlength.value) {
      editorIns.setOption('maxLength', maxlength.value);
    }
    editorIns.setOption('readOnly', mode.value === 'readonly');
    const shortKeys: Record<string, any> = {};
    const flatToolbarConfig = toolbarConfig.value.flat();
    const tempToolbars = { ...toolbars, ...customToolbars?.value };
    for (const key of Object.keys(tempToolbars)) {
      const toolbarItem = tempToolbars[key];
      if (toolbarItem.shortKey && flatToolbarConfig.includes(toolbarItem.id)) {
        shortKeys[toolbarItem.shortKey.replace(/\+/g, '-')] = toolbarItem.handler?.bind(null, editorIns, toolbarItem.params);
      }
    }

    editorIns.setOption(
      'extraKeys',
      Object.assign({
        Esc: () => {
          hideHint();
        },
      }),
      shortKeys
    );

    editorIns.on('beforeChange', _enforceMaxLength);

    editorIns.on('cursorActivity', throttle(cursorActivityHandler, ((hintConfig.value && hintConfig.value.throttleTime) as number) || 300));

    editorIns.setSize('auto', '100%');
    refreshEditorCursor();
    ctx.emit('afterEditorInit', editorIns);
    editorIns.on('change', onChange);
    editorIns.on('scroll', onScroll);
    setTimeout(() => {
      ctx.emit('contentChange', editorIns.getValue());
    }, 100);
  };

  const onPaste = (e: ClipboardEvent) => {
    const clipboardData = e.clipboardData;
    if (!(clipboardData && clipboardData.items)) {
      return;
    }

    if (clipboardData.items.length <= 3) {
      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.kind === 'file' && item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file?.size === 0) {
            return;
          }

          if (imageUploadToServer.value) {
            const callback = ({ name, imgUrl, title }: any) => {
              editorIns.focus();
              editorIns.replaceSelection(`![${name}](${imgUrl} '${title}')`);
            };
            ctx.emit('imageUpload', { file, callback });
          }
        }
      }
    }
  };

  const onDocumentClick = (e: Event) => {
    if (isHintShow.value && e.target !== containerRef.value && !containerRef.value?.contains(e.target)) {
      hideHint();
    }
  };

  onMounted(async () => {
    await import('codemirror/addon/display/placeholder.js');
    await import('codemirror/mode/markdown/markdown.js');
    const module = await import('codemirror');
    CodeMirror = module.default;
    initEditor();
    document.addEventListener('click', onDocumentClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', onDocumentClick);
  });

  watch(modelValue, (val: string) => {
    if (editorIns) {
      if (val === editorIns.getValue()) {
        return;
      }
      editorIns.setValue(val);
    }
  });

  watch(
    imageUploadToServer,
    (val: boolean) => {
      if (toolbars['image'].params) {
        toolbars['image'].params.imageUploadToServer = val;
      }
      if (toolbars['image'].params && !toolbars['image'].params.imageUpload) {
        toolbars['image'].params.imageUpload = (data: any) => {
          ctx.emit('imageUpload', data);
        };
      }
    },
    { immediate: true }
  );

  watch(hidePreviewView, () => {
    refreshEditorCursor();
  });

  watch(mode, (val: Mode) => {
    setTimeout(() => {
      if (editorIns) {
        refreshEditorCursor();
        editorIns.setOption('readOnly', val === 'readonly');
      }
    });
  });

  watch(maxlength, (val: number) => {
    if (editorIns) {
      editorIns.setOption('maxLength', val);
    }
  });

  return {
    editorRef,
    overlayRef,
    cursorRef,
    renderRef,
    containerRef,
    toolbars,
    toolbarConfig,
    previewHtmlList,
    isHintShow,
    customToolbars,
    getEditorIns,
    onPaste,
    previewContentChange,
    onChecked,
    onPreviewScroll,
    onPreviewMouseout,
    onPreviewMouseover,
  };
}
