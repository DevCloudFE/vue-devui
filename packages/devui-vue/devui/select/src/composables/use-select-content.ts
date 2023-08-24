import { computed, inject, ref, getCurrentInstance } from 'vue';
import { SELECT_TOKEN } from '../const';
import { FORM_ITEM_TOKEN, STYLE_TOKEN } from '../../../form';
import { OptionObjectItem, UseSelectContentReturnType } from '../select-types';
import { useNamespace } from '@devui/shared/utils';
import { className } from '../utils';
import { isFunction } from 'lodash';
import { createI18nTranslate } from '../../../locale/create';

export default function useSelectContent(): UseSelectContentReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const styleType = inject(STYLE_TOKEN, undefined);

  const app = getCurrentInstance();
  const t = createI18nTranslate('DSelect', app);

  const searchQuery = ref('');
  const singleSearchKey = ref('');
  const singleInputRef = ref();

  const singlePlaceholderWidth = computed(() => (select?.dropdownWidth ? `${select?.dropdownWidth - 40}px` : 'auto'));

  const selectedData = computed<OptionObjectItem[]>(() => {
    return select?.selectedOptions || [];
  });

  const isSelectDisable = computed<boolean>(() => !!select?.selectDisabled);
  const isSupportCollapseTags = computed<boolean>(() => !!select?.collapseTags);
  const isSupportTagsTooltip = computed<boolean>(() => !!select?.collapseTagsTooltip);
  const isValidateError = computed(() => formItemContext?.validateState === 'error');
  const isReadOnly = computed<boolean>(() => {
    if (select) {
      return isFunction(select.filter) ? false : !(typeof select.filter === 'boolean' && select.filter);
    } else {
      return true;
    }
  });

  const displayInputValue = computed(() => {
    if (select?.selectedOptions) {
      return select.selectedOptions.length > 1
        ? select.selectedOptions.map((item) => item?.name || item?.value || '').join(',')
        : select.selectedOptions[0]?.name || '';
    } else {
      return '';
    }
  });

  const isPlaceholderDark = computed(() => {
    if (!singleSearchKey.value) {
      if (isSelectDisable.value) {
        return false;
      }
      if (!displayInputValue.value) {
        return true;
      } else {
        return select?.isSelectFocus;
      }
    } else {
      return false;
    }
  });

  // 是否可清空
  const mergeClearable = computed<boolean>(() => {
    return !isSelectDisable.value && !!select?.allowClear && (displayInputValue.value ? true : false);
  });

  // 是否禁用Tooltip
  const isDisabledTooltip = computed<boolean>(() => {
    return !isSupportTagsTooltip.value || !!select?.isOpen;
  });

  const isSupportFilter = computed(() => isFunction(select?.filter) || (typeof select?.filter === 'boolean' && select?.filter));

  const selectionCls = computed(() => {
    return className(ns.e('selection'), {
      [ns.e('clearable')]: mergeClearable.value,
      [ns.em('selection', 'error')]: isValidateError.value,
      [ns.em('selection', 'gray-style')]: styleType === 'gray',
    });
  });

  const inputCls = computed(() => {
    return className(ns.e('input'), {
      [ns.em('input', 'lg')]: select?.selectSize === 'lg',
      [ns.em('input', 'sm')]: select?.selectSize === 'sm',
    });
  });

  const tagSize = computed(() => select?.selectSize || 'sm');

  const placeholder = computed<string>(() => (displayInputValue.value ? '' : select?.placeholder || t('placeholder')));

  const singlePlaceholder = computed<string>(() => select?.placeholder || t('placeholder'));

  const isMultiple = computed<boolean>(() => !!select?.multiple);

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    searchQuery.value = '';
    singleSearchKey.value = '';
    select?.handleClear();
  };

  const onSingleInputWrapClick = () => {
    if (!select?.selectDisabled) {
      singleInputRef.value.focus();
    }
  };

  const tagDelete = (data: OptionObjectItem) => {
    if (data && (data.value || data.value === 0)) {
      select?.tagDelete(data);
    }
  };

  const onFocus = (e: FocusEvent) => {
    select?.onFocus(e);
  };

  const onBlur = (e: FocusEvent) => {
    singleSearchKey.value = '';
    select?.onBlur(e);
  };

  const onMultipleClick = () => {
    if (select?.selectDisabled) {
      return;
    }
    if (select?.isOpen) {
      searchQuery.value = '';
      select?.onBlur();
    } else {
      select?.onFocus();
    }
  };

  const onArrowClick = () => {
    if (isMultiple.value) {
      onMultipleClick();
    }
  };

  const queryFilter = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const query = (e.target as HTMLInputElement).value;
    singleSearchKey.value = query;
    searchQuery.value = query;
    if (!isReadOnly.value && select?.debounceQueryFilter) {
      select?.debounceQueryFilter(query);
    }
  };

  return {
    singleInputRef,
    searchQuery,
    singleSearchKey,
    selectedData,
    isSelectDisable,
    isSupportCollapseTags,
    isDisabledTooltip,
    isSupportFilter,
    isReadOnly,
    selectionCls,
    inputCls,
    tagSize,
    placeholder,
    singlePlaceholder,
    singlePlaceholderWidth,
    isMultiple,
    displayInputValue,
    isPlaceholderDark,
    onSingleInputWrapClick,
    handleClear,
    tagDelete,
    onFocus,
    onBlur,
    onMultipleClick,
    onArrowClick,
    queryFilter,
  };
}
