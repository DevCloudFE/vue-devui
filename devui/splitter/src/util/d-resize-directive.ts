import type { Directive, DirectiveBinding } from 'vue'

export class ResizeDirectiveProp {
  enableResize = true // 是否允许拖动
  onPressEvent = function (...args: any[]): void {
    /** */
  }
  onDragEvent = function (...args: any[]): void {
    /** */
  }
  onReleaseEvent = function (...args: any[]): void {
    /** */
  }
}

let resizeDirectiveProp: ResizeDirectiveProp
const resize: Directive = {
  mounted(
    el,
    { value = new ResizeDirectiveProp() }: DirectiveBinding<ResizeDirectiveProp>
  ) {
    resizeDirectiveProp = value
    // 是否允许拖动
    if (value.enableResize) {
      bindEvent(el)
    }
  },
  unmounted(
    el,
    { value = new ResizeDirectiveProp() }: DirectiveBinding<ResizeDirectiveProp>
  ) {
    if (value.enableResize) {
      unbind(el, 'mousedown', onMousedown)
    }
  },
}

function bindEvent(el) {
  // 绑定 mousedown 事件
  bind(el, 'mousedown', onMousedown)
  // TODO 绑定触屏事件
}

function bind(el, event, callback) {
  el.addEventListener && el.addEventListener(event, callback)
}

function unbind(el, event, callback) {
  el.removeEventListener && el.removeEventListener(event, callback)
}

function onMousedown(e) {
  bind(document, 'mousemove', onMousemove)
  bind(document, 'mouseup', onMouseup)
  resizeDirectiveProp.onPressEvent(normalizeEvent(e))
}

function onMousemove(e) {
  resizeDirectiveProp.onDragEvent(normalizeEvent(e))
}

function onMouseup(e) {
  unbind(document, 'mousemove', onMousemove)
  unbind(document, 'mouseup', onMouseup)
  resizeDirectiveProp.onReleaseEvent(normalizeEvent(e))
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
  }
}

export default resize
