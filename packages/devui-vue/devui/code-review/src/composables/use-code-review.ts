import { toRefs, ref, watch, nextTick } from 'vue';
import type { SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';
import * as Diff2Html from 'diff2html';
import { inBrowser } from '../../../shared/utils/common-var';
import type { CodeReviewProps } from '../code-review-types';
import { useCodeReviewExpand } from './use-code-review-expand';
import { parseDiffCode } from '../utils';

export function useCodeReview(props: CodeReviewProps, ctx: SetupContext) {
  const { diff, outputFormat, allowExpand } = toRefs(props);
  const renderHtml = ref('');
  const reviewContentRef = ref();
  const diffFile: Ref<DiffFile[]> = ref([]);
  const { insertExpandButton, onExpandButtonClick } = useCodeReviewExpand(reviewContentRef, props);

  const initDiffContent = () => {
    diffFile.value = Diff2Html.parse(diff.value);
    nextTick(() => {
      if (inBrowser) {
        parseDiffCode(reviewContentRef.value, diff.value, outputFormat.value);
        allowExpand.value && insertExpandButton();
      }
      ctx.emit('contentRefresh', JSON.parse(JSON.stringify(diffFile.value)));
    });
  };

  const onContentClick = (e: Event) => {
    onExpandButtonClick(e);
  };

  watch(outputFormat, initDiffContent);

  watch(diff, initDiffContent, { immediate: true });

  return { renderHtml, reviewContentRef, diffFile, onContentClick };
}
