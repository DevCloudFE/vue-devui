import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui';
import type {
  OutputFormat,
  ExpandDirection,
  LineSide,
  IncrementCodeInsertDirection,
  CommentPosition,
  ILineNumberTdMap,
} from './code-review-types';
import { UpExpandIcon, DownExpandIcon, AllExpandIcon } from './components/code-review-icons';
import { ExpandLineReg, TemplateMap, TableTrReg, TableTdReg, TableTbodyReg, TableTbodyAttrReg, EmptyDataLangReg } from './const';

export function notEmptyNode(node: HTMLElement) {
  const classes = node.classList;
  return !classes.contains('d2h-info') && !classes.contains('d2h-emptyplaceholder') && !classes.contains('comment-cell');
}

/*
  插入增量代码
  referenceDom: 参考行
  trNodes: 增量代码集合
  direction: 增量代码插入方向
*/
export function insertIncrementLineToPage(
  referenceDom: HTMLElement,
  trNodes: HTMLTableRowElement[],
  direction: IncrementCodeInsertDirection
) {
  if (direction === 'up') {
    // 插入向上展开获取的增量代码
    const nextSibling = referenceDom.nextElementSibling as HTMLElement;
    trNodes.forEach((item) => {
      referenceDom.parentNode?.insertBefore(item, nextSibling);
    });
  } else {
    // 插入向下展开获取的增量代码
    trNodes.forEach((item) => {
      referenceDom.parentNode?.insertBefore(item, referenceDom);
    });
  }
}

/*
  针对双栏模式，判断是否移除展开行节点，当第一行代码出现和展开行上下两行相连，需移除展开行
  expandDom: 当前展开行节点
  newExpandDom: 增量代码中，保存 @@ -x,x +y,y @@ 格式数据的节点
  direction: 增量代码插入方向
*/
export function ifRemoveExpandLineForDoubleColumn(
  expandDom: HTMLElement,
  newExpandDom: HTMLTableRowElement,
  direction: IncrementCodeInsertDirection
) {
  const matches = (newExpandDom.children[1] as HTMLElement).innerText.trim().match(ExpandLineReg);
  if (!matches) {
    return true;
  }
  const leftLineNumber = parseInt(matches[1]);
  const addedLine = parseInt(matches[2]);
  const rightLineNumber = parseInt(matches[3]);
  if (direction === 'up') {
    const prevSibling = expandDom.previousElementSibling;
    if (!prevSibling) {
      // 向上展开在第一行
      if (leftLineNumber === 1 && rightLineNumber === 1) {
        expandDom?.remove();
        return true;
      }
    } else {
      // 向上展开在中间行
      const prevLeftLineNumber = parseInt((prevSibling.children?.[0] as HTMLElement)?.innerText);
      const prevRightLineNumber = parseInt((prevSibling.children?.[2] as HTMLElement)?.innerText);
      if (leftLineNumber === prevLeftLineNumber + 1 && rightLineNumber === prevRightLineNumber + 1) {
        expandDom.remove();
        return true;
      }
    }
  } else {
    const nextSibling = expandDom.nextElementSibling;
    if (nextSibling) {
      const nextLeftLineNumber = parseInt((nextSibling?.children?.[0] as HTMLElement)?.innerText);
      const nextRightLineNumber = parseInt((nextSibling?.children?.[2] as HTMLElement)?.innerText);
      if (leftLineNumber + addedLine === nextLeftLineNumber && rightLineNumber + addedLine === nextRightLineNumber) {
        expandDom.remove();
        return true;
      }
    }
  }
  return false;
}

