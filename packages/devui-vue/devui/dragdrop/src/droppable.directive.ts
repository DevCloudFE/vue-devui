// can export function.
export default {
  mounted(el: HTMLElement, binding: Record<string, unknown>): void {
    console.log('droppable el:', el, el.textContent)
    console.log('droppable binding:', binding)
  },
}
