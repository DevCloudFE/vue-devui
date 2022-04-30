export function createMouseEvent(
  type: string,
  x = 0,
  y = 0
): MouseEvent {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: false,
    clientX: x,
    clientY: y,
  });
  return event;
}

export function dispatchMouseEvent(
  node: Node,
  type: string,
  x = 0,
  y = 0,
  event: MouseEvent = createMouseEvent(type, x, y)
): void {
  node.dispatchEvent(event);
}

export function mouseMoveTrigger(
  el: HTMLElement,
  from: { x: number; y: number },
  to: { x: number; y: number }
): void {
  if (typeof window === 'undefined') {
    return;
  }
  dispatchMouseEvent(el, 'mousedown', from.x, from.y);
  dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
  dispatchMouseEvent(window.document, 'mouseup');
}
