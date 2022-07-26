import { computed } from 'vue';
import { SelectProps, useNoDataOption, useNoDataReturn } from '../select-types';

export default function useNoDataText(props: SelectProps, option: useNoDataOption): useNoDataReturn {
  const { filterQuery, isSupportFilter, injectOptionsArray, t } = option;

  // no-data-text
  const isLoading = computed(() => typeof props.loading === 'boolean' && props.loading);
  const emptyText = computed(() => {
    const visibleOptionsCount = injectOptionsArray.value.filter((item) => {
      const label = item.name || item.value;
      return label.toString().toLocaleLowerCase().includes(filterQuery.value.toLocaleLowerCase());
    }).length;
    if (isLoading.value) {
      return props.loadingText || (t('loadingText') as string);
    }
    if (isSupportFilter.value && filterQuery.value && injectOptionsArray.value.length > 0 && visibleOptionsCount === 0) {
      return props.noMatchText || (t('noMatchText') as string);
    }
    if (injectOptionsArray.value.length === 0) {
      return props.noDataText || (t('noDataText') as string);
    }
    return '';
  });

  const isShowEmptyText = computed(() => {
    return !!emptyText.value && (!props.allowCreate || isLoading.value || (props.allowCreate && injectOptionsArray.value.length === 0));
  });

  return {
    isLoading,
    emptyText,
    isShowEmptyText,
  };
}
