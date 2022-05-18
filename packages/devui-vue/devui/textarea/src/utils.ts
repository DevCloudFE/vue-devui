import { isNumber } from 'lodash';

let tempTextarea: HTMLTextAreaElement | undefined = undefined;

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
];

type BoxStyle = {
  contextStyle: string;
  boxSizing: string;
  paddingSize: number;
  borderSize: number;
};

type TextAreaHeight = {
  height: string;
  minHeight?: string;
};

function getBoxStyle(targetElement: Element): BoxStyle {
  const style = window.getComputedStyle(targetElement);

  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize =
    Number.parseFloat(style.getPropertyValue('padding-bottom')) + Number.parseFloat(style.getPropertyValue('padding-top'));

  const borderSize =
    Number.parseFloat(style.getPropertyValue('border-bottom-width')) + Number.parseFloat(style.getPropertyValue('border-top-width'));

  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

export function computeTextareaHeight(targetElement: HTMLTextAreaElement | undefined, minRows = 1, maxRows?: number): TextAreaHeight {
  if (targetElement === undefined) {
    return {} as TextAreaHeight;
  }

  if (!tempTextarea) {
    tempTextarea = document.createElement('textarea');
    document.body.appendChild(tempTextarea);
  }

  const { paddingSize, borderSize, boxSizing, contextStyle } = getBoxStyle(targetElement);

  tempTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  tempTextarea.value = targetElement.value || targetElement.placeholder || '';

  let height = tempTextarea.scrollHeight;
  tempTextarea.value = '';
  const result = {} as TextAreaHeight;

  if (boxSizing === 'border-box') {
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    height -= paddingSize;
  }

  const singleRowHeight = tempTextarea.scrollHeight - paddingSize;
  tempTextarea.parentNode?.removeChild(tempTextarea);
  tempTextarea = undefined;

  if (minRows === undefined) {
    result.height = `${height}px`;
    return result;
  }

  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;

  return result;
}
