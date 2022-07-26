import type { SetupContext } from 'vue';
import { SelectProps, OptionObjectItem, useMultipleOption, useMultipleReturn } from '../select-types';

export default function useMultipleSelect(props: SelectProps, ctx: SetupContext, multipleOption: useMultipleOption): useMultipleReturn {
  const { filterQuery, isSupportFilter, isObjectOption, mergeOptions, injectOptions, getValuesOption, getInjectOptions } = multipleOption;

  const getMultipleSelected = (items: (string | number)[]) => {
    if (mergeOptions.value.length) {
      ctx.emit(
        'value-change',
        getValuesOption(items).filter((item) => (item ? true : false))
      );
    } else if (isObjectOption.value) {
      const selectItems = getInjectOptions(items).filter((item) => (item ? true : false));
      ctx.emit('value-change', selectItems);
    } else {
      ctx.emit('value-change', items);
    }
  };
  const multipleValueChange = (item: OptionObjectItem) => {
    let { modelValue } = props;

    const checkedItems = Array.isArray(modelValue) ? modelValue.slice() : [];
    const index = checkedItems.indexOf(item.value);
    const option = getInjectOptions([item.value])[0];
    if (option) {
      option._checked = !option._checked;
    }
    const mergeOption = getValuesOption([item.value])[0];
    if (mergeOption) {
      mergeOption._checked = !mergeOption._checked;
    }
    if (index > -1) {
      checkedItems.splice(index, 1);
    } else {
      checkedItems.push(item.value);
    }
    modelValue = checkedItems;
    ctx.emit('update:modelValue', modelValue);
    if (item.create) {
      filterQuery.value = '';
    }
    if (isSupportFilter.value) {
      focus();
    }
    getMultipleSelected(checkedItems);
  };

  const tagDelete = (data: OptionObjectItem) => {
    const checkedItems = [];
    for (const child of injectOptions.value.values()) {
      if (data.value === child.value) {
        child._checked = false;
      }
      if (child._checked) {
        checkedItems.push(child.value);
      }
    }
    ctx.emit('update:modelValue', checkedItems);
    ctx.emit('remove-tag', data.value);
    getMultipleSelected(checkedItems);
  };

  return {
    multipleValueChange,
    tagDelete,
  };
}
