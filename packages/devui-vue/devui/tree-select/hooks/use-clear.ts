import { computed } from 'vue'
import type { SetupContext, Ref } from 'vue'
import { TreeSelectProps } from '../src/tree-select-types'

export default function useClear(props: TreeSelectProps, ctx: SetupContext, data: Ref): any {

  const isClearable = computed<boolean>(() => {
    return !props.disabled && props.allowClear && data.value.length > 0;
  })

  const handleClear = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (props.multiple) {
      ctx.emit('update:modelValue', [])
    } else {
      ctx.emit('update:modelValue', '')
      data.value = ''
    }
  }

  return {
    isClearable,
    handleClear,
  }
}