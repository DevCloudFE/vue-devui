import { ref, toRefs, onUnmounted, watch } from 'vue';
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
  const { outputFormat, allowComment, allowChecked } = toRefs(props);
  const ns = useNamespace('code-review');
  const commentLeft = ref(-100);
  const commentTop = ref(-100);
  let currentLeftLineNumber = -1;
  let currentRightLineNumber = -1;
  let lastLineNumberContainer: HTMLElement | null;
  let checkedLineNumberContainer: Array<Element> = [];
  let isShift = false;
  let currentLeftLineNumbers: Array<number> = [];
  let currentRightLineNumbers: Array<number> = [];
  let checkedLineCodeString: Array<string> | Record<string, Array<string>> = {};
  watch(() => outputFormat.value, () => {
    // 如果出现单栏双栏切换则需要重置选中
    checkedLineNumberContainer = [];
    currentLeftLineNumbers = [];
    currentRightLineNumbers = [];
    checkedLineCodeString = [];
  });
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
  function commentKeyDown(e: any) {
    // keyCode已经被废弃了 用e.key代替 或者e.code代替
    switch (e.key) {
    case 'Shift':
      isShift = true;
      break;
    }
  }
  function commentKeyUp(e: any) {
    e.preventDefault();
    switch (e.key) {
    case 'Shift':
      isShift = false;
      break;
    }
  }
  // 销毁键盘事件
  const unCommentKeyDown = () => {
    document.removeEventListener('keydown', commentKeyDown);
    document.removeEventListener('keyup', commentKeyUp);
  };
  // 键盘事件
  const onCommentKeyDown = () => {
    document.addEventListener('keydown', commentKeyDown);
    document.addEventListener('keyup', commentKeyUp);
  };
  // 获代码行 取值方法
  const getLineNumbers = (currentNumber: number, currentNumbers: Array<number>, e: Event) => {
    if (currentNumber === -1) { // 当前行没数据不代表之前选中的没数据，此时返回原来的
      return currentNumbers;
    }
    if (currentNumbers.length === 0) {
      return [currentNumber];
    }
    const numbers = [...currentNumbers];
    let max = Math.max(...numbers);
    const min = Math.min(...numbers);
    if (currentNumber > max) { // 限制规则只能从小选到大。
      max = currentNumber;
    }
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  };
  // 获取一些公共类和判断
  const getCommonClassAndJudge = (side: string) => {
    const lineClassName = side === 'line-by-line' ? '.d2h-code-linenumber' : '.d2h-code-side-linenumber';
    const linenumberDom = reviewContentRef.value.querySelectorAll(lineClassName);
    const checkedLine = [currentLeftLineNumbers, currentRightLineNumbers];
    return {
      linenumberDom,
      checkedLine
    };
  };
  // 之前每次都先移出所有选中的方法过于浪费性能，增加具体dom节点选中方法(防重复添加)
  const addCommentCheckedClass = (Dom: Element) => {
    !Dom.classList.contains('comment-checked') &&  Dom.classList.add('comment-checked');
  };
  // 选中（单栏）
  const addCommentClassSingle = (side: string) => {
    const { linenumberDom, checkedLine } = getCommonClassAndJudge(side);
    const checkedCodeContent = [];
    // resetCommentClass();
    for (let i = 0; i < linenumberDom.length; i++) {
      const lineNumberDomLeft = linenumberDom[i].children[0];
      const lineNumberDomRight = linenumberDom[i].children[1];
      if (lineNumberDomLeft || lineNumberDomRight) {
        const codeLineNumberLeft = parseInt((lineNumberDomLeft  as HTMLElement)?.innerText);
        const codeLineNumberRight = parseInt((lineNumberDomRight  as HTMLElement)?.innerText);
        // 因为存在左边或者右边为空的num所以两边都要循环，但是同一个dom已经过就不需要再赋予
        if (checkedLine[0].includes(codeLineNumberLeft) || checkedLine[1].includes(codeLineNumberRight)) {
          checkedLineNumberContainer.push(linenumberDom[i]);
          // 两个节点之间可能间隔文本节点
          const codeNode = (linenumberDom[i].nextSibling as HTMLElement).nodeName === '#text'
            ? (linenumberDom[i].nextSibling as HTMLElement).nextSibling
            : linenumberDom[i].nextSibling;
          checkedCodeContent.push((codeNode as HTMLElement)?.innerText);
          addCommentCheckedClass(linenumberDom[i]);
          addCommentCheckedClass(codeNode as HTMLElement);
        }
      }
    }
    checkedLineCodeString = checkedCodeContent;
  };
  // 选中（双栏）
  const addCommentClassDouble = (side: string) => {
    const { linenumberDom, checkedLine } = getCommonClassAndJudge(side);
    const checkedCodeContentLeft = [];
    const checkedCodeContentRight = [];

    function checkedFunc(Dom: Element) {
      checkedLineNumberContainer.push(Dom);
      const codeNode = (Dom.nextSibling as HTMLElement).nodeName === '#text'
        ? (Dom.nextSibling as HTMLElement).nextSibling
        : Dom.nextSibling;
      addCommentCheckedClass(Dom);
      addCommentCheckedClass(codeNode as HTMLElement);
      return (codeNode as HTMLElement)?.innerText;
    }

    for (let i = 0; i < linenumberDom.length; i++) { // 左右双栏一起遍历
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
  };
  const updateCheckedLineClass = () => {
    if (outputFormat.value === 'line-by-line') {
      addCommentClassSingle(outputFormat.value);
      return;
    }
    addCommentClassDouble(outputFormat.value);
  };
  // 还原样式
  const resetCommentClass = () => {
    for (let i = 0; i < checkedLineNumberContainer.length; i++) {
      checkedLineNumberContainer[i].classList.remove('comment-checked');
      const codeNode = (checkedLineNumberContainer[i].nextSibling as HTMLElement).nodeName === '#text'
        ? (checkedLineNumberContainer[i].nextSibling as HTMLElement).nextSibling
        : checkedLineNumberContainer[i].nextSibling;
      (codeNode as HTMLElement)?.classList.remove('comment-checked');
    }
    checkedLineNumberContainer = [];
  };
  // 按住shift键点击
  const commentShiftClick = (e: Event) => {
    currentLeftLineNumbers = currentLeftLineNumber === -1
      ? currentLeftLineNumbers
      : getLineNumbers(currentLeftLineNumber, currentLeftLineNumbers, e);
    currentRightLineNumbers = currentRightLineNumber === -1
      ? currentRightLineNumbers
      : getLineNumbers(currentRightLineNumber, currentRightLineNumbers, e);
    updateCheckedLineClass();
  };
  // 点击
  const commentClick = (e: Event) => {
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
    if (currentLeftLineNumbers.length >= 1 || currentRightLineNumbers.length >= 1 && allowChecked.value) { // 选中模式
      const maxCurrentLeftLineNumber = currentLeftLineNumbers[currentLeftLineNumbers.length - 1];
      const maxCurrentRightLineNumber = currentRightLineNumbers[currentRightLineNumbers.length - 1];
      if (maxCurrentLeftLineNumber === currentLeftLineNumber || maxCurrentRightLineNumber === currentRightLineNumber) {
        // 点击添加评论图标触发的事件
        obj = { left: currentLeftLineNumber, right: currentRightLineNumber, details: {
          lefts: currentLeftLineNumbers, rights: currentRightLineNumbers, codes: checkedLineCodeString
        }};
      } else{
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
    if (e) { // 根据时间反回的dom判断是否点击中的制定区域
      const composedPath = e.composedPath() as HTMLElement[];
      const lineNumberBox = composedPath.find(
        (item) => item.classList?.contains('comment-icon-hover') || item.classList?.contains('comment-icon')
      );
      if (!lineNumberBox) {
        return;
      }
    }
    // 按住shift键选中
    if (isShift && allowChecked.value) {
      commentShiftClick(e);
      return;
    }
    commentClick(e);
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
    // currentLeftLineNumbers,
    // currentRightLineNumbers,
    updateCheckedLineClass,
    onCommentMouseLeave,
    onCommentIconClick,
    onCommentKeyDown,
    unCommentKeyDown,
    insertComment,
    removeComment,
  };
}
