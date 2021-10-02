/**
 * 控制窗口打开收起
 */
import { ref, watch } from 'vue';
import { PopupTypes } from '../src/cascader-types'

export const popupHandles = (): PopupTypes => {
  const menuShow = ref(false)
  const menuOpenClass = ref('')
  const openPopup = () => {
    menuShow.value = !menuShow.value
  }
  watch(menuShow, (status) => {
    switch (status) {
      case false:
        menuOpenClass.value = ''
        break
      case true:
        menuOpenClass.value = 'devui-drop-menu-wrapper'
        break
      default:
        break
    }
  })

  return {
    menuShow,
    menuOpenClass,
    openPopup,
  }
}
