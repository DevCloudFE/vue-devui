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
    menuOpenClass.value = status ? 'devui-drop-menu-wrapper' : ''
  })

  return {
    menuShow,
    menuOpenClass,
    openPopup,
  }
}
