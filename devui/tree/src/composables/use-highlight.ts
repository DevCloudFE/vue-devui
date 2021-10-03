import { ref, Ref } from 'vue'

interface TypeHighlightClass {
  [key: string]: 'active' | '' | 'devui-tree_isDisabledNode'
}
type TypeUseHighlightNode = () => {
  nodeClassNameReflect: Ref<TypeHighlightClass>
  handleClickOnNode: (index: string) => void
  handleInitNodeClassNameReflect: (isDisabled: boolean, ...keys: Array<string>) => string
}

const HIGHLIGHT_CLASS = 'active'
const IS_DISABLED_FLAG = 'devui-tree_isDisabledNode'
const useHighlightNode: TypeUseHighlightNode = () => {
  const nodeClassNameReflectRef = ref<TypeHighlightClass>({})
  const handleInit = (isDisabled = false, ...keys) => {
    const key = keys.join('-')
    nodeClassNameReflectRef.value[key] = isDisabled ? IS_DISABLED_FLAG : (nodeClassNameReflectRef.value[key] || '')
    return key
  }
  const handleClick = (key) => {
    if (nodeClassNameReflectRef.value[key] === IS_DISABLED_FLAG) {
      return
    }
    nodeClassNameReflectRef.value =
      Object.fromEntries(
        Object
          .entries(nodeClassNameReflectRef.value)
          .map(([k]) => [k, k === key ? HIGHLIGHT_CLASS : ''])
      )
  }
  return {
    nodeClassNameReflect: nodeClassNameReflectRef,
    handleClickOnNode: handleClick,
    handleInitNodeClassNameReflect: handleInit,
  }
}
export default useHighlightNode
