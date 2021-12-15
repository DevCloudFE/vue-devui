import { ComputedRef, nextTick, Ref } from 'vue'
import { OptionItem } from '../editable-select-types'
interface KeyboardSelectReturnType {
  handleKeydown: (e: KeyboardEvent) => void
}

export default function keyboardSelect(
  dropdownRef: Ref<any>,
  visible: Ref<boolean>,
  hoverIndex: Ref<number>,
  selectedIndex: Ref<number>,
  filteredOptions: ComputedRef<OptionItem[]>,
  toggleMenu: () => void,
  selectOptionClick: (e: KeyboardEvent, item: OptionItem) => void
): KeyboardSelectReturnType {
  const updateHoverIndex = (index: number) => {
    hoverIndex.value = index
  }
  const scrollToActive = (index: number) => {
    const dropdownVal = dropdownRef.value
    const li = dropdownVal.children[index]

    nextTick(() => {
      if (li.scrollIntoViewIfNeeded) {
        li.scrollIntoViewIfNeeded(false)
      } else {
        const containerInfo = dropdownVal.getBoundingClientRect()
        const elementInfo = li.getBoundingClientRect()
        if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
          li.scrollIntoView(false)
        }
      }
    })
  }
  const onKeyboardSelect = (e: KeyboardEvent) => {
    const option = filteredOptions.value[hoverIndex.value]
    selectOptionClick(e, option)
    hoverIndex.value = selectedIndex.value
  }
  const handleKeydown = (e: KeyboardEvent) => {
    const keyCode = e.key || e.code
    let index = 0
    if (!visible.value) {
      toggleMenu()
    }

    if (keyCode === 'Backspace') {
      return
    }

    if (keyCode === 'ArrowUp') {
      index = hoverIndex.value - 1
      if (index < 0) {
        index = filteredOptions.value.length - 1
      }
    } else if (keyCode === 'ArrowDown') {
      index = hoverIndex.value + 1
      if (index > filteredOptions.value.length - 1) {
        index = 0
      }
    }

    if (keyCode === 'Enter') {
      return onKeyboardSelect(e)
    }
    updateHoverIndex(index)
    scrollToActive(index)
  }

  return {
    handleKeydown
  }
}
