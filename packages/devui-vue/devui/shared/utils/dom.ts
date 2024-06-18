import { ComponentPublicInstance } from '@vue/runtime-core';

/**
 *
 * @param {any} origin
 * @returns
 */
export function isComponent(target: any): target is ComponentPublicInstance {
  return !!(target?.$el);
}

/**
 * 兼容火狐浏览器判断是否为元素节点
 * @param {any} element
 * @returns {boolean}
 */
function judgeFireIsElement (element: Element | ComponentPublicInstance | null) {
  const str = Object.prototype.toString.call(element);
  return str.includes('object')&&str.includes('HTML')&&str.includes('Element');
}

/**
 * 提取 Vue Intance 中的元素，如果本身就是元素，直接返回。
 * @param {any} element
 * @returns {Element | null}
 */
export function getElement(
  element: Element | ComponentPublicInstance | null
): Element | null {
  if (element instanceof Element || judgeFireIsElement(element)) {
    return element;
  }
  if (
    element &&
    typeof element === 'object' &&
    (element.$el instanceof Element || judgeFireIsElement(element.$el))
  ) {
    return element.$el;
  }
  return null;
}
