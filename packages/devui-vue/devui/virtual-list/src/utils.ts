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
      (c.type === Text && c?.children?.trim() === ''))
  );
};

export const flattenChildren = (children?: VNode[], filterEmpty = true): VNode[] => {
  const temp = Array.isArray(children) ? children : [children];
  const res: VNode[] = [];
  temp.forEach(child => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty));
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children, filterEmpty));
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};

export const findDOMNode = (instance: ComponentInternalInstance | null): Element => {
  let node = instance?.vnode?.el || (instance && (instance?.$el || instance));
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};

export const isFF = typeof navigator === 'object' && /Firefox/i.test(navigator.userAgent);

let raf = (callback: FrameRequestCallback) => +setTimeout(callback, 16);
let caf = (num: number) => clearTimeout(num);

if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = (callback: FrameRequestCallback) => window.requestAnimationFrame(callback);
  caf = (handle: number) => window.cancelAnimationFrame(handle);
}

let rafUUID = 0;
const rafIds = new Map<number, number>();

function cleanup(id: number) {
  rafIds.delete(id);
}

export default function wrapperRaf(callback: () => void, times = 1): number {
  rafUUID += 1;
  const id = rafUUID;

  function callRef(leftTimes: number) {
    if (leftTimes === 0) {
      // Clean up
      cleanup(id);

      // Trigger
      callback();
    } else {
      // Next raf
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });

      // Bind real raf id
      rafIds.set(id, realId);
    }
  }

  callRef(times);

  return id;
}

wrapperRaf.cancel = (id: number) => {
  const realId = rafIds.get(id);
  if (realId) {
    cleanup(realId);
    return caf(realId);
  }
};
