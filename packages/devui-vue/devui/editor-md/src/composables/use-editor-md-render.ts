import { toRefs, ref, watch, SetupContext } from 'vue';
import { MdPlugin, MdRenderProps } from '../editor-md-types';
import { MDRenderService } from './md-render-service';

export function useEditorMdRender(props: MdRenderProps, ctx: SetupContext) {
  const { content, customParse, disableRender } = toRefs(props);
  const renderService = new MDRenderService();
  const previewRef = ref();
  let timer: ReturnType<typeof setTimeout> | null = null;

  const setContainerContent = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (content.value === undefined) {
        return;
      }

      let html = renderService.generateHTML(content.value);
      if (customParse?.value && customParse.value instanceof Function) {
        html = customParse.value(html);
      }

      if (!disableRender.value && previewRef.value) {
        previewRef.value.innerHTML = html;
      }
      ctx.emit('mdRenderChange', html);
    }, 300);
  };

  const setChecked = (checked: boolean, index: number) => {
    const pattern = /\[(X|\s|\_|\-)\]\s(.*)/gi;
    let i = 0;
    const result = content.value.replace(pattern, (str) => {
      const arr = str.split('<br>');
      let j = 0;
      while (j < arr.length) {
        if (arr[j].match(/\[(X|\s|\_|\-)\]/i)) {
          i++;
        }
        if (i === index + 1) {
          arr[j] = arr[j].replace(/\[(X|\s|\_|\-)\]/i, `${checked ? '[x]' : '[ ]'}`);
        }
        j++;
      }
      return arr.join('<br>');
    });
    return result;
  };

  const onPreviewClick = (e: any) => {
    if (e.target?.tagName === 'INPUT' && e.target.type === 'checkbox') {
      const result = previewRef.value.querySelectorAll('input');
      const index = [...result].filter((el: any) => el.type === 'checkbox').findIndex((item: any) => item === e.target);
      const checkContent = setChecked(e.target.checked, index);
      ctx.emit('mdCheckedEvent', checkContent);
    }
  };

  return { previewRef, renderService, onPreviewClick, setContainerContent };
}

export function useMdRenderWatcher(props: MdRenderProps, renderService: MDRenderService, setContainerContent: () => void) {
  const { mdRules, content, customParse, renderParse, customXssRules, customRendererRules, baseUrl, breaks, mdPlugins } = toRefs(props);
  watch(
    mdRules,
    () => {
      renderService.setRules(mdRules?.value);
    },
    {
      immediate: true,
    }
  );

  watch(content, setContainerContent, { immediate: true });

  watch(customParse, setContainerContent, { immediate: true });

  watch(
    renderParse,
    () => {
      renderService.setRenderParse(renderParse?.value);
      setContainerContent();
    },
    { immediate: true }
  );

  watch(
    customXssRules,
    () => {
      renderService.setCustomXssRules(customXssRules.value);
      setContainerContent();
    },
    {
      immediate: true,
    }
  );

  watch(
    customRendererRules,
    () => {
      renderService.setCustomRendererRules(customRendererRules?.value);
      setContainerContent();
    },
    {
      immediate: true,
    }
  );

  watch(
    baseUrl,
    () => {
      renderService.setBaseUrl(baseUrl?.value);
      setContainerContent();
    },
    {
      immediate: true,
    }
  );

  watch(
    breaks,
    () => {
      renderService.setBreaks(breaks?.value);
      setContainerContent();
    },
    {
      immediate: true,
    }
  );

  watch(
    mdPlugins,
    (plugins: MdPlugin[]) => {
      if (plugins && plugins.length) {
        renderService.setPlugins(plugins);
        setContainerContent();
      }
    },
    {
      immediate: true,
    }
  );
}
