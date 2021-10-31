// can export function.
export default {
  mounted(el: HTMLElement, binding: Record<string, unknown>): void {
    console.log('draggable el:', el, el.textContent)
    console.log('draggable binding:', binding)
  },
}
