/**
 * 清空按钮显示、隐藏
 */
import { SetupContext, Ref } from 'vue'
import { KeydownReturnTypes } from '../src/search-types'

const KEYS_MAP = {
  enter: 'Enter'
} as const

type EmitProps = 'update:modelValue' | 'searchFn'

export const keydownHandles = (ctx: SetupContext<(EmitProps)[]>, keywords: Ref<string>): KeydownReturnTypes => {
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
      ctx.emit('searchFn', value)
    }
  }
  const onClickHandle = () => {
    console.log(keywords.value)
    ctx.emit('searchFn', keywords.value)
  }
  return {
    onInputKeydown,
    onClickHandle
  }
}
 