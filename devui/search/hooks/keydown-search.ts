/**
 * 清空按钮显示、隐藏
 */
import { SetupContext } from 'vue'
import { KeydownReturnTypes } from '../src/use-search'
const KEYS_MAP = {
  enter: 'Enter'
} as const

export const keydownHandles = (ctx: SetupContext): KeydownReturnTypes => {
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
      if (value.length > 0) {
        console.log(value)
        ctx.emit('searchFn', value)
      }
    }
  }
  const onClickHandle = ($event: MouseEvent) => {
    const value = ($event.target as HTMLInputElement).value
    if (value.length > 0) {
      console.log(value)
      ctx.emit('searchFn', value)
    }
  }
  return {
    onInputKeydown,
    onClickHandle
  }
}
 