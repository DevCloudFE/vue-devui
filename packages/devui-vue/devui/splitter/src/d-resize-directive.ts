import type { Directive, DirectiveBinding } from 'vue';
export interface CoordinateInfo {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  type: string;
  originalEvent: MouseEvent;
}
export type OnResizeEvent = (coordinateInfo: CoordinateInfo) => void;
export interface ResizeDirectiveProp {
  enableResize: true; // 是否允许拖动
  onPressEvent: OnResizeEvent;
  onDragEvent: OnResizeEvent;
  onReleaseEvent: OnResizeEvent;
}

export interface CustomElement extends HTMLElement {
  resizeProps: {
    enableResize: boolean;
    onPressEvent: (arg: CoordinateInfo) => void;
    onDragEvent: (arg: CoordinateInfo) => void;
    onReleaseEvent: (arg: CoordinateInfo) => void;
  };
}


// 返回常用位置信息
function normalizeEvent(evt: MouseEvent) {
  return {
    pageX: evt.pageX,
    pageY: evt.pageY,
    clientX: evt.clientX,
    clientY: evt.clientY,
    offsetX: evt.offsetX,
    offsetY: evt.offsetY,
    type: evt.type,
    originalEvent: evt,
  };
}

function bind(
  el: HTMLElement | Document,
  eventName: string,
  callback: EventListenerOrEventListenerObject) {
  el.addEventListener && el.addEventListener(eventName, callback);
}

function unbind(
  el: HTMLElement | Document,
  eventName: string,
  callback: EventListenerOrEventListenerObject) {
  el.removeEventListener && el.removeEventListener(eventName, callback);
}

function onMousedown(e: Event) {
  const resizeProps = (e?.target as CustomElement)?.resizeProps;
  if (!resizeProps) { // 提前退出，避免 splitter-bar 子元素响应导致错误
    return;
  }

  function onMousemove(evt: Event): void {
    resizeProps.onDragEvent(normalizeEvent(evt as MouseEvent));
  }

  function onMouseup(evt: Event) {
    unbind(document, 'mousemove', onMousemove);
    unbind(document, 'mouseup', onMouseup);
    resizeProps.onReleaseEvent(normalizeEvent(evt as MouseEvent));
  }

  bind(document, 'mousemove', onMousemove);
  bind(document, 'mouseup', onMouseup);
  resizeProps.onPressEvent(normalizeEvent(e as MouseEvent));
}

function bindEvent(el: HTMLElement) {
  // 绑定 mousedown 事件
  bind(el, 'mousedown', onMousedown);
  // TODO 绑定触屏事件
}

const resize: Directive = {
  mounted(el: CustomElement, { value }: DirectiveBinding<ResizeDirectiveProp>) {
    el.resizeProps= value;
    // 是否允许拖动
    if (value.enableResize) {
      bindEvent(el);
    }
  },
  unmounted(el: HTMLElement, { value }: DirectiveBinding<ResizeDirectiveProp>) {
    if (value.enableResize) {
      unbind(el, 'mousedown', onMousedown);
    }
  },
};

export default resize;
