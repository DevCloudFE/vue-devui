import { toRefs } from 'vue';
import type { Ref } from 'vue';
import type { CodeReviewProps, ExpandDirection } from '../code-review-types';
import { ExpandLineReg, FirstLineReg } from '../const';
import {
  attachExpandUpDownButton,
  getLineNumberFormDataset,
  parseDiffCode,
  updateExpandLineCount,
  updateLineNumberInDataset,
  insertIncrementLineToPage,
  ifRemoveExpandLine,
} from '../utils';

export function useCodeReviewExpand(reviewContentRef: Ref<HTMLElement>, props: CodeReviewProps) {
  const { outputFormat, expandAllThreshold, codeLoader } = toRefs(props);

  const processSideBySide = () => {
    const [leftTable, rightTable] = reviewContentRef.value.querySelectorAll('table');
    const trNodes = Array.from(leftTable.querySelectorAll('tr'));
    const totalLines = trNodes.length;
    for (const index in trNodes) {
      const lineIndex = parseInt(index);
      const lineChildren = Array.from(trNodes[lineIndex].children) as HTMLElement[];
      const lineNumberBox = lineChildren[0];
      const lineContentBox = lineChildren[1];
      const lineClassList = lineContentBox.classList.value;
      const lineContent = lineContentBox.innerText.trim();
      if (lineContent.match(ExpandLineReg) && !FirstLineReg.test(lineContent) && lineClassList && lineClassList.includes('d2h-info')) {
        const nextLineIndex = lineIndex + 1;
        const prevLineIndex = lineIndex - 1;
        // 处理expand按钮在第一行的情况，向上展开
        if (lineIndex === 0 && nextLineIndex in trNodes) {
          attachExpandUpDownButton(lineNumberBox, 'up');
        } else if (lineIndex > 0 && lineIndex < totalLines - 1 && nextLineIndex in trNodes && prevLineIndex in trNodes) {
          const preLineChildren = Array.from(trNodes[prevLineIndex].children) as HTMLElement[];
          const nextLineChildren = Array.from(trNodes[nextLineIndex].children) as HTMLElement[];
          const isExpandAll =
            parseInt(nextLineChildren[0].innerText) - parseInt(preLineChildren[0].innerText) - 1 < expandAllThreshold.value;
          attachExpandUpDownButton(lineNumberBox, isExpandAll ? 'all' : 'updown');
        }
      }
    }

    const endLine = trNodes[0].cloneNode(true) as HTMLElement;
    if (Object.prototype.hasOwnProperty.call(endLine.children[0].children, 0)) {
      endLine.children[0].removeChild(endLine.children[0].children[0]);
    }
    (endLine.children[1] as HTMLElement).innerText = '';
    const leftEndLine = endLine.cloneNode(true) as HTMLElement;
    const rightEndLint = endLine.cloneNode(true);
    attachExpandUpDownButton(leftEndLine.children[0] as HTMLElement, 'down');
    leftTable.tBodies[0].appendChild(leftEndLine);
    rightTable.tBodies[0].appendChild(rightEndLint);
  };

  const processLineByLine = () => {
    const trNodes = Array.from(reviewContentRef.value.querySelectorAll('tr'));
    const totalLines = trNodes.length;
    for (const index in trNodes) {
      const lineIndex = parseInt(index);
      const tdNodes = Array.from(trNodes[lineIndex].children) as HTMLElement[];
      const lineNumberBox = tdNodes[0];
      const lineContentBox = tdNodes[1];
      if (!lineContentBox) {
        continue;
      }
      const lineClassList = lineContentBox.classList.value;
      const lineContent = lineContentBox.innerText.trim();
      if (lineContent.match(ExpandLineReg) && !FirstLineReg.test(lineContent) && lineClassList && lineClassList.includes('d2h-info')) {
        const nextLineIndex = lineIndex + 1;
        const prevLineIndex = lineIndex - 1;
        if (lineIndex === 0 && nextLineIndex in trNodes) {
          updateLineNumberInDataset(trNodes[lineIndex], expandAllThreshold.value, 'top');
          attachExpandUpDownButton(lineNumberBox, 'up');
        } else if (lineIndex > 0 && lineIndex < totalLines - 1 && nextLineIndex in trNodes && prevLineIndex in trNodes) {
          const prevTdNodes = Array.from(trNodes[prevLineIndex].children) as HTMLElement[];
          const prevLineNumber = parseInt((prevTdNodes[0].children[0] as HTMLElement).innerText);
          const nextTdNodes = Array.from(trNodes[nextLineIndex].children) as HTMLElement[];
          const nextLineNumber = parseInt((nextTdNodes[0].children[0] as HTMLElement).innerText);
          updateLineNumberInDataset(trNodes[lineIndex], expandAllThreshold.value, 'middle');
          const isExpandAll = nextLineNumber - prevLineNumber <= expandAllThreshold.value;
          attachExpandUpDownButton(lineNumberBox, isExpandAll ? 'all' : 'updown');
        }
      }
    }

    const loadMoreLine = trNodes[0].cloneNode(true) as HTMLTableRowElement;
    loadMoreLine.children[0].removeChild(loadMoreLine.children[0].children[0]);
    (loadMoreLine.children[1] as HTMLElement).innerText = '';
    trNodes[0].parentElement?.appendChild(loadMoreLine);
    updateLineNumberInDataset(loadMoreLine, expandAllThreshold.value, 'bottom');
    attachExpandUpDownButton(loadMoreLine.children[0] as HTMLElement, 'down');
  };

  const insertIncrementCode = (code: string, direction: 'up' | 'down', referenceDom: HTMLElement | null | undefined) => {
    if (!referenceDom) {
      return;
    }
    // 无更新内容，删除展开按钮所在行
    if (!code) {
      return referenceDom?.remove();
    }
    const prefix = '--- updated_at\tJan 1, 2019, 0:0:0 AM\n+++ updated_at\tJan 1, 2019, 0:0:0 AM\n';
    const container = document.createElement('div');
    // 解析code
    parseDiffCode(container, prefix + code, outputFormat.value);

    const trNodes = Array.from(container.querySelectorAll('tr'));
    const expandLine = trNodes.find((element) => (element.children[1] as HTMLElement)?.innerText.trim().match(ExpandLineReg));
    // 不包含 @@ -x,x +y,y @@，视为无效code
    if (!expandLine) {
      return;
    }

    // 将有效代码行插入页面
    insertIncrementLineToPage(referenceDom, trNodes, direction);

    // 判断是否需要移除展开行，代码若已全部展开，不再需要展开行
    const removedExpandLine = ifRemoveExpandLine(referenceDom, expandLine, direction);
    // 已经移除展开行，则不需要更新展开行的内容和边界数据
    if (removedExpandLine) {
      return;
    }

    // 更新展开行内容，@@ -x,x +y,y @@
    updateExpandLineCount(referenceDom, expandLine);

    // 更新展开行节点保存的边界数据
    if (direction === 'up') {
      if (!referenceDom.previousElementSibling) {
        // 向上展开在第一行
        updateLineNumberInDataset(referenceDom, expandAllThreshold.value, 'top');
      } else {
        // 向上展开在中间行
        updateLineNumberInDataset(referenceDom, expandAllThreshold.value, 'middle', true);
      }
    } else {
      if (referenceDom.nextElementSibling) {
        // 向下展开在中间行
        updateLineNumberInDataset(referenceDom, expandAllThreshold.value, 'middle', true);
      } else {
        // 向下展开在末尾
        updateLineNumberInDataset(referenceDom, expandAllThreshold.value, 'bottom');
      }
    }
  };

  const onExpandButtonClick = (e: Event) => {
    const composedPath = e.composedPath() as HTMLElement[];
    const expandIconDom = composedPath.find((element) => element.classList?.contains('expand-icon'));
    if (expandIconDom) {
      const expandDirection = Array.from(expandIconDom.classList)
        .find((item) => item.endsWith('expand'))
        ?.split('-')[0];
      const direction: ExpandDirection = expandDirection === 'up' || expandDirection === 'all' ? 'up' : 'down';
      const [leftLineStart, leftLineEnd, rightLineStart, rightLineEnd] = getLineNumberFormDataset(expandIconDom, expandAllThreshold.value);
      codeLoader?.value?.([leftLineStart, leftLineEnd, rightLineStart, rightLineEnd], (code: string) => {
        insertIncrementCode(code, direction, expandIconDom.parentElement?.parentElement);
      });
    }
  };

  const insertExpandButton = () => {
    outputFormat.value === 'side-by-side' ? processSideBySide() : processLineByLine();
  };

  return { insertExpandButton, onExpandButtonClick };
}
