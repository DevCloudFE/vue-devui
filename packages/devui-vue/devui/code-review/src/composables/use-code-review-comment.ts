import { ref, toRefs, onUnmounted, watch } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { useCodeReviewLineSelection } from './use-code-review-line-selection';
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
  const { outputFormat, allowComment, allowChecked } = toRefs(props);
  const ns = useNamespace('code-review');
  const { onMousedown } = useCodeReviewLineSelection(reviewContentRef, props, updateLineNumbers, updateLineNumbers);
  const commentLeft = ref(-100);
  const commentTop = ref(-100);
  let currentLeftLineNumber = -1;
  let currentRightLineNumber = -1;
  let lastLineNumberContainer: HTMLElement | null;
  let checkedLineNumberContainer: Array<Element> = [];
  let currentLeftLineNumbers: Array<number> = [];
  let currentRightLineNumbers: Array<number> = [];
  let checkedLineCodeString: Array<string> | Record<string, Array<string>> = {};
  watch(
    () => outputFormat.value,
    () => {
      // 如果出现单栏双栏切换则需要重置选中
      checkedLineNumberContainer = [];
      currentLeftLineNumbers = [];
      currentRightLineNumbers = [];
      checkedLineCodeString = [];
    }
  );
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
  // 获代码行 取值方法
  const getLineNumbers = (currentNumber: number, currentNumbers: Array<number>) => {
    if (currentNumber === -1) {
      // 当前行没数据不代表之前选中的没数据，此时返回原来的
      return currentNumbers;
    }
    if (currentNumbers.length === 0) {
      return [currentNumber];
    }
    const numbers = [...currentNumbers];
    let max = Math.max(...numbers);
    let min = Math.min(...numbers);
    if (currentNumber < min) {
      min = currentNumber;
    }
    if (currentNumber > max) {
      max = currentNumber;
    }
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  };
  // 获取一些公共类和判断
  const getCommonClassAndJudge = () => {
    const lineClassName = props.outputFormat === 'line-by-line' ? '.d2h-code-linenumber' : '.d2h-code-side-linenumber';
    const linenumberDom = reviewContentRef.value.querySelectorAll(lineClassName);
    const checkedLine = [currentLeftLineNumbers, currentRightLineNumbers];
    return {
      linenumberDom,
      checkedLine,
    };
  };
  // 之前每次都先移出所有选中的方法过于浪费性能，增加具体dom节点选中方法(防重复添加)
  const addCommentCheckedClass = (Dom: Element) => {
    !Dom.classList.contains('comment-checked') && Dom.classList.add('comment-checked');
  };
  // 单栏
  function getSingleCheckedLineCode(shouldRenderClass: boolean) {
    const { linenumberDom, checkedLine } = getCommonClassAndJudge();
    const checkedCodeContent = [];
    for (let i = 0; i < linenumberDom.length; i++) {
      const lineNumberDomLeft = linenumberDom[i].children[0];
      const lineNumberDomRight = linenumberDom[i].children[1];
      if (lineNumberDomLeft || lineNumberDomRight) {
        const codeLineNumberLeft = parseInt((lineNumberDomLeft as HTMLElement)?.innerText);
        const codeLineNumberRight = parseInt((lineNumberDomRight as HTMLElement)?.innerText);
        // 因为存在左边或者右边为空的num所以两边都要循环，但是同一个dom已经过就不需要再赋予
        if (checkedLine[0].includes(codeLineNumberLeft) || checkedLine[1].includes(codeLineNumberRight)) {
          checkedLineNumberContainer.push(linenumberDom[i]);
          // 两个节点之间可能间隔文本节点
          const codeNode = linenumberDom[i].nextElementSibling as HTMLElement;
          checkedCodeContent.push(codeNode?.innerText);
          if (shouldRenderClass) {
            addCommentCheckedClass(linenumberDom[i]);
            addCommentCheckedClass(codeNode);
          }
        }
      }
    }
    checkedLineCodeString = checkedCodeContent;
  }
  // 双栏
  function getDoubleCheckedLineCode(shouldRenderClass: boolean) {
    const { linenumberDom, checkedLine } = getCommonClassAndJudge();
    const checkedCodeContentLeft = [];
    const checkedCodeContentRight = [];

    function checkedFunc(Dom: Element) {
      checkedLineNumberContainer.push(Dom);
      const codeNode = Dom.nextElementSibling as HTMLElement;
      if (shouldRenderClass) {
        addCommentCheckedClass(Dom);
        addCommentCheckedClass(codeNode);
      }
      return codeNode?.innerText;
    }

    for (let i = 0; i < linenumberDom.length; i++) {
      // 左右双栏一起遍历
      const codeLineNumber = parseInt(linenumberDom[i]?.innerHTML);
      if (linenumberDom[i].classList.contains('d-code-left') && checkedLine[0].includes(codeLineNumber)) {
        const lineNumText = checkedFunc(linenumberDom[i]);
        checkedCodeContentLeft.push(lineNumText);
        continue;
      }
      if (linenumberDom[i].classList.contains('d-code-right') && checkedLine[1].includes(codeLineNumber)) {
        const lineNumText = checkedFunc(linenumberDom[i]);
        checkedCodeContentRight.push(lineNumText);
      }
    }
    checkedLineCodeString = { leftCode: checkedCodeContentLeft, rightCode: checkedCodeContentRight };
  }
  function getCheckedLineCode(shouldRenderClass: boolean) {
    if (props.outputFormat === 'line-by-line') {
      return getSingleCheckedLineCode(shouldRenderClass);
    }
    getDoubleCheckedLineCode(shouldRenderClass);
  }
  function updateLineNumbers() {
    currentLeftLineNumbers =
      currentLeftLineNumber === -1 ? currentLeftLineNumbers : getLineNumbers(currentLeftLineNumber, currentLeftLineNumbers);
    currentRightLineNumbers =
      currentRightLineNumber === -1 ? currentRightLineNumbers : getLineNumbers(currentRightLineNumber, currentRightLineNumbers);
    getCheckedLineCode(false);
  }
  const updateCheckedLineClass = () => {
    getCheckedLineCode(true);
  };
  // 还原样式
  const resetCommentClass = () => {
    for (let i = 0; i < checkedLineNumberContainer.length; i++) {
      checkedLineNumberContainer[i].classList.remove('comment-checked');
      const codeNode = checkedLineNumberContainer[i].nextElementSibling;
      (codeNode as HTMLElement)?.classList.remove('comment-checked');
    }
    checkedLineNumberContainer = [];
  };
  // 点击
  const commentClick = () => {
    interface recordType {
      left: number;
      right: number;
      details?: {
        lefts: Array<number>;
        rights: Array<number>;
        codes: Record<string, Array<string>> | Record<string, Array<number>>;
      };
    }
    let obj: recordType = { left: currentLeftLineNumber, right: currentRightLineNumber };
    if ((currentLeftLineNumbers.length >= 1 || currentRightLineNumbers.length >= 1) && allowChecked.value) {
      // 选中模式
      const maxCurrentLeftLineNumber = currentLeftLineNumbers[currentLeftLineNumbers.length - 1];
      const maxCurrentRightLineNumber = currentRightLineNumbers[currentRightLineNumbers.length - 1];
      if (maxCurrentLeftLineNumber === currentLeftLineNumber || maxCurrentRightLineNumber === currentRightLineNumber) {
        // 点击添加评论图标触发的事件
        obj = {
          left: currentLeftLineNumber,
          right: currentRightLineNumber,
          details: {
            lefts: currentLeftLineNumbers,
            rights: currentRightLineNumbers,
            codes: checkedLineCodeString,
          },
        };
      } else {
        currentLeftLineNumbers = [];
        currentRightLineNumbers = [];
        resetCommentClass();
      }
    }
    // 点击添加评论图标触发的事件
    ctx.emit('addComment', obj);
  };
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
    currentLeftLineNumbers = [];
    currentRightLineNumbers = [];
    checkedLineCodeString = [];
    resetCommentClass();
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
    updateCheckedLineClass,
    clearCheckedLines,
    onCommentMouseLeave,
    onCommentIconClick,
    insertComment,
    removeComment,
  };
}
