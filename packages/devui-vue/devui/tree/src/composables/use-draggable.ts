import { reactive, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { TreeItem, IDropType, Nullable } from '../tree-types'
import { cloneDeep } from 'lodash-es'

const ACTIVE_NODE = 'devui-tree-node__content--value-wrapper'
interface DragState {
  dropType?: 'prev' | 'next' | 'inner'
  draggingNode?: Nullable<HTMLElement>
}

export default function useDraggable(
  draggable: boolean,
  dropType: IDropType,
  node: Ref<Nullable<HTMLElement>>,
  renderData: Ref<TreeItem[]>,
  data: Ref<TreeItem[]>
): any {
  const dragState = reactive<DragState>({
    dropType: null,
    draggingNode: null,
  })
  const treeIdMapValue = ref({})
  watch(
    () => renderData.value,
    () => {
      treeIdMapValue.value = renderData.value.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
    },
    { deep: true, immediate: true }
  )

  const removeDraggingStyle = (target: Nullable<HTMLElement>) => {
    target
      .querySelector(`.${ACTIVE_NODE}`)
      ?.classList.remove(...['prev', 'next', 'inner'].map((item) => `devui-drop-${item}`))
  }

  const checkIsParent = (childNodeId: number | string, parentNodeId: number | string) => {
    const realParentId = treeIdMapValue.value[childNodeId].parentId
    if (realParentId === parentNodeId) {
      return true
    } else if (realParentId !== undefined) {
      return checkIsParent(realParentId, parentNodeId)
    } else {
      return false
    }
  }
  const handlerDropData = (dragNodeId: string | number, dropNodeId: string | number, dropType?: string) => {
    console.log(dragNodeId, dropNodeId);
    
    const cloneData = cloneDeep(data.value)
    let nowDragNode
    let nowDropNode
    const ergodic = (curr: TreeItem[]) => {
      if (!Array.isArray(curr)) return
      curr.every((item, index) => {
        if (nowDragNode && nowDropNode) {
          return false
        }
        if (item.id === dragNodeId) {
          nowDragNode = { target: curr, index }
        } else if (item.id === dropNodeId) {
          nowDropNode = { target: curr, index }
        }
        if (!nowDragNode || !nowDropNode) {
          ergodic(item.children)
        }
        return true
      })
    }
    ergodic(cloneData)
    if (nowDragNode && nowDropNode && dropType) {
      if (dropType === '') {
      
      }
      nowDropNode.target.unshift(
        cloneDeep(nowDragNode.target[nowDragNode.index])
      )
      nowDragNode.target.splice(nowDragNode.index, 1)
    }
    
    return cloneData
  }
  const onDragstart = (event: DragEvent, treeNode: TreeItem) => {
    dragState.draggingNode = <Nullable<HTMLElement>>event.target
    const data = {
      type: 'tree-node',
      nodeId: treeNode.id
    }
    event.dataTransfer.setData('Text', JSON.stringify(data))
  }
  const onDragover = (event: DragEvent) => {
    if (draggable) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
      if (!node) {
        return
      }
      const dropPrev = dropType.dropPrev
      const dropNext = dropType.dropNext
      const dropInner = dropType.dropInner

      let innerDropType

      const prevPercent = dropPrev ? (dropInner ? 0.25 : dropNext ? 0.45 : 1) : -1
      const nextPercent = dropNext ? (dropInner ? 0.75 : dropPrev ? 0.55 : 0) : 1
      const currentTarget = <Nullable<HTMLElement>>event.currentTarget
      const targetPosition = currentTarget.getBoundingClientRect()
      const distance = event.clientY - targetPosition.top

      if (distance < targetPosition.height * prevPercent) {
        innerDropType = 'prev'
      } else if (distance > targetPosition.height * nextPercent) {
        innerDropType = 'next'
      } else if (dropInner) {
        innerDropType = 'inner'
      } else {
        innerDropType = undefined
      }
      removeDraggingStyle(currentTarget)
      if (innerDropType && innerDropType !== 'none') {
        currentTarget.querySelector(`.${ACTIVE_NODE}`)?.classList.add(`devui-drop-${innerDropType}`)
      }
      dragState.dropType = innerDropType
    }
  }
  const onDragleave = (event: DragEvent) => {
    removeDraggingStyle(<Nullable<HTMLElement>>event.currentTarget)
  }
  const onDrop = (event: DragEvent, dropNode: TreeItem) => {
    removeDraggingStyle(<Nullable<HTMLElement>>event.currentTarget)
    if (!draggable) {
      return
    }
    event.preventDefault()
    const transferDataStr = event.dataTransfer.getData('Text')
    if (transferDataStr) {
      try {
        const transferData = JSON.parse(transferDataStr)
        if (typeof transferData === 'object' && transferData.type === 'tree-node') {
          const dragNodeId = transferData.nodeId
          const isParent = checkIsParent(dropNode.id, dragNodeId)
          if (dragNodeId === dropNode.id || isParent) {
            return
          }
          let result
          console.log(cloneDeep(data.value))
          
          if (dragState.dropType) {
            result = handlerDropData(dragNodeId, dropNode.id, dragState.dropType)
          }
          console.log(result)
          data.value = result
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return {
    onDragstart,
    onDragover,
    onDragleave,
    onDrop,
    dragState
  }
}
