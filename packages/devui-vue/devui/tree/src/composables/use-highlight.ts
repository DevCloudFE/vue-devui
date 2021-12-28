import { ref } from 'vue'

type TypeHighlightClass = HIGHLIGHT_CLASS

type TypeUseHighlightNode = () => {
  highLightClick: (index: string) => void
  initHighLightNode: (isDisabled: boolean, nodeId: string) => void,
  getHighLightClass: (nodeId: string) => TypeHighlightClass
}

enum HIGHLIGHT_CLASS {
  ACTIVE = 'active',
  DISABLED = 'devui-tree_isDisabledNode',
  EMPTY = ''
}

const disabledNodeIdSet = new Set<string>()

const useHighlightNode: TypeUseHighlightNode = () => {

  const currentHighLightNodeId = ref<string>('')

  const initHighLightNode = (isDisabled = false, nodeId: string): void => {
    if (isDisabled) disabledNodeIdSet.add(nodeId)
  }

  const highLightClick = (nodeId: string): void => {
    if (disabledNodeIdSet.has(nodeId)) return
    currentHighLightNodeId.value = nodeId
  }

  const getHighLightClass = ((nodeId: string): TypeHighlightClass => {
    if (disabledNodeIdSet.has(nodeId)) return HIGHLIGHT_CLASS.DISABLED
    if (nodeId === currentHighLightNodeId.value) return HIGHLIGHT_CLASS.ACTIVE
    return HIGHLIGHT_CLASS.EMPTY
  })

  return {
    highLightClick,
    initHighLightNode,
    getHighLightClass
  }
}
export default useHighlightNode
