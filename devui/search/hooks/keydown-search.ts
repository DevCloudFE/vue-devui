/**
 * 清空按钮显示、隐藏
 */
 import { SetupContext } from 'vue'

 const KEYS_MAP = {
  enter: 'Enter'
} as const

 export const keydownHandles = (ctx: SetupContext): any => {
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
        console.log($event.target.value)
        const value = $event.target.value
        if (value.length > 0) {
          ctx.emit('searchFn', value)
        }
      }
    }
   return {
    onInputKeydown
   }
 }
 