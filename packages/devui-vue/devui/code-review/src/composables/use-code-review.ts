import { toRefs, ref, watch, nextTick, onUnmounted } from 'vue';
import type { SetupContext, Ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';
import * as Diff2Html from 'diff2html';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { inBrowser } from '../../../shared/utils/common-var';
import type { CodeReviewProps, IExpandLineNumberInfo } from '../code-review-types';
import { useCodeReviewExpand } from './use-code-review-expand';
import { getSelectionParent, parseDiffCode } from '../utils';

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
  const ns = useNamespace('code-review');
  const selectionSide = ref('');
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

  function onSelectionChange() {
    if (selectionSide.value) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }
    const selection = window.getSelection();
    if (selection?.toString() && selection?.anchorNode) {
      const side = getSelectionParent(selection.anchorNode as HTMLElement);
      if (side) {
        selectionSide.value = side;
      }
    }
  }
  function onMousedown(e: Event) {
    if (typeof window === 'undefined') {
      return;
    }
    const selection = window.getSelection();
    const composedPath = e.composedPath();
    const isLineNumber = composedPath.some((item: HTMLElement) => item.classList?.contains('d2h-code-side-linenumber'));
    const isClickInner = composedPath.some((item: HTMLElement) => item.classList?.contains(ns.e('content')));
    const clickSide = getSelectionParent(e.target as HTMLElement);
    if (selection && selection.toString()) {
      const isInRange = selection?.getRangeAt(0).intersectsNode(e.target);
      if (
        !isInRange ||
        !isClickInner ||
        (clickSide === 'left' && selectionSide.value === 'right') ||
        (clickSide === 'right' && selectionSide.value === 'left') ||
        isLineNumber
      ) {
        setTimeout(() => {
          selectionSide.value = '';
        });
        selection.removeRange(selection.getRangeAt(0));
      }
    } else {
      selectionSide.value = '';
    }
  }

  watch(showBlob, initDiffContent);

  watch(outputFormat, initDiffContent);

  watch(diff, initDiffContent, { immediate: true });

  watch(
    () => props.outputFormat,
    (val) => {
      if (val === 'side-by-side') {
        document.addEventListener('selectionchange', onSelectionChange);
        document.addEventListener('mousedown', onMousedown, true);
      } else {
        document.removeEventListener('selectionchange', onSelectionChange);
        document.removeEventListener('mousedown', onMousedown, true);
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    document.removeEventListener('selectionchange', onSelectionChange);
    document.removeEventListener('mousedown', onMousedown, true);
  });

  return { renderHtml, diffFile, selectionSide, onContentClick };
}
