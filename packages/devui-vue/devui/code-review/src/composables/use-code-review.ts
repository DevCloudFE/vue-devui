import { toRefs, ref, onMounted } from 'vue';
import * as Diff2Html from 'diff2html';
import type { CodeReviewProps } from '../code-review-types';

export function useCodeReview(props: CodeReviewProps) {
  const { diff, outputFormat } = toRefs(props);
  const renderHtml = ref('');

  onMounted(() => {
    renderHtml.value = Diff2Html.html(diff.value, {
      drawFileList: true,
      matching: 'lines',
      outputFormat: outputFormat.value,
    });
  });

  return { renderHtml };
}
