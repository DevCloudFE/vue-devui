/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * <div v-clickoutside="handleClose">
 */

import { inBrowser } from '../utils/common-var';
import { on } from './utils';

const ctx = Symbol('@@clickoutside');
const nodeList = new Map();

let startClick;
let nid = 0;
let isFirst = true;

function createDocumentHandler(el: HTMLElement, binding: Record<string, any>, vnode: any) {
  if (inBrowser && isFirst) {
    isFirst = false;
    on(document, 'mousedown', (e: Event) => {
      startClick = e;
    });
    on(document, 'mouseup', (e: Event) => {
      for (const [id, node] of nodeList) {
        node[ctx].documentHandler(e, startClick);
      }
    });
  }

  return function (mouseup: Event, mousedown: Event) {
    if (
      !vnode ||
      !binding.instance ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target as HTMLElement) ||
      el.contains(mousedown.target as HTMLElement) ||
      el === mouseup.target
    ) {
      return;
    }
    el[ctx].bindingFn && el[ctx].bindingFn();
  };
}

const clickoutsideDirective = {
  beforeMount: function (el: HTMLElement, binding: Record<string, any>, vnode: any) {
    nid++;
    nodeList.set(nid, el);
    el[ctx] = {
      nid,
      documentHandler: createDocumentHandler(el, binding, vnode),
      bindingFn: binding.value
    };
  },

  updated: function (el: HTMLElement, binding: Record<string, any>, vnode: any) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].bindingFn = binding.value;
  },

  unmounted: function (el: HTMLElement) {
    nodeList.delete(el[ctx].nid);
    delete el[ctx];
  }
};

export default clickoutsideDirective;
