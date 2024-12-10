import { toRefs, ref, watch, nextTick } from 'vue';
import type { SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';
import * as Diff2Html from 'diff2html';
import { inBrowser } from '../../../shared/utils/common-var';
import type { CodeReviewProps, IExpandLineNumberInfo } from '../code-review-types';
import { useCodeReviewExpand } from './use-code-review-expand';
import { parseDiffCode } from '../utils';

export function useCodeReview(
  props: CodeReviewProps,
  ctx: SetupContext,
  reviewContentRef: Ref<HTMLElement>,
  updateLineNumberMap: (expandLineNumberInfo: IExpandLineNumberInfo, newCode: string, direction: 'up' | 'down') => void,
  updateCheckedLine: (expandLineNumberInfo: IExpandLineNumberInfo, direction: 'up' | 'down') => void
) {
  const { diff, outputFormat, allowExpand, showBlob } = toRefs(props);
  const renderHtml = ref('');
  const diffFile: Ref<DiffFile[]> = ref([]);
  const { insertExpandButton, onExpandButtonClick } = useCodeReviewExpand(reviewContentRef, props, updateLineNumberMap, updateCheckedLine);

  const initDiffContent = () => {
    diffFile.value = Diff2Html.parse(diff.value);
    nextTick(() => {
      if (inBrowser && !showBlob.value) {
        parseDiffCode(reviewContentRef.value, diff.value, outputFormat.value, props.options);
        allowExpand.value && insertExpandButton();
        ctx.emit('contentRefresh', JSON.parse(JSON.stringify(diffFile.value)));
      }
    });
  };

  const onContentClick = (e: Event) => {
    onExpandButtonClick(e, props.options);
  };

  watch(showBlob, initDiffContent);

  watch(outputFormat, initDiffContent);

  watch(diff, initDiffContent, { immediate: true });

  return { renderHtml, diffFile, onContentClick };
}
