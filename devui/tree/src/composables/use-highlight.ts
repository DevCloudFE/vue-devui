import { ref, Ref } from 'vue'

interface TypeHighLightClass {
  [key: string]: 'active' | '' | 'isDisabled'
}
type TypeUseHighLightNode = () => {
  nodeClassNameRefelct: Ref<TypeHighLightClass>
  handleClickOnNode: (index: string) => void
  handleInitNodeClassNameRefelct: (isDisabled: boolean, ...keys: Array<string>) => string
}

const HightLightClass = 'active'
const IsDisabledFlag = 'isDisabled'
const useHighLightNode: TypeUseHighLightNode = () => {
  const nodeClassNameRefelctRef = ref<TypeHighLightClass>({})

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
          .map(([k, v]) => {
            if (k !== key) {
              return [k, v === IsDisabledFlag ? IsDisabledFlag : '']
            }
            return [k, HightLightClass]
          })
      )
  }
  return {
    nodeClassNameRefelct: nodeClassNameRefelctRef,
    handleClickOnNode: handleClick,
    handleInitNodeClassNameRefelct: handleInit,
  }
}
export default useHighLightNode