/*
  判断是否移除展开行节点，当第一行代码出现和展开行上下两行相连，需移除展开行
  expandDom: 当前展开行节点
  newExpandDom: 增量代码中，保存 @@ -x,x +y,y @@ 格式数据的节点
  direction: 增量代码插入方向
*/
export function ifRemoveExpandLine(expandDom: HTMLElement, newExpandDom: HTMLTableRowElement, direction: IncrementCodeInsertDirection) {
  const matches = (newExpandDom.children[1] as HTMLElement).innerText.trim().match(ExpandLineReg);
  if (!matches) {
    return true;
  }
  const leftLineNumber = parseInt(matches[1]);
  const addedLine = parseInt(matches[2]);
  const rightLineNumber = parseInt(matches[3]);
  if (direction === 'up') {
    const prevSibling = expandDom.previousElementSibling;
    if (!prevSibling) {
      // 向上展开在第一行
      if (leftLineNumber === 1 && rightLineNumber === 1) {
        expandDom?.remove();
        return true;
      }
    } else {
      // 向上展开在中间行
      const prevLeftLineNumber = parseInt((prevSibling.children?.[0].children?.[0] as HTMLElement)?.innerText);
      const prevRightLineNumber = parseInt((prevSibling.children?.[0].children?.[1] as HTMLElement)?.innerText);
      if (leftLineNumber === prevLeftLineNumber + 1 && rightLineNumber === prevRightLineNumber + 1) {
        expandDom.remove();
        return true;
      }
    }
  } else {
    const nextSibling = expandDom.nextElementSibling;
    if (nextSibling) {
      const nextLeftLineNumber = parseInt((nextSibling?.children?.[0].children?.[0] as HTMLElement)?.innerText);
      const nextRightLineNumber = parseInt((nextSibling?.children?.[0].children?.[1] as HTMLElement)?.innerText);
      if (leftLineNumber + addedLine === nextLeftLineNumber && rightLineNumber + addedLine === nextRightLineNumber) {
        expandDom.remove();
        return true;
      }
    }
  }
  return false;
}

/*
  插入增量代码后，将增量代码中保存的数据更新到当前展开行上面，数据格式：@@ -x,x +y,y @@
  expandDom: 当前展开行节点，保存了 @@ -x,x +y,y @@ 格式的相关数据
  newExpandDom: 增量代码中，保存 @@ -x,x +y,y @@ 格式数据的节点
*/
export function updateExpandLineCount(expandDom: HTMLElement, newExpandDom: HTMLElement) {
  if (!expandDom.nextElementSibling) {
    return;
  }
  const curMatches = (expandDom.children[1] as HTMLElement).innerText.trim().match(ExpandLineReg);
  const newMatches = (newExpandDom.children[1] as HTMLElement).innerText.trim().match(ExpandLineReg);
  const newChangedNumLeft = parseInt(curMatches?.[2] || '') + parseInt(newMatches?.[2] || '');
  const newChangedNumRight = parseInt(curMatches?.[4] || '') + parseInt(newMatches?.[4] || '');
  (expandDom.children[1].children[0] as HTMLElement).innerText = `@@ -${newMatches?.[1] || 0},${newChangedNumLeft} +${
    newMatches?.[3] || 0
  },${newChangedNumRight} @@`;
}

// 左右分栏时增加额外的class来区分左右模块
function addClassToDiffCode(codeStrArr: RegExpMatchArray | null, theClassName: string) {
  if (!codeStrArr || codeStrArr.length === 0) {
    return null;
  }
  const newArray = codeStrArr.map((item: string) => {
    const classNames = item?.match(/class="([^"]+)"/)[1].split(' ');
    classNames.push(theClassName);
    return item.replace(/class="([^"]+)"/, `class="${classNames.join(' ')}"`);
  });
  return newArray as RegExpMatchArray;
}

// 解析diff
export function parseDiffCode(
  container: HTMLElement,
  code: string,
  outputFormat: OutputFormat,
  options: Record<string, any>,
  isAddCode = false
) {
  const diff2HtmlUi = new Diff2HtmlUI(container, code, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: outputFormat,
    highlight: true,
    rawTemplates: TemplateMap[outputFormat],
    ...options,
  });
  if (outputFormat === 'side-by-side') {
    let diffHtmlStr = diff2HtmlUi.diffHtml;
    if (diffHtmlStr.match(EmptyDataLangReg) && isAddCode) {
      diffHtmlStr = diffHtmlStr.replace(EmptyDataLangReg, '');
    }
    const trList = diffHtmlStr.match(TableTrReg) as RegExpMatchArray;
    const trListLength = trList.length;
    let newTrStr = '';
    const offset = trListLength / 2;
    for (let i = 0; i < trListLength / 2; i++) {
      let leftTdList = trList[i].match(TableTdReg);
      let rightTdList = trList[i + offset].match(TableTdReg);
      leftTdList = addClassToDiffCode(leftTdList, 'd-code-left');
      rightTdList = addClassToDiffCode(rightTdList, 'd-code-right');
      newTrStr += `<tr>${leftTdList?.join('')}${rightTdList?.join('')}</tr>`;
    }
    const tbodyAttr = diffHtmlStr.match(TableTbodyAttrReg)?.[1] || '';
    const emptyDiffHtmlStr = diffHtmlStr.replace(TableTbodyReg, `<tbody${tbodyAttr}></tbody>`);
    const index = emptyDiffHtmlStr.indexOf(`<tbody${tbodyAttr}>`);
    const newDiffHtmlStr = emptyDiffHtmlStr.slice(0, index) + newTrStr + emptyDiffHtmlStr.slice(index);
    diff2HtmlUi.diffHtml = newDiffHtmlStr;
  }
  diff2HtmlUi.draw();
}

