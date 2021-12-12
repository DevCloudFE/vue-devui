/**
 * 输入框内容定义、删改操作
 */
import { ref, watch, computed, SetupContext } from 'vue'
import { SearchProps, KeywordsReturnTypes } from '../search-types'
type EmitProps = 'update:modelValue' | 'onSearch'

export const keywordsHandles = (ctx: SetupContext<(EmitProps)[]>, props: SearchProps): KeywordsReturnTypes => {
  const keywords = ref('') // 输入框内容
  // 监听是否有双向绑定，将绑定的值传递给keyword，因为需要清除输入框
  watch(() => props.modelValue, (val)=> {
    keywords.value = val
  }, { immediate: true })
  // 清空输入框
  const onClearHandle = () => {
    keywords.value = ''
    // 清空输入框时更新modelValue为空
    ctx.emit('update:modelValue', '')
  }
  const clearIconShow = computed(() => {
    return keywords.value.length > 0
  })
  return {
    keywords,
    clearIconShow,
    onClearHandle
  }
}
