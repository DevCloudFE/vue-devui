import { watch } from 'vue';
import type { Ref } from 'vue';
import type { CodeReviewProps, CommentPosition, ICheckedLineDetails, IExpandLineNumberInfo, ILineNumberTdMap } from '../code-review-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import {
  findParentTrNode,
  clearCommentChecked,
  parseCodeToSingle,
  getLineNumberMap,
  getLineNumberTdMap,
  getDoubleCheckNumberAndCode,
  getSingleCheckedNumberAndCode,
  addCommentCheckedForDouble,
  addCommentCheckedForSingle,
} from '../utils';

export function useCodeReviewLineSelection(
  reviewContentRef: Ref<HTMLElement>,
  props: CodeReviewProps,
  afterMouseup: (details: ICheckedLineDetails) => void
) {
  const ns = useNamespace('code-review');
  let dragging = false;
  let startTrNode: HTMLElement;
  let trNodes: HTMLElement[];
  let allTdNodes: HTMLElement[] = [];
  let shouldClear: boolean;
  let isMouseMoved: boolean;
  let leftRightLineNumberArr: CommentPosition[] = [];
  let leftNumberTdMap: ILineNumberTdMap = {};
  let rightNumberTdMap: ILineNumberTdMap = {};
  let checkedTdNodes: HTMLElement[] = [];
  let startPosition: 'left' | 'right';
  let leftMinNum: number;
  let leftMaxNum: number;
  let rightMinNum: number;
  let rightMaxNum: number;

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
      allTdNodes = [];
      for (let i = 0; i < trNodes.length; i++) {
        allTdNodes.push(...trNodes[i].children);
      }
      if (props.outputFormat === 'side-by-side') {
        const { left, right } = getLineNumberTdMap(trNodes);
        leftNumberTdMap = left;
        rightNumberTdMap = right;
        startPosition = composedPath.some((item) => item.classList.contains('d-code-left')) ? 'left' : 'right';
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
    if (shouldClear) {
      clearCommentChecked(checkedTdNodes);
      shouldClear = false;
    }
    const composedPath = e.composedPath() as HTMLElement[];
    const inReviewContent = composedPath.some((item) => item.classList?.contains(ns.e('content')));
    if (!inReviewContent) {
      return;
    }
    const endTrNode = findParentTrNode(e.target as HTMLElement);
    let endPosition: 'left' | 'right';
    if (props.outputFormat === 'side-by-side') {
      if (composedPath.some((item) => item.classList.contains('d-code-left'))) {
        endPosition = 'left';
      }
      if (composedPath.some((item) => item.classList.contains('d-code-right'))) {
        endPosition = 'right';
      }
    }
    if (!endTrNode) {
      return;
    }
    isMouseMoved = true;
    const endTrChildren = endTrNode.children;
    if (
      (endPosition === 'left' && isNaN(parseInt(endTrChildren[0]?.innerText))) ||
      (endPosition === 'right' && isNaN(parseInt(endTrChildren[2]?.innerText)))
    ) {
      return;
    }

    checkedTdNodes = [];

    if (props.outputFormat === 'line-by-line') {
      let startIndex = trNodes.indexOf(startTrNode);
      let endIndex = trNodes.indexOf(endTrNode);
      if (endIndex === -1) {
        return;
      }
      if (startIndex > endIndex) {
        [startIndex, endIndex] = [endIndex, startIndex];
      }
      for (let i = 0; i < trNodes.length; i++) {
        const tdNodes = Array.from(trNodes[i].children) as HTMLElement[];
        if (i >= startIndex && i <= endIndex) {
          checkedTdNodes.push(...tdNodes);
        }
      }
    }

    if (props.outputFormat === 'side-by-side') {
      const startNum = parseInt((startTrNode.children[startPosition === 'left' ? 0 : 2] as HTMLElement).innerText);
      let sIndex = leftRightLineNumberArr.findIndex((item) => item[startPosition] === startNum);
      const endNum = parseInt((endTrNode.children[endPosition === 'left' ? 0 : 2] as HTMLElement).innerText);
      let eIndex = leftRightLineNumberArr.findIndex((item) => item[endPosition] === endNum);
      if (sIndex > eIndex) {
        [sIndex, eIndex] = [eIndex, sIndex];
      }
      const tempArr = leftRightLineNumberArr.slice(sIndex, eIndex + 1);
      for (let i = 0; i < tempArr.length; i++) {
        const { left, right } = tempArr[i];
        if (left !== -1) {
          checkedTdNodes.push(...leftNumberTdMap[left]);
        }
        if (right !== -1) {
          checkedTdNodes.push(...rightNumberTdMap[right]);
        }
      }
    }

    /* 更新节点选中状态 */
    for (let i = 0; i < allTdNodes.length; i++) {
      if (checkedTdNodes.includes(allTdNodes[i])) {
        allTdNodes[i].classList.add('comment-checked');
      } else {
        allTdNodes[i].classList.remove('comment-checked');
      }
    }
  }

  function onMouseup() {
    dragging = false;
    if (isMouseMoved) {
      let details: ICheckedLineDetails;
      if (props.outputFormat === 'side-by-side') {
        details = getDoubleCheckNumberAndCode(checkedTdNodes);
      } else {
        details = getSingleCheckedNumberAndCode(checkedTdNodes);
      }
      leftMinNum = details.lefts[0];
      leftMaxNum = details.lefts[details.lefts.length - 1];
      rightMinNum = details.rights[0];
      rightMaxNum = details.rights[details.rights.length - 1];
      afterMouseup(details);
    }

    document.removeEventListener('mouseup', onMouseup);
    document.removeEventListener('mousemove', onMousemove);
  }

  /* 点击评论时，获取选中行的数据 */
  const getCheckedLineDetails = () => {
    if (checkedTdNodes.length) {
      return props.outputFormat === 'side-by-side'
        ? getDoubleCheckNumberAndCode(checkedTdNodes)
        : getSingleCheckedNumberAndCode(checkedTdNodes);
    }
  };

  /* 清除选中行 */
  const clearCommentClass = () => {
    clearCommentChecked(checkedTdNodes);
    checkedTdNodes = [];
  };

  /* 点击展开行后，更新左右行号映射关系 */
  const updateLineNumberMap = (expandLineNumberInfo: IExpandLineNumberInfo, newCode: string, direction: 'down' | 'up') => {
    const container = document.createElement('div');
    parseCodeToSingle(container, newCode, props.option);
    const { prevL, prevR, nextL, nextR } = expandLineNumberInfo;
    const arr = getLineNumberMap(Array.from(container.querySelectorAll('tr')));
    if (direction === 'down') {
      const preLeft = Number(prevL) - 1;
      const preRight = Number(prevR) - 1;
      const index = leftRightLineNumberArr.findIndex((item) => item.left === preLeft && item.right === preRight);
      leftRightLineNumberArr.splice(index + 1, 0, ...arr);
    } else {
      const nextLeft = Number(nextL) + 1;
      const nextRight = Number(nextR) + 1;
      const index = leftRightLineNumberArr.findIndex((item) => item.left === nextLeft && item.right === nextRight);
      leftRightLineNumberArr.splice(index, 0, ...arr);
    }
  };

  /* 点击展开行后，更新选中行的数据 */
  const updateCheckedLine = (expandLineNumberInfo: IExpandLineNumberInfo, direction: 'down' | 'up') => {
    const allTrNodes = Array.from(reviewContentRef.value.querySelectorAll('tr')).filter((item) => !item.classList?.contains('expand-line'));
    const { prevL, nextL } = expandLineNumberInfo;
    const num = direction === 'down' ? Number(prevL) : Number(nextL);

    if (!checkedTdNodes.length || num < leftMinNum || num > leftMaxNum) {
      return;
    }

    checkedTdNodes = [];

    for (let i = 0; i < allTrNodes.length; i++) {
      const itemTrNode = allTrNodes[i];
      if (props.outputFormat === 'side-by-side') {
        checkedTdNodes.push(...addCommentCheckedForDouble(itemTrNode, leftMinNum, leftMaxNum, rightMinNum, rightMaxNum));
      } else {
        checkedTdNodes.push(...addCommentCheckedForSingle(itemTrNode, leftMinNum, leftMaxNum, rightMinNum, rightMaxNum));
      }
    }
  };

  watch(
    [() => props.outputFormat, () => props.allowChecked],
    () => {
      if (props.allowChecked && props.outputFormat === 'side-by-side') {
        const container = document.createElement('div');
        parseCodeToSingle(container, props.diff, props.options);
        leftRightLineNumberArr = getLineNumberMap(Array.from(container.querySelectorAll('tr')));
      }
    },
    { immediate: true }
  );

  return { onMousedown, updateLineNumberMap, getCheckedLineDetails, clearCommentClass, updateCheckedLine };
}
