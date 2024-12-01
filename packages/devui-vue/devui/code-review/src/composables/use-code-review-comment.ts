import { ref, toRefs, onUnmounted } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { useCodeReviewLineSelection } from './use-code-review-line-selection';
import type { LineSide, CodeReviewProps, ICheckedLineDetails } from '../code-review-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import {
  notEmptyNode,
  addCommentToPageForSingleColumn,
  addCommentToPageForDoubleColumn,
  findReferenceDomForSingleColumn,
  findReferenceDomForDoubleColumn,
} from '../utils';

export function useCodeReviewComment(reviewContentRef: Ref<HTMLElement>, props: CodeReviewProps, ctx: SetupContext) {
  const { outputFormat, allowComment, allowChecked } = toRefs(props);
  const ns = useNamespace('code-review');
  const { onMousedown, updateLineNumberMap, getCheckedLineDetails, clearCommentClass, updateCheckedLine } = useCodeReviewLineSelection(
    reviewContentRef,
    props,
    afterMouseup
  );
  const commentLeft = ref(-100);
  const commentTop = ref(-100);
  let currentLeftLineNumber = -1;
  let currentRightLineNumber = -1;
  let currentPosition: 'left' | 'right';
  let lastLineNumberContainer: HTMLElement | null;

  const resetLeftTop = () => {
    commentLeft.value = -100;
    commentTop.value = -100;
    currentLeftLineNumber = -1;
    currentRightLineNumber = -1;
    lastLineNumberContainer?.classList.remove('comment-icon-hover');
    lastLineNumberContainer = null;
  };

  const onMouseMove = (e: MouseEvent) => {
    const composedPath = e.composedPath() as HTMLElement[];
    const trNode = composedPath.find((item) => item.tagName === 'TR');
    if (trNode) {
      if (outputFormat.value === 'line-by-line') {
        const lineNumberContainer = Array.from(trNode.children)[0] as HTMLElement;
        if (lastLineNumberContainer !== lineNumberContainer) {
          lastLineNumberContainer?.classList.remove('comment-icon-hover');
        }
        if (notEmptyNode(lineNumberContainer)) {
          lastLineNumberContainer = lineNumberContainer;
          lineNumberContainer.classList.add('comment-icon-hover');
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
          if (lastLineNumberContainer !== leftLineNumberContainer) {
            lastLineNumberContainer?.classList.remove('comment-icon-hover');
          }
          if (notEmptyNode(leftLineNumberContainer)) {
            lastLineNumberContainer = leftLineNumberContainer;
            leftLineNumberContainer.classList.add('comment-icon-hover');
            const { top, left } = leftLineNumberContainer.getBoundingClientRect();
            commentLeft.value = left;
            commentTop.value = top;
            currentLeftLineNumber = parseInt(leftLineNumberContainer.innerText);
            currentRightLineNumber = parseInt(rightLineNumberContainer.innerText || '-1');
            currentPosition = 'left';
          } else {
            resetLeftTop();
          }
        } else {
          if (lastLineNumberContainer !== rightLineNumberContainer) {
            lastLineNumberContainer?.classList.remove('comment-icon-hover');
          }
          if (rightLineNumberContainer && notEmptyNode(rightLineNumberContainer)) {
            lastLineNumberContainer = rightLineNumberContainer;
            rightLineNumberContainer.classList.add('comment-icon-hover');
            const { top, left } = rightLineNumberContainer.getBoundingClientRect();
            commentLeft.value = left;
            commentTop.value = top;
            currentLeftLineNumber = parseInt(leftLineNumberContainer.innerText || '-1');
            currentRightLineNumber = parseInt(rightLineNumberContainer.innerText);
            currentPosition = 'right';
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

  // 点击
  const commentClick = () => {
    let obj = { left: currentLeftLineNumber, right: currentRightLineNumber, position: currentPosition };
    const checkedLineDetails = getCheckedLineDetails();
    // 多行选中
    if (checkedLineDetails && allowChecked.value) {
      const { lefts, rights } = checkedLineDetails;
      const maxCheckedLeftLineNumber = lefts[lefts.length - 1];
      const maxCheckedRightLineNumber = rights[rights.length - 1];
      if (maxCheckedLeftLineNumber === currentLeftLineNumber || maxCheckedRightLineNumber === currentRightLineNumber) {
        obj.details = checkedLineDetails;
      } else {
        clearCommentClass();
      }
    }
    // 点击添加评论图标触发的事件
    ctx.emit('addComment', obj);
  };
  function afterMouseup(details: ICheckedLineDetails) {
    ctx.emit('afterCheckLines', { left: currentLeftLineNumber, right: currentRightLineNumber, position: currentPosition, details });
  }
  // 图标或者单行的点击
  const onCommentIconClick = (e: Event) => {
    if (e) {
      // 根据时间反回的dom判断是否点击中的制定区域
      const composedPath = e.composedPath() as HTMLElement[];
      const lineNumberBox = composedPath.find(
        (item) => item.classList?.contains('comment-icon-hover') || item.classList?.contains('comment-icon')
      );
      if (!lineNumberBox) {
        return;
      }
    }
    commentClick();
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

  const clearCheckedLines = () => {
    clearCommentClass();
  };

  const mouseEvent: Record<string, (e: MouseEvent) => void> = {};
  if (allowComment.value) {
    mouseEvent.onMousemove = onMouseMove;
    mouseEvent.onMouseleave = onMouseleave;
  }
  if (props.allowChecked) {
    mouseEvent.onMousedown = onMousedown;
  }

  window.addEventListener('scroll', resetLeftTop);

  onUnmounted(() => {
    window.removeEventListener('scroll', resetLeftTop);
  });

  return {
    commentLeft,
    commentTop,
    mouseEvent,
    clearCheckedLines,
    onCommentMouseLeave,
    onCommentIconClick,
    insertComment,
    removeComment,
    updateLineNumberMap,
    updateCheckedLine,
  };
}
