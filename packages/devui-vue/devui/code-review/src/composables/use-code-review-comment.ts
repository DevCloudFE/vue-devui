import { ref } from 'vue';
import type { SetupContext, Ref } from 'vue';
import type { LineSide } from '../code-review-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { notEmptyNode, addCommentToPage } from '../utils';

export function useCodeReviewComment(reviewContentRef: Ref<HTMLElement>, ctx: SetupContext) {
  const ns = useNamespace('code-review');
  const commentLeft = ref(-100);
  const commentTop = ref(-100);
  let currentLeftLineNumber = -1;
  let currentRightLineNumber = -1;
  let currentHoverTr: HTMLElement;
  let containerRect: DOMRect;

  const resetLeftTop = () => {
    commentLeft.value = -100;
    commentTop.value = -100;
    currentLeftLineNumber = -1;
    currentRightLineNumber = -1;
  };

  const onMouseEnter = (e: MouseEvent) => {
    containerRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  };

  const onMouseMove = (e: MouseEvent) => {
    const composedPath = e.composedPath() as HTMLElement[];
    const trNode = composedPath.find((item) => item.tagName === 'TR');
    if (trNode) {
      const lineNumberContainer = Array.from(trNode.children)[0] as HTMLElement;
      if (notEmptyNode(lineNumberContainer)) {
        const { top, left } = lineNumberContainer.getBoundingClientRect();
        commentLeft.value = left;
        commentTop.value = top;
        currentLeftLineNumber = parseInt((lineNumberContainer.children[0] as HTMLElement)?.innerText) || -1;
        currentRightLineNumber = parseInt((lineNumberContainer.children[1] as HTMLElement)?.innerText) || -1;
        currentHoverTr = trNode;
      } else {
        resetLeftTop();
      }
    }
  };
  const onMouseleave = (e: MouseEvent) => {
    if (!(e.relatedTarget as HTMLElement)?.classList.contains('comment-icon')) {
      resetLeftTop();
    }
  };

  const onCommentMouseLeave = (e: MouseEvent) => {
    if (!(e.relatedTarget as HTMLElement)?.classList.contains(ns.e('content'))) {
      resetLeftTop();
    }
  };

  const onCommentIconClick = () => {
    ctx.emit('addComment', { left: currentLeftLineNumber, right: currentRightLineNumber });
  };

  const findReferenceDom = (lineNumber: number, lineSide: LineSide) => {
    const trNodes = Array.from(reviewContentRef.value.querySelectorAll('tr'));
    for (const index in trNodes) {
      const lineIndex = parseInt(index);
      const lineNumberBox = Array.from(trNodes[lineIndex].children)[0] as HTMLElement;
      if (notEmptyNode(lineNumberBox)) {
        const oldLineNumber = parseInt((lineNumberBox.children[0] as HTMLElement)?.innerText ?? -1);
        const newLineNumber = parseInt((lineNumberBox.children[1] as HTMLElement)?.innerText ?? -1);

        if ((lineSide === 'left' && oldLineNumber === lineNumber) || (lineSide === 'right' && newLineNumber === lineNumber)) {
          return trNodes[lineIndex];
        }
      }
    }
  };

  const insertComment = (lineNumber: number, lineSide: LineSide, commentDom: HTMLElement) => {
    const lineHost = findReferenceDom(lineNumber, lineSide);
    lineHost && addCommentToPage(lineHost, commentDom, lineSide);
  };

  const removeComment = (lineNumber: number, lineSide: LineSide) => {
    const lineHost = findReferenceDom(lineNumber, lineSide);
    let nextLineHost = lineHost?.nextElementSibling;
    while (nextLineHost) {
      const classList = nextLineHost?.classList;
      if (classList?.contains('comment-block') && classList.contains(lineSide)) {
        nextLineHost.remove();
        return;
      }
      nextLineHost = nextLineHost.nextElementSibling;
    }
  };

  return {
    commentLeft,
    commentTop,
    onMouseEnter,
    onMouseMove,
    onMouseleave,
    onCommentMouseLeave,
    onCommentIconClick,
    insertComment,
    removeComment,
  };
}
