/**
 * 输入框内容定义、删改操作
 */
import { ref, watch, computed, SetupContext } from 'vue';
import { SearchProps, KeywordsReturnTypes } from '../search-types';
type EmitProps = 'update:modelValue' | 'search';

export const keywordsHandles = (ctx: SetupContext<EmitProps[]>, props: SearchProps): KeywordsReturnTypes => {
  const keywords = ref('');
  watch(
    () => props.modelValue,
    (val) => {
      keywords.value = val;
    },
    { immediate: true }
  );
  const onClearHandle = () => {
    keywords.value = '';
    ctx.emit('update:modelValue', '');
    ctx.emit('search', '');
  };
  const clearIconShow = computed(() => keywords.value.length > 0);
  return {
    keywords,
    clearIconShow,
    onClearHandle,
  };
};
