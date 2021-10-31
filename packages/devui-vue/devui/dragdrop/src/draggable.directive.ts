export default {
  mounted(el: HTMLElement): void {
    el.setAttribute('draggable', 'true')

    // dragstart/drag/dragend
    el.addEventListener('dragstart', (event: DragEvent) => {
      event.dataTransfer.setData('originId', el.id)
    })
  },
}
