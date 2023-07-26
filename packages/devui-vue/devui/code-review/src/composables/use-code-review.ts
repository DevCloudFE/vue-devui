import { toRefs, ref, provide, onBeforeMount, watch } from 'vue';
import type { SetupContext } from 'vue';
import * as Diff2Html from 'diff2html';
import { CodeReviewInjectionKey } from '../code-review-types';
import type { CodeReviewProps } from '../code-review-types';

export function useCodeReview(props: CodeReviewProps, ctx: SetupContext) {
  const { diff, fold, outputFormat } = toRefs(props);
  const renderHtml = ref('');
  const isFold = ref(fold.value);
  const diffFile = Diff2Html.parse(diff.value);

  const initDiffContent = () => {
    renderHtml.value = Diff2Html.html(diffFile, {
      drawFileList: false,
      matching: 'lines',
      outputFormat: outputFormat.value,
    });
  };

  const toggleFold = (status?: boolean) => {
    if (status !== undefined) {
      isFold.value = status;
    } else {
      isFold.value = !isFold.value;
    }
  };

  watch(fold, (val) => {
    isFold.value = val;
  });

  watch(isFold, () => {
    if (!isFold.value && renderHtml.value === '') {
      initDiffContent();
    }
    ctx.emit('foldChange', isFold.value);
  });

  onBeforeMount(() => {
    if (!isFold.value) {
      initDiffContent();
    }
  });

  provide(CodeReviewInjectionKey, { diffInfo: diffFile[0], isFold, rootCtx: ctx });

  ctx.expose({ toggleFold });

  return { renderHtml, isFold };
}
