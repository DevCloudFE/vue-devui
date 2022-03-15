import type { Directive, DirectiveBinding } from 'vue';
export type OnResizeEvent = (coordinateInfo: CoordinateInfo) => void;
export interface ResizeDirectiveProp {
  enableResize: true; // 是否允许拖动
  onPressEvent: OnResizeEvent;
  onDragEvent: OnResizeEvent;
  onReleaseEvent: OnResizeEvent;
}

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

const resize: Directive = {
  mounted(el, { value }: DirectiveBinding<ResizeDirectiveProp>) {
    el.$value = value;
    // 是否允许拖动
    if (value.enableResize) {
      bindEvent(el);
    }
  },
  unmounted(el, { value }: DirectiveBinding<ResizeDirectiveProp>) {
    if (value.enableResize) {
      unbind(el, 'mousedown', onMousedown);
    }
  },
};

function bindEvent(el) {
  // 绑定 mousedown 事件
  bind(el, 'mousedown', onMousedown);
  // TODO 绑定触屏事件
}

function bind(el, event, callback) {
  el.addEventListener && el.addEventListener(event, callback);
}

function unbind(el, event, callback) {
  el.removeEventListener && el.removeEventListener(event, callback);
}

function onMousedown(e) {
  const $value = e?.target?.$value;
  if (!$value) {return;} // 提前退出，避免 splitter-bar 子元素响应导致错误

  bind(document, 'mousemove', onMousemove);
  bind(document, 'mouseup', onMouseup);
  $value.onPressEvent(normalizeEvent(e));

  function onMousemove(e) {
    $value.onDragEvent(normalizeEvent(e));
  }

  function onMouseup(e) {
    unbind(document, 'mousemove', onMousemove);
    unbind(document, 'mouseup', onMouseup);
    $value.onReleaseEvent(normalizeEvent(e));
  }
}

// 返回常用位置信息
function normalizeEvent(e) {
  return {
    pageX: e.pageX,
    pageY: e.pageY,
    clientX: e.clientX,
    clientY: e.clientY,
    offsetX: e.offsetX,
    offsetY: e.offsetY,
    type: e.type,
    originalEvent: e,
  };
}

export default resize;
