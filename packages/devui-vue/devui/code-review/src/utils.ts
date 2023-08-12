import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui';
import type { OutputFormat, ExpandDirection, LineSide, IncrementCodeInsertDirection } from './code-review-types';
import { UpExpandIcon, DownExpandIcon, AllExpandIcon } from './components/code-review-icons';
import { ExpandLineReg } from './const';

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
  // 过滤有效代码行
  const trNodesToBeInserted = trNodes.filter((element) => element.children[0].children.length === 2);
  if (direction === 'up') {
    // 插入向上展开获取的增量代码
    const nextSibling = referenceDom.nextElementSibling as HTMLElement;
    trNodesToBeInserted.forEach((item) => {
      referenceDom.parentNode?.insertBefore(item, nextSibling);
    });
  } else {
    // 插入向下展开获取的增量代码
    trNodesToBeInserted.forEach((item) => {
      referenceDom.parentNode?.insertBefore(item, referenceDom);
    });
  }
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
    const nextLeftLineNumber = parseInt((nextSibling?.children?.[0].children?.[0] as HTMLElement)?.innerText);
    const nextRightLineNumber = parseInt((nextSibling?.children?.[0].children?.[1] as HTMLElement)?.innerText);
    if (leftLineNumber + addedLine === nextLeftLineNumber && rightLineNumber + addedLine === nextRightLineNumber) {
      expandDom.remove();
      return true;
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
export function parseDiffCode(container: HTMLElement, code: string, outputFormat: OutputFormat) {
  const diff2HtmlUi = new Diff2HtmlUI(container, code, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: outputFormat,
    highlight: true,
  });
  diff2HtmlUi.draw();
  diff2HtmlUi.highlightCode();
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
  更新展开行边界数据到 tr 节点的 data-set 上
  trNode: 展开按钮所在的 tr 节点
  expandAllThreshold: 阈值
  position: 展开按钮所在位置，top第一行 | bottom末尾行 | middle中间行
  updateExpandButton: 是否需要更新中间行展开按钮为全部展开，插入增量代码后更新，初始化不更新
*/
export function updateLineNumberInDataset(
  trNode: HTMLElement,
  expandAllThreshold: number,
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
    prevL = Math.max(nextL - expandAllThreshold + 1, 1);
    nextR = parseInt((nextLineNode.children[0].children[1] as HTMLElement).innerText) - 1;
    prevR = Math.max(nextR - expandAllThreshold + 1, 1);
  } else if (position === 'bottom') {
    const prevLineNode = trNode.previousElementSibling as HTMLElement;
    prevL = parseInt((prevLineNode.children[0].children[0] as HTMLElement).innerText) + 1;
    nextL = prevL + expandAllThreshold - 1;
    prevR = parseInt((prevLineNode.children[0].children[1] as HTMLElement).innerText) + 1;
    nextR = prevR + expandAllThreshold - 1;
  } else {
    const prevLineNode = trNode.previousElementSibling as HTMLElement;
    const nextLineNode = trNode.nextElementSibling as HTMLElement;
    const prevLineNumber = parseInt((prevLineNode.children[0].children[0] as HTMLElement).innerText);
    const nextLineNumber = parseInt((nextLineNode.children[0].children[0] as HTMLElement).innerText);
    prevL = prevLineNumber + 1;
    prevR = parseInt((prevLineNode.children[0].children[1] as HTMLElement).innerText) + 1;
    nextL = nextLineNumber - 1;
    nextR = parseInt((nextLineNode.children[0].children[1] as HTMLElement).innerText) - 1;
    const isExpandAll = nextLineNumber - prevLineNumber <= expandAllThreshold;
    if (isExpandAll && updateExpandButton) {
      updateExpandUpDownButton(trNode);
    }
  }
  setLineNumberInDataset(trNode, prevL, prevR, nextL, nextR);
}

/*
  从展开按钮所在 tr 节点的 date-set 上获取展开行数据
  expandDom: tr节点
  expandAllThreshold: 阈值
*/
export function getLineNumberFormDataset(expandDom: HTMLElement, expandAllThreshold: number) {
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
      leftLineStart = Math.max(leftLineEnd - expandAllThreshold + 1, prevL);
      rightLineEnd = nextR;
      rightLineStart = Math.max(rightLineEnd - expandAllThreshold + 1, prevR);
    } else if (direction === 'down') {
      leftLineStart = prevL;
      leftLineEnd = Math.min(leftLineStart + expandAllThreshold - 1, nextL);
      rightLineStart = prevR;
      rightLineEnd = Math.min(rightLineStart + expandAllThreshold - 1, nextR);
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

// 添加评论到页面
export function addCommentToPage(lineHost: HTMLElement, commentDom: HTMLElement, lineSide: LineSide) {
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