/*
  添加展开行数据到 tr 节点的 data-set 上
  trNode: tr 节点
  prevL: 左侧上边界
  prevR: 右侧上边界
  nextL: 左侧下边界
  nextR: 右侧下边界
*/
export function setLineNumberInDataset(trNode: HTMLElement, prevL: number, prevR: number, nextL: number, nextR: number) {
  if (trNode) {
    trNode.classList.add('expand-line');
    trNode.dataset.prevL = String(prevL);
    trNode.dataset.prevR = String(prevR);
    trNode.dataset.nextL = String(nextL);
    trNode.dataset.nextR = String(nextR);
  }
}

// 中间行展开后，折叠行数小于阈值时，将向上向下展开按钮更新为全部展开
export function updateExpandUpDownButton(trNode: HTMLElement) {
  trNode.children[0].children[0].remove();
  trNode.children[0].children[0].classList.remove('up-expand');
  trNode.children[0].children[0].classList.add('all-expand');
  trNode.children[0].children[0].innerHTML = AllExpandIcon();
}

/*
  针对双栏模式，更新展开行边界数据到 tr 节点的 data-set 上
  trNode: 展开按钮所在的 tr 节点
  expandThreshold: 阈值
  position: 展开按钮所在位置，top第一行 | bottom末尾行 | middle中间行
  updateExpandButton: 是否需要更新中间行展开按钮为全部展开，插入增量代码后更新，初始化不更新
*/
export function updateLineNumberInDatasetForDoubleColumn(
  trNode: HTMLElement,
  expandThreshold: number,
  position: 'top' | 'bottom' | 'middle',
  updateExpandButton = false
) {
  let nextL: number;
  let prevL: number;
  let nextR: number;
  let prevR: number;
  if (position === 'top') {
    const nextLineNode = trNode.nextElementSibling as HTMLElement;
    nextL = parseInt((nextLineNode.children[0] as HTMLElement).innerText) - 1;
    prevL = Math.max(nextL - expandThreshold + 1, 1);
    nextR = parseInt((nextLineNode.children[2] as HTMLElement).innerText) - 1;
    prevR = Math.max(nextR - expandThreshold + 1, 1);
  } else if (position === 'bottom') {
    const prevLineNode = trNode.previousElementSibling as HTMLElement;
    prevL = parseInt((prevLineNode?.children[0] as HTMLElement)?.innerText) + 1;
    nextL = prevL + expandThreshold - 1;
    prevR = parseInt((prevLineNode?.children[2] as HTMLElement)?.innerText) + 1;
    nextR = prevR + expandThreshold - 1;
  } else {
    const prevLineNode = trNode.previousElementSibling as HTMLElement;
    const nextLineNode = trNode.nextElementSibling as HTMLElement;
    const prevLineNumber = parseInt((prevLineNode.children[0] as HTMLElement).innerText);
    const nextLineNumber = parseInt((nextLineNode.children[0] as HTMLElement).innerText);
    prevL = prevLineNumber + 1;
    prevR = parseInt((prevLineNode.children[2] as HTMLElement).innerText) + 1;
    nextL = nextLineNumber - 1;
    nextR = parseInt((nextLineNode.children[2] as HTMLElement).innerText) - 1;
    const isExpandAll = nextLineNumber - prevLineNumber <= expandThreshold;
    if (isExpandAll && updateExpandButton) {
      updateExpandUpDownButton(trNode);
    }
  }
  if (isNaN(prevL) || isNaN(prevR) || isNaN(nextL) || isNaN(nextR)) {
    return false;
  }
  setLineNumberInDataset(trNode, prevL, prevR, nextL, nextR);
  return true;
}

