import { ref, Ref } from 'vue'

interface TypeHighlightClass {
  [key: string]: 'active' | '' | 'devui-tree_isDisabledNode'
}
type TypeUseHighlightNode = () => {
  nodeClassNameRefelct: Ref<TypeHighlightClass>
  handleClickOnNode: (index: string) => void
  handleInitNodeClassNameRefelct: (isDisabled: boolean, ...keys: Array<string>) => string
}

const HightLightClass = 'active'
const IsDisabledFlag = 'devui-tree_isDisabledNode'
const useHighlightNode: TypeUseHighlightNode = () => {
  const nodeClassNameRefelctRef = ref<TypeHighlightClass>({})

  const handleInit = (isDisabled = false, ...keys) => {
    const key = keys.join('-')
    nodeClassNameRefelctRef.value[key] = isDisabled ? IsDisabledFlag : (nodeClassNameRefelctRef.value[key] || '')
    return key
  }

  const handleClick = (key) => {
    if (nodeClassNameRefelctRef.value[key] === IsDisabledFlag) {
      return
    }
    nodeClassNameRefelctRef.value =
      Object.fromEntries(
        Object
          .entries(nodeClassNameRefelctRef.value)
          .map(([k]) => [k, k !== key ? '' : HightLightClass])
      )
  }
  return {
    nodeClassNameRefelct: nodeClassNameRefelctRef,
    handleClickOnNode: handleClick,
    handleInitNodeClassNameRefelct: handleInit,
  }
}
export default useHighlightNode
