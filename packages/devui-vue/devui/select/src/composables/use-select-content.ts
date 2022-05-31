import { computed, inject, ref } from 'vue';
import { SELECT_TOKEN } from '../const';
import { SelectContentProps, OptionObjectItem, UseSelectContentReturnType } from '../select-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { className } from '../utils';
import { isFunction } from 'lodash';

export default function useSelectContent(props: SelectContentProps): UseSelectContentReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN);

  const searchQuery = ref('');
  const selectedData = computed<OptionObjectItem[]>(() => {
    return select?.selectedOptions || [];
  });

  const isSelectDisable = computed<boolean>(() => !!select?.disabled);
  const isSupportCollapseTags = computed<boolean>(() => !!select?.collapseTags);
  const isSupportTagsTooltip = computed<boolean>(() => !!select?.collapseTagsTooltip);
  const isReadOnly = computed<boolean>(() => {
    if (select) {
      return isFunction(select.filter) ? false : !(typeof select.filter === 'boolean' && select.filter);
    } else {
      return true;
    }
  });

  // 是否可清空
  const mergeClearable = computed<boolean>(() => {
    return !isSelectDisable.value && !!select?.allowClear && props.value.length > 0;
  });

  // 是否禁用Tooltip
  const isDisabledTooltip = computed<boolean>(() => {
    return !isSupportTagsTooltip.value || !!select?.isOpen;
  });

  const selectionCls = computed(() => {
    return className(ns.e('selection'), {
      [ns.e('clearable')]: mergeClearable.value,
    });
  });

  const inputCls = computed(() => {
    return className(ns.e('input'), {
      [ns.em('input', 'lg')]: select?.size === 'lg',
      [ns.em('input', 'sm')]: select?.size === 'sm',
    });
  });

  const placeholder = computed<string>(() => (props.value.length > 0 ? '' : select?.placeholder || ''));

  const isMultiple = computed<boolean>(() => !!select?.multiple);

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    select?.handleClear();
  };

  const tagDelete = (data: OptionObjectItem) => {
    if (data && data.value) {
      select?.tagDelete(data);
    }
  };

  const onFocus = (e: FocusEvent) => {
    select?.onFocus(e);
  };

  const onBlur = (e: FocusEvent) => {
    select?.onBlur(e);
  };

  const queryFilter = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const query = (e.target as HTMLInputElement).value;
    if (!isReadOnly.value && select?.debounceQueryFilter) {
      select?.debounceQueryFilter(query);
    }
  };

  return {
    searchQuery,
    selectedData,
    isSelectDisable,
    isSupportCollapseTags,
    isDisabledTooltip,
    isReadOnly,
    selectionCls,
    inputCls,
    placeholder,
    isMultiple,
    handleClear,
    tagDelete,
    onFocus,
    onBlur,
    queryFilter,
  };
}
