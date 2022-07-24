import { computed, ComputedRef } from 'vue';
import { EditableSelectProps, OptionObjectItem } from '../editable-select-types';
interface UseSelectReturnType {
  normalizeOptions: ComputedRef<OptionObjectItem[]>;
}
export function useSelect(props: EditableSelectProps): UseSelectReturnType {
  /**
   * 标准化处理通用数据
   */
  const normalizeOptions = computed(() => {
    return props.options.map((option) => {
      let res;
      if (option !== 'null' && typeof option === 'object') {
        res = {
          ...option,
          label: option.label || '',
          value: option.value !== undefined ? option.value : option.label || '',
        };
      } else {
        res = {
          label: String(option),
          value: option,
        };
      }
      return res;
    });
  });
  return { normalizeOptions };
}
