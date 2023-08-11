import { toRefs, ref, watch, nextTick } from 'vue';
import type { SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';
import * as Diff2Html from 'diff2html';
import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui';
import type { CodeReviewProps } from '../code-review-types';
import { useCodeReviewExpand } from './use-code-review-expand';

export function useCodeReview(props: CodeReviewProps, ctx: SetupContext) {
  const { diff, outputFormat, expandAllThreshold } = toRefs(props);
  const renderHtml = ref('');
  const reviewContentRef = ref();
  const diffFile: Ref<DiffFile[]> = ref([]);
  const { insertExpandButton } = useCodeReviewExpand(reviewContentRef, expandAllThreshold.value, outputFormat.value);

  const initDiffContent = () => {
    diffFile.value = Diff2Html.parse(diff.value);
    nextTick(() => {
      const diff2HtmlUi = new Diff2HtmlUI(reviewContentRef.value, diff.value, {
        drawFileList: false,
        matching: 'lines',
        outputFormat: outputFormat.value,
        highlight: true,
      });
      diff2HtmlUi.draw();
      diff2HtmlUi.highlightCode();
      insertExpandButton();
      ctx.emit('contentRefresh', JSON.parse(JSON.stringify(diffFile.value)));
    });
  };

  watch(diff, initDiffContent, { immediate: true });

  return { renderHtml, reviewContentRef, diffFile };
}
