import { toRefs, ref, provide, onBeforeMount, watch, nextTick } from 'vue';
import type { SetupContext } from 'vue';
import * as Diff2Html from 'diff2html';
import { CodeReviewInjectionKey } from '../code-review-types';
import type { CodeReviewProps } from '../code-review-types';
import { useCodeReviewExpand } from './use-code-review-expand';

export function useCodeReview(props: CodeReviewProps, ctx: SetupContext) {
  const { diff, fold, outputFormat, expandAllThreshold } = toRefs(props);
  const renderHtml = ref('');
  const isFold = ref(fold.value);
  const reviewContentRef = ref();
  const diffFile = Diff2Html.parse(diff.value);
  const { insertExpandButton } = useCodeReviewExpand(reviewContentRef, expandAllThreshold.value, outputFormat.value);

  const initDiffContent = () => {
    renderHtml.value = Diff2Html.html(diffFile, {
      drawFileList: false,
      matching: 'lines',
      outputFormat: outputFormat.value,
      /* rawTemplates: {
        'side-by-side-file-diff': '<table><tbody>{{{diffs.left}}}{{{diffs.right}}}</tbody></table>',
      }, */
    });
    nextTick(insertExpandButton);
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

  provide(CodeReviewInjectionKey, { reviewContentRef, diffInfo: diffFile[0], isFold, rootCtx: ctx });

  return { renderHtml, isFold, reviewContentRef, toggleFold };
}
