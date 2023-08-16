import { ref, toRefs, onUnmounted } from 'vue';
import type { SetupContext, Ref } from 'vue';
import type { LineSide, CodeReviewProps } from '../code-review-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import {
  notEmptyNode,
  addCommentToPageForSingleColumn,
  addCommentToPageForDoubleColumn,
  findReferenceDomForSingleColumn,
  findReferenceDomForDoubleColumn,
} from '../utils';

export function useCodeReviewComment(reviewContentRef: Ref<HTMLElement>, props: CodeReviewProps, ctx: SetupContext) {
  const { outputFormat, allowComment } = toRefs(props);
  const ns = useNamespace('code-review');
  const commentLeft = ref(-100);
  const commentTop = ref(-100);
  let currentLeftLineNumber = -1;
  let currentRightLineNumber = -1;

  const resetLeftTop = () => {
    commentLeft.value = -100;
    commentTop.value = -100;
    currentLeftLineNumber = -1;
    currentRightLineNumber = -1;
  };

  const onMouseMove = (e: MouseEvent) => {
    const composedPath = e.composedPath() as HTMLElement[];
    const trNode = composedPath.find((item) => item.tagName === 'TR');
    if (trNode) {
      if (outputFormat.value === 'line-by-line') {
        const lineNumberContainer = Array.from(trNode.children)[0] as HTMLElement;
        if (notEmptyNode(lineNumberContainer)) {
          const { top, left } = lineNumberContainer.getBoundingClientRect();
          commentLeft.value = left;
          commentTop.value = top;
          currentLeftLineNumber = parseInt((lineNumberContainer.children[0] as HTMLElement)?.innerText) || -1;
          currentRightLineNumber = parseInt((lineNumberContainer.children[1] as HTMLElement)?.innerText) || -1;
        } else {
          resetLeftTop();
        }
      } else {
        if (trNode.classList.contains('comment-block')) {
          return resetLeftTop();
        }
        const tdNode = composedPath.find((item) => item.tagName === 'TD');
        const tdIndex = Array.from(trNode.children).findIndex((item) => item === tdNode);
        const tdNodes = Array.from(trNode.children) as HTMLElement[];
        const leftLineNumberContainer = tdNodes[0];
        const rightLineNumberContainer = tdNodes[2];
        if (tdIndex < 2) {
          if (notEmptyNode(leftLineNumberContainer)) {
            const { top, left } = leftLineNumberContainer.getBoundingClientRect();
            commentLeft.value = left;
            commentTop.value = top;
            currentLeftLineNumber = parseInt(leftLineNumberContainer.innerText);
          } else {
            resetLeftTop();
          }
        } else {
          if (rightLineNumberContainer && notEmptyNode(rightLineNumberContainer)) {
            const { top, left } = rightLineNumberContainer.getBoundingClientRect();
            commentLeft.value = left;
            commentTop.value = top;
            currentRightLineNumber = parseInt(rightLineNumberContainer.innerText);
          } else {
            resetLeftTop();
          }
        }
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
    const emitObj: Partial<Record<'left' | 'right', number>> = {};
    if (outputFormat.value === 'line-by-line') {
      emitObj.left = currentLeftLineNumber;
      emitObj.right = currentRightLineNumber;
    } else if (currentLeftLineNumber !== -1) {
      emitObj.left = currentLeftLineNumber;
    } else {
      emitObj.right = currentRightLineNumber;
    }
    ctx.emit('addComment', { left: currentLeftLineNumber, right: currentRightLineNumber });
  };

  const insertComment = (lineNumber: number, lineSide: LineSide, commentDom: HTMLElement) => {
    if (outputFormat.value === 'line-by-line') {
      const lineHost = findReferenceDomForSingleColumn(reviewContentRef.value, lineNumber, lineSide);
      lineHost && addCommentToPageForSingleColumn(lineHost, commentDom, lineSide);
    } else {
      const lineHost = findReferenceDomForDoubleColumn(reviewContentRef.value, lineNumber, lineSide);
      lineHost && addCommentToPageForDoubleColumn(lineHost, commentDom, lineSide);
    }
  };

  const removeComment = (lineNumber: number, lineSide: LineSide) => {
    if (outputFormat.value === 'line-by-line') {
      const lineHost = findReferenceDomForSingleColumn(reviewContentRef.value, lineNumber, lineSide);
      let nextLineHost = lineHost?.nextElementSibling;
      while (nextLineHost) {
        const classList = nextLineHost?.classList;
        if (classList?.contains('comment-block') && classList.contains(lineSide)) {
          nextLineHost.remove();
          return;
        }
        nextLineHost = nextLineHost.nextElementSibling;
      }
    } else {
      const lineHost = findReferenceDomForDoubleColumn(reviewContentRef.value, lineNumber, lineSide);
      const nextLineHost = lineHost?.nextElementSibling;
      if (nextLineHost && nextLineHost.classList.contains('comment-block')) {
        const leftChildren = nextLineHost.children[0];
        const rightChildren = nextLineHost.children[1];
        if (lineSide === 'left') {
          leftChildren.children[0].remove();
        } else {
          rightChildren.children[0].remove();
        }
        if (!leftChildren.children.length && !rightChildren.children.length) {
          nextLineHost.remove();
        }
      }
    }
  };

  const mouseEvent = allowComment.value ? { onMousemove: onMouseMove, onMouseleave: onMouseleave } : {};

  window.addEventListener('scroll', resetLeftTop);

  onUnmounted(() => {
    window.removeEventListener('scroll', resetLeftTop);
  });

  return {
    commentLeft,
    commentTop,
    mouseEvent,
    onCommentMouseLeave,
    onCommentIconClick,
    insertComment,
    removeComment,
  };
}
