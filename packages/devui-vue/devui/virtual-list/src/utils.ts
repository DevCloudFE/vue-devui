import type { VNode, ComponentInternalInstance } from 'vue';
import { isVNode, Fragment, Comment, Text } from 'vue';


export const isValid = (value?: unknown): boolean => {
  return value !== undefined && value !== null && value !== '';
};

export const isEmptyElement = (c?: VNode): boolean => {
  return (
    !!c &&
    (c.type === Comment ||
      (c.type === Fragment && c?.children?.length === 0) ||
      (c.type === Text && (c?.children as string)?.trim() === ''))
  );
};

export const flattenChildren = (children?: VNode[], filterEmpty = true): VNode[] => {
  const temp = Array.isArray(children) ? children : [children];
  const res: VNode[] = [];
  temp.forEach(child => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty));
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children as VNode[], filterEmpty));
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child as unknown as VNode);
    }
  });
  return res;
};

export const findDOMNode = (instance: (ComponentInternalInstance & { $el: VNode['el'] }) | null): VNode['el'] => {
  let node = instance?.vnode?.el || (instance && (instance?.$el || instance));
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};

export const isFF = typeof navigator === 'object' && /Firefox/i.test(navigator.userAgent);
