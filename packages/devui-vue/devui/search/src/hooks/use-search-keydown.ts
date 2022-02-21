/**
 * 清空按钮显示、隐藏
 */
import { SetupContext, Ref, } from 'vue'
import { KeydownReturnTypes } from '../search-types'
import { debounce } from 'lodash'
const KEYS_MAP = {
  enter: 'Enter'
} as const

type EmitProps = 'update:modelValue' | 'onSearch'

export const keydownHandles = (ctx: SetupContext<(EmitProps)[]>, keywords: Ref<string>, delay: number): KeydownReturnTypes => {
  // 删除按钮显示
  const onInputKeydown = ($event: KeyboardEvent) => {
    switch ($event.key) {
      case KEYS_MAP.enter:
        handleEnter($event)
        break
      default:
        break
    }
  }
  const handleEnter = ($event: KeyboardEvent) => {
    if ($event.target instanceof HTMLInputElement) {
      const value = $event.target.value
      useEmitKeyword(value)
    }
  }
  const onClickHandle = () => {
    useEmitKeyword(keywords.value)
  }
  const useEmitKeyword = debounce((value: string) => {
    ctx.emit('onSearch', value)
  }, delay)
  return {
    onInputKeydown,
    useEmitKeyword,
    onClickHandle
  }
}
 