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
 * 提取 Vue Intance 中的元素，如果本身就是元素，直接返回。
 * @param {any} element
 * @returns {Element | null}
 */
export function getElement(
  element: Element | ComponentPublicInstance | null
): Element | null {
  if (element instanceof Element) {
    return element;
  }
  if (
    element &&
    typeof element === 'object' &&
    element.$el instanceof Element
  ) {
    return element.$el;
  }
  return null;
}
