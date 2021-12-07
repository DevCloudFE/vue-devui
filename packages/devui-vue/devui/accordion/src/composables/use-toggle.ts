import { toRefs, ref } from 'vue'
import { AccordionMenuItem, AccordionMenuToggleEvent } from '../accordion.type'
import { flatten } from '../utils'

type TypeMenuOpenStatusRef = {
  [key: string]: {
    isOpen: boolean
  }
}

const useToggle = (props) => {
  const menuOpenStatusRef = ref<TypeMenuOpenStatusRef>({})
  const preOpenFoldeRef = ref<string>('')
  const { data, childrenKey, openKey, restrictOneOpen } = toRefs(props)

  const initAllOpenData = (item) => {
    menuOpenStatusRef.value[item.id] = {
      isOpen: item[openKey.value]
    }
    if (item[openKey.value]) {
      preOpenFoldeRef.value = item.id
    }
  }

  // 打开或关闭一级菜单，如果有限制只能展开一项则关闭其他一级菜单
  const openMenuFn = (item, open) => {
    if (open && restrictOneOpen.value) {
      if (preOpenFoldeRef.value === item.id) return
      if (preOpenFoldeRef.value) {
        menuOpenStatusRef.value[preOpenFoldeRef.value].isOpen = false
      }
    }
    menuOpenStatusRef.value[item.id].isOpen = open
  }

  // 打开或关闭可折叠菜单
  const menuToggleFn = (menuEvent: AccordionMenuToggleEvent) => {
    openMenuFn(menuEvent.item, menuEvent.open)
  }

  const cleanOpenData = () => {
    flatten(data.value, childrenKey.value, true, false).forEach(
      (item) => (item[openKey.value] = undefined)
    )
  }

  return {
    menuOpenStatusRef,
    initAllOpenData,
    openMenuFn,
    menuToggleFn,
    cleanOpenData
  }
}

export default useToggle