/*
  针对单栏模式，更新展开行边界数据到 tr 节点的 data-set 上
  trNode: 展开按钮所在的 tr 节点
  expandThreshold: 阈值
  position: 展开按钮所在位置，top第一行 | bottom末尾行 | middle中间行
  updateExpandButton: 是否需要更新中间行展开按钮为全部展开，插入增量代码后更新，初始化不更新
*/
export function updateLineNumberInDataset(
  trNode: HTMLElement,
  expandThreshold: number,
  position: 'top' | 'bottom' | 'middle',
  updateExpandButton = false
) {
  let nextL: number;
  let prevL: number;
  let nextR: number;
  let prevR: number;
  if (position === 'top') {
    const nextLineNode = trNode.nextElementSibling as HTMLElement;
    nextL = parseInt((nextLineNode.children[0].children[0] as HTMLElement).innerText) - 1;
    prevL = Math.max(nextL - expandThreshold + 1, 1);
    nextR = parseInt((nextLineNode.children[0].children[1] as HTMLElement).innerText) - 1;
    prevR = Math.max(nextR - expandThreshold + 1, 1);
  } else if (position === 'bottom') {
    const prevLineNode = trNode.previousElementSibling as HTMLElement;
    prevL = parseInt((prevLineNode?.children[0].children?.[0] as HTMLElement)?.innerText) + 1;
    nextL = prevL + expandThreshold - 1;
    prevR = parseInt((prevLineNode?.children[0].children?.[1] as HTMLElement)?.innerText) + 1;
    nextR = prevR + expandThreshold - 1;
  } else {
    const prevLineNode = trNode.previousElementSibling as HTMLElement;
    const nextLineNode = trNode.nextElementSibling as HTMLElement;
    const prevLineNumber = parseInt((prevLineNode.children[0].children[0] as HTMLElement).innerText);
    const nextLineNumber = parseInt((nextLineNode.children[0].children[0] as HTMLElement).innerText);
    prevL = prevLineNumber + 1;
    prevR = parseInt((prevLineNode.children[0].children[1] as HTMLElement).innerText) + 1;
    nextL = nextLineNumber - 1;
    nextR = parseInt((nextLineNode.children[0].children[1] as HTMLElement).innerText) - 1;
    const isExpandAll = nextLineNumber - prevLineNumber <= expandThreshold;
    if (isExpandAll && updateExpandButton) {
      updateExpandUpDownButton(trNode);
    }
  }
  if (isNaN(prevL) || isNaN(prevR) || isNaN(nextL) || isNaN(nextR)) {
    return false;
  }
  setLineNumberInDataset(trNode, prevL, prevR, nextL, nextR);
  return true;
}

/*
  从展开按钮所在 tr 节点的 date-set 上获取展开行数据
  expandDom: tr节点
  expandThreshold: 阈值
*/
export function getLineNumberFromDataset(expandDom: HTMLElement, expandThreshold: number) {
  const attrsMap = expandDom.parentElement?.parentElement?.dataset;
  const prevL = Number(attrsMap?.prevL);
  const nextL = Number(attrsMap?.nextL);
  const prevR = Number(attrsMap?.prevR);
  const nextR = Number(attrsMap?.nextR);
  let leftLineStart, leftLineEnd, rightLineStart, rightLineEnd;

  if (prevL && nextL && prevR && nextR) {
    const buttonClasses: string[] = Array.from(expandDom.classList);
    const direction = buttonClasses.find((item) => item.endsWith('expand'))?.split('-')[0];
    if (direction === 'up') {
      leftLineEnd = nextL;
      leftLineStart = Math.max(leftLineEnd - expandThreshold + 1, prevL);
      rightLineEnd = nextR;
      rightLineStart = Math.max(rightLineEnd - expandThreshold + 1, prevR);
    } else if (direction === 'down') {
      leftLineStart = prevL;
      leftLineEnd = Math.min(leftLineStart + expandThreshold - 1, nextL);
      rightLineStart = prevR;
      rightLineEnd = Math.min(rightLineStart + expandThreshold - 1, nextR);
    } else {
      leftLineStart = prevL;
      leftLineEnd = nextL;
      rightLineStart = prevR;
      rightLineEnd = nextR;
    }
  }
  return [leftLineStart, leftLineEnd, rightLineStart, rightLineEnd];
}

export function insertNode(parent: HTMLElement, child: HTMLElement) {
  if (parent.firstChild) {
    parent.insertBefore(child, parent.firstChild);
  } else {
    parent.appendChild(child);
  }
}

