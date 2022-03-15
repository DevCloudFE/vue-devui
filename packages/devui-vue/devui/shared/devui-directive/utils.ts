// 事件处理
export function on(element: HTMLElement | Document, eventName: string, handler: (this: Element, ev: Event) => any): void {
  if (document.addEventListener) {
    if (element && eventName && handler) {
      element.addEventListener(eventName, handler, false);
    }
  } else {
    if (element && eventName && handler) {
      (element as any).attachEvent('on' + eventName, handler);
    }
  }
}
export function off(element: HTMLElement | Document, eventName: string, handler: (this: Element, ev: Event) => any): void {
  if (document.removeEventListener) {
    if (element && eventName && handler) {
      element.removeEventListener(eventName, handler, false);
    }
  } else {
    if (element && eventName && handler) {
      (element as any).detachEvent('on' + eventName, handler);
    }
  }
}
