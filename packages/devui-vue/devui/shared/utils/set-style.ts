import type { CSSProperties } from 'vue';

/**
 * 设置元素的样式，返回上一次的样式
 * @param element
 * @param style
 * @returns
 */
export function setStyle(
  element: HTMLElement,
  style: CSSProperties,
): CSSProperties {
  const oldStyle: CSSProperties = {};

  const styleKeys = Object.keys(style);

  styleKeys.forEach((key) => {
    oldStyle[key] = element.style[key];
  });

  styleKeys.forEach((key) => {
    element.style[key] = style[key];
  });

  return oldStyle;
}
