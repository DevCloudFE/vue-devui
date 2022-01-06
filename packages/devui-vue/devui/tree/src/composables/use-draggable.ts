import { reactive } from 'vue'
import type { Ref } from 'vue'
import { TreeItem, IDropType, Nullable } from '../tree-types'

const ACTIVE_NODE = 'devui-tree-node__content--value-wrapper'

export default function useDraggable(
  draggable: boolean,
  dropType: IDropType,
  node: Ref<Nullable<HTMLElement>>
): any {
  const dragState = reactive({
    showIndicator: true,
    dropType: null,
    draggingNode: null,
    indicatorTop: 0,
    indicatorLeft: 0,
    indicatorWidth: 0
  })
  const removeDraggingStyle = (target: Nullable<HTMLElement>) => {
    target
      .querySelector(`.${ACTIVE_NODE}`)
      ?.classList.remove(...['prev', 'next', 'inner'].map((item) => `devui-drop-${item}`))
  }
  const onDragstart = (event: DragEvent, treeNode: TreeItem) => {
    // console.log(event, event.target, treeNode)
    dragState.draggingNode = event.target
    const data = Object.assign({}, treeNode)
    event.dataTransfer.setData('Text', JSON.stringify(data))
  }
  const onDragover = (event: DragEvent) => {
    // console.log(draggable, node.value)
    if (draggable) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      if (!node) {
        return
      }
      const dropPrev = dropType.dropPrev
      const dropNext = dropType.dropNext
      const dropInner = dropType.dropInner

      // console.log(node.value);
      let innerDropType

      // const treePosition = node.value.getBoundingClientRect()
      const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1
      const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1
      const currentTarget = <Nullable<HTMLElement>>event.currentTarget
      const targetPosition = currentTarget.getBoundingClientRect()
      // const treeNodePosition = currentTarget
      //   .querySelector('.devui-tree-node__title')
      //   .getBoundingClientRect()
      const distance = event.clientY - targetPosition.top

      if (distance < targetPosition.height * prevPercent) {
        innerDropType = 'prev'
      } else if (distance > targetPosition.height * nextPercent) {
        innerDropType = 'next'
      } else if (dropInner) {
        innerDropType = 'inner'
      } else {
        innerDropType = 'none'
      }
      removeDraggingStyle(currentTarget)
      if (innerDropType && innerDropType !== 'none') {
        currentTarget.querySelector(`.${ACTIVE_NODE}`)?.classList.add(`devui-drop-${innerDropType}`)
      }
    }
  }
  const onDragleave = (event: DragEvent) => {
    removeDraggingStyle(<Nullable<HTMLElement>>event.currentTarget)
  }
  const onDrop = (event: DragEvent) => {
    removeDraggingStyle(<Nullable<HTMLElement>>event.currentTarget)
    if (!draggable) {
      return
    }
    event.preventDefault()
    const transferDataStr = event.dataTransfer.getData('Text')
  }

  return {
    onDragstart,
    onDragover,
    onDragleave,
    onDrop,
    dragState
  }
}