export function addExpandButton(parentNode: HTMLElement, className: string, icon: string) {
  const expandButton = document.createElement('div');
  expandButton.innerHTML = icon;
  expandButton.classList.add('expand-icon');
  expandButton.classList.add(className);
  insertNode(parentNode, expandButton);
}

export function attachToggleButton(dom: HTMLElement, outputFormat: OutputFormat) {
  const toggleButton = document.createElement('div');
  const commentIcon = document.createElement('span');
  commentIcon.classList.add('add-comment-icon');
  toggleButton.appendChild(commentIcon);
  toggleButton.classList.add('toggle-button');
  toggleButton.classList.add(outputFormat);
  insertNode(dom, toggleButton);
}

// 添加展开行按钮
export function attachExpandUpDownButton(parentNode: HTMLElement, direction: ExpandDirection) {
  const expandDirectionMap: Partial<Record<ExpandDirection, string>> = {
    up: 'up-expand',
    down: 'down-expand',
    all: 'all-expand',
  };
  const expandDirectionIconMap: Partial<Record<ExpandDirection, () => string>> = {
    up: UpExpandIcon,
    down: DownExpandIcon,
    all: AllExpandIcon,
  };
  parentNode.classList.add('expand-icon-wrapper');
  if (direction === 'updown') {
    addExpandButton(parentNode, 'up-expand', UpExpandIcon());
    addExpandButton(parentNode, 'down-expand', DownExpandIcon());
  } else {
    addExpandButton(parentNode, expandDirectionMap[direction] as string, expandDirectionIconMap[direction]?.() as string);
  }
}

/*
  添加评论到页面，针对单栏模式
  lineHost: 插入在哪行下面
  commentDom: 评论元素
  lineSide: 插入位置，left/right
*/
export function addCommentToPageForSingleColumn(lineHost: HTMLElement, commentDom: HTMLElement, lineSide: LineSide) {
  const newLine = document.createElement('tr');
  const newCell = document.createElement('td');
  newCell.classList.add('comment-cell');
  newCell.style.width = '100%';
  newCell.setAttribute('colspan', '2');
  newCell.appendChild(commentDom);
  newLine.classList.add('comment-block');
  newLine.classList.add(lineSide);
  newLine.appendChild(newCell);
  if (lineHost.nextElementSibling) {
    lineHost.parentElement?.insertBefore(newLine, lineHost.nextElementSibling);
  } else {
    lineHost.parentElement?.appendChild(newLine);
  }
}

/*
  添加评论到页面，针对双栏模式
  lineHost: 插入在哪行下面
  commentDom: 评论元素
  lineSide: 插入位置，left/right
*/
export function addCommentToPageForDoubleColumn(lineHost: HTMLElement, commentDom: HTMLElement, lineSide: LineSide) {
  const nextSibling = lineHost.nextElementSibling;
  if (nextSibling && nextSibling.classList?.contains('comment-block')) {
    const insertTdDom = lineSide === 'left' ? nextSibling.children[0] : nextSibling.children[1];
    insertTdDom.classList.add('comment-cell');
    insertTdDom.appendChild(commentDom);
  } else {
    const newLine = document.createElement('tr');
    const newLeftCell = document.createElement('td');
    const newRightCell = document.createElement('td');
    newLeftCell.style.width = '50%';
    newLeftCell.setAttribute('colspan', '2');
    newRightCell.style.width = '50%';
    newRightCell.setAttribute('colspan', '2');

    if (lineSide === 'left') {
      newLeftCell.classList.add('comment-cell');
      newLeftCell.appendChild(commentDom);
    } else {
      newRightCell.classList.add('comment-cell');
      newRightCell.appendChild(commentDom);
    }
    newLine.classList.add('comment-block');
    newLine.classList.add(lineSide);
    newLine.appendChild(newLeftCell);
    newLine.appendChild(newRightCell);
    if (lineHost.nextElementSibling) {
      lineHost.parentElement?.insertBefore(newLine, lineHost.nextElementSibling);
    } else {
      lineHost.parentElement?.appendChild(newLine);
    }
  }
}

/*
  针对单栏模式查找插入或删除评论时的参考DOM
  parentNode: 父节点
  lineNumber: 插入行
  lineSide: 插入位置，left/right
*/
export function findReferenceDomForSingleColumn(parentNode: HTMLElement, lineNumber: number, lineSide: LineSide) {
  const trNodes = Array.from(parentNode.querySelectorAll('tr'));
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
}

