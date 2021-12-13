import { ref, Ref, toRefs } from 'vue'
import { AccordionProps } from '../accordion-types'
import { AccordionItemClickEvent, AccordionMenuItem } from '../accordion.type'

import { flatten } from '../utils'

type activeObjectRef = {
  [key: string]: {
    isDisable: boolean
    isActive: boolean
  }
}

type TypeUseActive = (
  props: AccordionProps,
  emit: (arg0: string, arg1: AccordionMenuItem) => void
) => {
  activeObjectRef: Ref<activeObjectRef>
  prevActiveItemIdRef: Ref<string>
  initActiveItem: (item: AccordionMenuItem) => void
  activeItemFn: (item: AccordionMenuItem) => void
  // itemClickFn: (itemEvent: AccordionItemClickEvent) => void
  // linkItemClickFn: (itemEvent: AccordionItemClickEvent) => void
}

const useActive: TypeUseActive = (props, emit) => {
  const { activeKey, disabledKey } = toRefs(props)
  const activeObjectRef: Ref<activeObjectRef> = ref({})
  const prevActiveItemIdRef: Ref<string> = ref(null) //记录用户点击的激活菜单项

  const initActiveItem = (item) => {
    activeObjectRef.value[item.id] = {
      isDisable: item[disabledKey.value],
      isActive: item[activeKey.value]
    }
    if (item[activeKey.value]) {
      prevActiveItemIdRef.value = item.id
    }
  }

  // 激活子菜单项并去掉其他子菜单的激活
  const activeItemFn = (item: AccordionMenuItem) => {
    if (activeObjectRef.value[item.id].isDisable) return
    if (prevActiveItemIdRef.value === item.id) return
    if (prevActiveItemIdRef.value) {
      activeObjectRef.value[prevActiveItemIdRef.value].isActive = false
    }
    activeObjectRef.value[item.id].isActive = true
    prevActiveItemIdRef.value = item.id
    emit('activeItemChange', item)
  }

  // 点击了可点击菜单
  // const itemClickFn = (itemEvent: AccordionItemClickEvent) => {
  //   const prevActiveItemIdRef = clickActiveItem
  //   activeItemFn(itemEvent.item)
  //   // emit('itemClick', {...itemEvent, prevActiveItem: prevActiveItem});
  // }

  // const linkItemClickFn = (itemEvent: AccordionItemClickEvent) => {
  //   const prevActiveItem = clickActiveItem
  //   clickActiveItem.value = itemEvent.item
  //   // emit('itemClick', {...itemEvent, prevActiveItem: prevActiveItem});
  // }

  return {
    activeObjectRef,
    prevActiveItemIdRef,
    initActiveItem,
    activeItemFn
    // itemClickFn,
    // linkItemClickFn
  }
}

export default useActive
