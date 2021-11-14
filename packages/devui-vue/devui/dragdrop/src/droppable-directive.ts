export default {
  mounted(el: HTMLElement): void {
    // dragenter/dragover/dragend/drop
    el.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault()
    })

    el.addEventListener('drop', (event: DragEvent) => {
      const originId = event.dataTransfer.getData('originId')
      const originNodeCopy = document.getElementById(originId).cloneNode(true)
      const targetNode: any = event.target
      targetNode.append(originNodeCopy)
    })
  },
}