/*
  针对双栏模式查找插入或删除评论时的参考DOM
  parentNode: 父节点
  lineNumber: 插入行
  lineSide: 插入位置，left/right
*/
export function findReferenceDomForDoubleColumn(parentNode: HTMLElement, lineNumber: number, lineSide: LineSide) {
  const trNodes = Array.from(parentNode.querySelectorAll('tr'));
  for (const index in trNodes) {
    const lineIndex = parseInt(index);
    let lineNumberBox: HTMLElement;
    if (lineSide === 'left') {
      lineNumberBox = trNodes[lineIndex].children[0] as HTMLElement;
    } else {
      lineNumberBox = trNodes[lineIndex].children[2] as HTMLElement;
    }
    if (lineNumberBox && notEmptyNode(lineNumberBox)) {
      const currentLineNumber = parseInt(lineNumberBox.innerText);
      if (currentLineNumber === lineNumber) {
        return trNodes[lineIndex];
      }
    }
  }
}

/* 多行选中，根据当前dom节点，向上寻找tr节点 */
export function findParentTrNode(node: HTMLElement | null) {
  if (!node) {
    return null;
  }
  if (node.tagName === 'TR') {
    return node;
  }
  return findParentTrNode(node.parentElement);
}

/* 根据最大最小行号，获取从小到大的完整行号列表 */
function getFullNumberList(min: number, max: number) {
  return Array.from({ length: max - min + 1 }, (_, i) => i + min);
}

/* 拖拽开始时，清除上次的选中行 */
export function clearCommentChecked(checkedTdNodes: HTMLElement[]) {
  for (let i = 0; i < checkedTdNodes.length; i++) {
    checkedTdNodes[i].classList.remove('comment-checked');
  }
}

/* 渲染为单栏模式，用于后续获取左右行号映射 */
export function parseCodeToSingle(container: HTMLElement, code: string, options: Record<string, any>) {
  const diff2HtmlUi = new Diff2HtmlUI(container, code, {
    drawFileList: false,
    outputFormat: 'line-by-line',
    highlight: true,
    rawTemplates: TemplateMap['line-by-line'],
    ...options,
  });
  diff2HtmlUi.draw();
}

function generateNumberTdObj(tdNodes: HTMLElement[]) {
  const lineNumber = parseInt(tdNodes[0].innerText) || -1;
  if (lineNumber !== -1) {
    return { [lineNumber]: tdNodes };
  }
}

/* 获取行号和对应td的映射关系 */
export function getLineNumberTdMap(trNodes: HTMLElement[]) {
  const left: ILineNumberTdMap = {};
  const right: ILineNumberTdMap = {};
  for (let i = 0; i < trNodes.length; i++) {
    const tdNodes = Array.from(trNodes[i].children) as HTMLElement[];
    Object.assign(left, generateNumberTdObj(tdNodes.slice(0, 2)));
    Object.assign(right, generateNumberTdObj(tdNodes.slice(2)));
  }

  return { left, right };
}

/* 获取左右行号映射关系 */
export function getLineNumberMap(trNodes: HTMLElement[]) {
  const result: CommentPosition[] = [];

  for (let i = 0; i < trNodes.length; i++) {
    const lineNumberNodes = trNodes[i].children[0].children; // 行号所在的div
    if (lineNumberNodes.length === 2) {
      const left = parseInt((lineNumberNodes[0] as HTMLElement)?.innerText) || -1;
      const right = parseInt((lineNumberNodes[1] as HTMLElement)?.innerText) || -1;
      result.push({ left, right });
    }
  }

  return result;
}

/* 获取双栏模式下，选中行的左右行号和代码 */
export function getDoubleCheckedNumberAndCodes(checkedTdNodes: HTMLElement[]) {
  const lefts: number[] = [];
  const rights: number[] = [];
  const leftCode: string[] = [];
  const rightCode: string[] = [];
  const leftNumberNodes: HTMLElement[] = [];
  const rightNumberNodes: HTMLElement[] = [];

  for (let i = 0; i < checkedTdNodes.length; i++) {
    const itemTdNode = checkedTdNodes[i];
    if (itemTdNode.classList.contains('d-code-left')) {
      if (itemTdNode.classList.contains('d2h-code-side-linenumber')) {
        leftNumberNodes.push(itemTdNode);
      } else {
        leftCode.push(itemTdNode.innerText);
      }
    } else {
      if (itemTdNode.classList.contains('d2h-code-side-linenumber')) {
        rightNumberNodes.push(itemTdNode);
      } else {
        rightCode.push(itemTdNode.innerText);
      }
    }
  }

  if (leftNumberNodes.length) {
    const leftMinNum = parseInt(leftNumberNodes[0].innerText);
    const leftMaxNum = parseInt(leftNumberNodes[leftNumberNodes.length - 1].innerText);
    lefts.push(...getFullNumberList(leftMinNum, leftMaxNum));
  }
  if (rightNumberNodes.length) {
    const rightMinNum = parseInt(rightNumberNodes[0].innerText);
    const rightMaxNum = parseInt(rightNumberNodes[rightNumberNodes.length - 1].innerText);
    rights.push(...getFullNumberList(rightMinNum, rightMaxNum));
  }

  return { lefts, rights, codes: { leftCode, rightCode } };
}

