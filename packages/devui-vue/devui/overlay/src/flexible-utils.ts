export function getScrollParent(element: HTMLElement): HTMLElement | (Window & typeof globalThis) {
  const overflowRegex = /(auto|scroll|hidden)/;
  for (let parent = element; (parent = parent.parentElement); parent.parentElement !== document.body) {
    const style = window.getComputedStyle(parent);
    if (overflowRegex.test(style.overflow + style.overflowX + style.overflowY)) {
      return parent;
    }
  }
  return window;
}
