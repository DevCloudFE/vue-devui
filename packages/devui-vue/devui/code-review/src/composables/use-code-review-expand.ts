import type { Ref } from 'vue';
import type { OutputFormat } from '../code-review-types';
import { ExpandLineReg, FirstLineReg } from '../const';
import { attachExpandUpDownButton } from '../utils';

export function useCodeReviewExpand(reviewContentRef: Ref<HTMLElement>, expandAllThreshold: number, outputFormat: OutputFormat) {
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
          const isExpandAll = parseInt(nextLineChildren[0].innerText) - parseInt(preLineChildren[0].innerText) - 1 < expandAllThreshold;
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
          attachExpandUpDownButton(lineNumberBox, 'up');
        } else if (lineIndex > 0 && lineIndex < totalLines - 1 && nextLineIndex in trNodes && prevLineIndex in trNodes) {
          const prevTdNodes = Array.from(trNodes[prevLineIndex].children) as HTMLElement[];
          const prevLineNumber = parseInt((prevTdNodes[0].children[0] as HTMLElement).innerText);
          const nextTdNodes = Array.from(trNodes[nextLineIndex].children) as HTMLElement[];
          const nextLineNumber = parseInt((nextTdNodes[0].children[0] as HTMLElement).innerText);
          const isExpandAll = nextLineNumber - prevLineNumber - 1 < expandAllThreshold;
          attachExpandUpDownButton(lineNumberBox, isExpandAll ? 'all' : 'updown');
        }
      }
    }

    const loadMoreLine = trNodes[0].cloneNode(true) as HTMLElement;
    loadMoreLine.children[0].removeChild(loadMoreLine.children[0].children[0]);
    (loadMoreLine.children[1] as HTMLElement).innerText = '';
    (loadMoreLine.children[1] as HTMLElement).style.height = '20px';
    const lastTrNode = trNodes[totalLines - 1].children;
    const leftLineStart = parseInt((lastTrNode[0].children[0] as HTMLElement).innerText) + 1;
    const rightLineStart = parseInt((lastTrNode[0].children[1] as HTMLElement).innerText) + 1;
    if (leftLineStart && rightLineStart) {
      attachExpandUpDownButton(loadMoreLine.children[0] as HTMLElement, 'down');
    }
    trNodes[0].parentElement?.appendChild(loadMoreLine);
  };

  const insertExpandButton = () => {
    outputFormat === 'side-by-side' ? processSideBySide() : processLineByLine();
  };

  return { insertExpandButton };
}
