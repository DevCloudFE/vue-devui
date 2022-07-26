import { computed } from 'vue';
import { SelectProps, allowCreateOption, useAllowCreateReturn } from '../select-types';

export default function useAllowCreate(props: SelectProps, option: allowCreateOption): useAllowCreateReturn {
  const { filterQuery, injectOptionsArray } = option;

  // allow-create
  const isShowCreateOption = computed(() => {
    const hasCommonOption = injectOptionsArray.value.filter((item) => !item.create).some((item) => item.name === filterQuery.value);
    return typeof props.filter === 'boolean' && props.filter && props.allowCreate && !!filterQuery.value && !hasCommonOption;
  });

  return {
    isShowCreateOption,
  };
}
