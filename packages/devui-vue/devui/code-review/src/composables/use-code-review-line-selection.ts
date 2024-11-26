import type { Ref } from 'vue';
import type { CodeReviewProps } from '../code-review-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { findParentTrNode, getLineNumbers } from '../utils';

export function useCodeReviewLineSelection(
  reviewContentRef: Ref<HTMLElement>,
  props: CodeReviewProps,
  afterMouseup: (lineNumbers: { lefts: number[]; rights: number[] }) => void
) {
  const ns = useNamespace('code-review');
  let dragging = false;
  let startTrNode: HTMLElement;
  let trNodes: HTMLElement[];
  let isClickedLeft: boolean | undefined;
  let shouldClear: boolean;
  let isMouseMoved: boolean;
  let checkedTrNodes: HTMLElement[] = [];

  const onMousedown = (e: MouseEvent) => {
    // 鼠标左键按下
    if (e.button === 0) {
      const composedPath = e.composedPath() as HTMLElement[];
      const lineNumberBox = composedPath.find(
        (item) => item.classList?.contains('comment-icon-hover') || item.classList?.contains('comment-icon')
      );
      trNodes = Array.from(reviewContentRef.value.querySelectorAll('tr')).filter((item) => !item.classList?.contains('expand-line'));
      // 根据事件返回的dom判断是否点击的行号
      if (!lineNumberBox) {
        return;
      }
      const parentTrNode = findParentTrNode(e.target as HTMLElement);
      // 判断点击的是否是展开图标
      if (parentTrNode && parentTrNode?.classList.contains('expand-line')) {
        return;
      }
      startTrNode = parentTrNode as HTMLElement;
      if (props.outputFormat === 'side-by-side') {
        isClickedLeft = composedPath.some((item) => item.classList?.contains('d-code-left'));
      } else {
        isClickedLeft = undefined;
      }

      dragging = true;
      shouldClear = true;
      isMouseMoved = false;
      e.preventDefault();
      e.stopPropagation();
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('mouseup', onMouseup);
    }
  };

  function onMousemove(e: MouseEvent) {
    if (!dragging) {
      return;
    }
    isMouseMoved = true;
    if (shouldClear) {
      clearCommentChecked();
      shouldClear = false;
    }
    const composedPath = e.composedPath() as HTMLElement[];
    const inReviewContent = composedPath.some((item) => item.classList?.contains(ns.e('content')));
    if (!inReviewContent) {
      return;
    }
    const endTrNode = findParentTrNode(e.target as HTMLElement);
    if (!endTrNode) {
      return;
    }
    let startIndex = trNodes.indexOf(startTrNode);
    let endIndex = trNodes.indexOf(endTrNode);
    if (endIndex === -1) {
      return;
    }
    if (startIndex > endIndex) {
      [startIndex, endIndex] = [endIndex, startIndex];
    }

    let position: 'left' | 'right' | 'all';
    if (isClickedLeft === undefined) {
      position = 'all';
    } else if (isClickedLeft) {
      position = 'left';
    } else {
      position = 'right';
    }
    checkedTrNodes = [];
    for (let i = 0; i < trNodes.length; i++) {
      if (i >= startIndex && i <= endIndex) {
        toggleCommentCheckedClass(trNodes[i], true, position);
        checkedTrNodes.push(trNodes[i]);
      } else {
        toggleCommentCheckedClass(trNodes[i], false, position);
      }
    }
  }

  function onMouseup() {
    dragging = false;
    if (isMouseMoved) {
      afterMouseup(getLineNumbers(checkedTrNodes, props.outputFormat, isClickedLeft ? 'left' : 'right'));
    }
    document.removeEventListener('mouseup', onMouseup);
    document.removeEventListener('mousemove', onMousemove);
  }

  // 清除上次的选中
  function clearCommentChecked() {
    for (let i = 0; i < trNodes.length; i++) {
      toggleCommentCheckedClass(trNodes[i], false, 'all');
    }
  }

  function toggleCommentCheckedClass(trNode: HTMLElement, isAddClass: boolean, position: 'left' | 'right' | 'all') {
    const tdNodes = Array.from(trNode.children);
    let toDoNodes;
    if (position === 'all') {
      toDoNodes = tdNodes;
    } else if (position === 'left') {
      toDoNodes = tdNodes.slice(0, 2);
    } else {
      toDoNodes = tdNodes.slice(2);
    }
    if ((position === 'left' || position === 'right') && isNaN(parseInt(toDoNodes[0]?.innerHTML))) {
      return;
    }
    toDoNodes.forEach((item) => {
      if (item.tagName === 'TD') {
        if (isAddClass) {
          item.classList.add('comment-checked');
        } else {
          item.classList.remove('comment-checked');
        }
      }
    });
  }

  return { onMousedown };
}
