import type { OutputFormat, ExpandDirection, LineSide } from './code-review-types';
import { UpExpandIcon, DownExpandIcon, AllExpandIcon } from './components/code-review-icons';

export function notEmptyNode(node: HTMLElement) {
  const classes = node.classList;
  return !classes.contains('d2h-info') && !classes.contains('d2h-emptyplaceholder') && !classes.contains('comment-cell');
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
