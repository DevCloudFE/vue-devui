import { computed } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { TreeSelectProps } from '../src/tree-select-types';

export default function useClear(props: TreeSelectProps, ctx: SetupContext, data: Ref): any {

  const isClearable = computed<boolean>(() => {
    return !props.disabled && props.allowClear;
  });

  const handleClearAll = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.multiple) {
      ctx.emit('update:modelValue', []);
      data.value = [];
    } else {
      ctx.emit('update:modelValue', '');
      data.value = '';
    }
  };

  const handleClearItem = (e: MouseEvent, item?: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.multiple) {
      data.value.splice(data.value.indexOf(item), 1);
      ctx.emit('update:modelValue', data.value);
    } else {
      ctx.emit('update:modelValue', []);
      data.value = [];
    }
  };

  return {
    isClearable,
    handleClearAll,
    handleClearItem
  };
}
