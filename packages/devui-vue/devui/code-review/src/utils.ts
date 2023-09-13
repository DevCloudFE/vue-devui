import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui';
import type { OutputFormat, ExpandDirection, LineSide, IncrementCodeInsertDirection } from './code-review-types';
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

// 解析diff
export function parseDiffCode(container: HTMLElement, code: string, outputFormat: OutputFormat, isAddCode = false) {
  const diff2HtmlUi = new Diff2HtmlUI(container, code, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: outputFormat,
    highlight: true,
    rawTemplates: TemplateMap[outputFormat],
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
      const leftTdList = trList[i].match(TableTdReg);
      const rightTdList = trList[i + offset].match(TableTdReg);
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