/* 获取单栏模式下，选中行的左右行号和代码 */
export function getSingleCheckedNumberAndCode(checkedTdNodes: HTMLElement[]) {
  const lefts: number[] = [];
  const rights: number[] = [];
  const codes: string[] = [];
  const leftNumbers: number[] = [];
  const rightNumbers: number[] = [];

  for (let i = 0; i < checkedTdNodes.length; i++) {
    const itemTdNode = checkedTdNodes[i];
    if (itemTdNode.classList.contains('d2h-code-linenumber')) {
      const numberChildren = itemTdNode.children as unknown as HTMLElement[];
      const leftNum = parseInt(numberChildren[0].innerText);
      const rightNum = parseInt(numberChildren[1].innerText);
      !isNaN(leftNum) && leftNumbers.push(leftNum);
      !isNaN(rightNum) && rightNumbers.push(rightNum);
    } else {
      codes.push(itemTdNode.innerText);
    }
  }

  lefts.push(...getFullNumberList(leftNumbers[0], leftNumbers[leftNumbers.length - 1]));
  rights.push(...getFullNumberList(rightNumbers[0], rightNumbers[rightNumbers.length - 1]));

  return { lefts, rights, codes };
}

/* 双栏模式，点击展开行后，为新增的行设置选中样式 */
export function addCommentCheckedForDouble(
  trNode: HTMLElement,
  leftMinNum: number,
  leftMaxNum: number,
  rightMinNum: number,
  rightMaxNum: number
) {
  const [leftNumTd, leftCodeTd, rightNumTd, rightCodeTd] = trNode.children as unknown as HTMLElement[];
  const leftNum = parseInt(leftNumTd.innerText);
  const rightNum = parseInt(rightNumTd.innerText);
  const result: HTMLElement[] = [];

  if (!isNaN(leftNum) && leftNum >= leftMinNum && leftNum <= leftMaxNum) {
    if (!leftNumTd.classList.contains('comment-checked')) {
      leftNumTd.classList.add('comment-checked');
      leftCodeTd.classList.add('comment-checked');
    }
    result.push(leftNumTd, leftCodeTd);
  }
  if (!isNaN(rightNum) && rightNum >= rightMinNum && rightNum <= rightMaxNum) {
    if (!rightNumTd.classList.contains('comment-checked')) {
      rightNumTd.classList.add('comment-checked');
      rightCodeTd.classList.add('comment-checked');
    }
    result.push(rightNumTd, rightCodeTd);
  }

  return result;
}

/* 单栏模式，点击展开行后，为新增的行设置选中样式 */
export function addCommentCheckedForSingle(
  trNode: HTMLElement,
  leftMinNum: number,
  leftMaxNum: number,
  rightMinNum: number,
  rightMaxNum: number
) {
  const [numTd, codeTd] = trNode.children as unknown as HTMLElement[];
  const [leftNumNode, rightNumNode] = numTd.children as unknown as HTMLElement[];
  const leftNum = parseInt(leftNumNode.innerText);
  const rightNum = parseInt(rightNumNode.innerText);
  const result: HTMLElement[] = [];

  if (
    (!isNaN(leftNum) && leftNum >= leftMinNum && leftNum <= leftMaxNum) ||
    (!isNaN(rightNum) && rightNum >= rightMinNum && rightNum <= rightMaxNum)
  ) {
    if (!numTd.classList.contains('comment-checked')) {
      numTd.classList.add('comment-checked');
      codeTd.classList.add('comment-checked');
    }
    result.push(numTd, codeTd);
  }

  return result;
}
