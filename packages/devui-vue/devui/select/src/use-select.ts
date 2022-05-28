import { ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import { SelectProps, OptionObjectItem, UseSelectReturnType } from './select-types';
import { className, KeyType } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { onClickOutside } from '@vueuse/core';
import { isFunction, debounce } from 'lodash';

export default function useSelect(props: SelectProps, ctx: SetupContext): UseSelectReturnType {
  const ns = useNamespace('select');
  const containerRef = ref<HTMLElement>();
  const selectRef = ref<HTMLElement>();
  const dropdownRef = ref<HTMLElement>();

  // 控制弹窗开合
  const isOpen = ref<boolean>(false);
  const toggleChange = (bool: boolean) => {
    if (props.disabled) {
      return;
    }
    isOpen.value = bool;
    ctx.emit('toggle-change', bool);
  };
  onClickOutside(containerRef, () => {
    toggleChange(false);
  });

  const dropdownMenuMultipleNs = useNamespace('dropdown-menu-multiple');
  const selectCls = computed(() => {
    return className(ns.b(), {
      [ns.m('open')]: isOpen.value,
      [dropdownMenuMultipleNs.b()]: props.multiple,
      [ns.m('lg')]: props.size === 'lg',
      [ns.m('sm')]: props.size === 'sm',
      [ns.m('underlined')]: props.overview === 'underlined',
      [ns.m('disabled')]: props.disabled,
    });
  });

  // 这里对d-select组件options做统一处理,此options只用作渲染option列表
  const mergeOptions = computed(() => {
    const { multiple, modelValue } = props;
    return props.options.map((item) => {
      let option: OptionObjectItem;
      if (typeof item === 'object') {
        option = {
          name: item.name ? item.name : item.value + '',
          _checked: false,
          ...item,
        };
      } else {
        option = {
          name: item + '',
          value: item,
          _checked: false,
        };
      }
      if (multiple) {
        /**
         * TODO: 这里mergeOptions依赖了modelValue
         * 但是下面点击item更新的时候modelValue又是根据mergeOptions来算出来的
         * 因此可能会多更新一次，后续优化
         */
        if (Array.isArray(modelValue)) {
          option._checked = modelValue.includes(option.value);
        } else {
          option._checked = false;
        }
      }
      return option;
    });
  });

  // 这里处理d-option组件生成的Options
  const injectOptions = ref(new Map());
  const updateInjectOptions = (item: Record<string, unknown>, operation: string) => {
    if (operation === 'add') {
      injectOptions.value.set(item.value, item);
    } else if (operation === 'delete') {
      injectOptions.value.delete(item.value);
    }
  };

  const getInjectOptions = (values: KeyType<OptionObjectItem, 'value'>[]) => {
    return values.map((value) => {
      if (props.multiple && props.allowCreate) {
        const option = injectOptions.value.get(value);
        if (option) {
          return option;
        }
        const newOption = {
          name: value,
          value: value,
          _checked: false,
        };
        return value ? newOption : option;
      } else {
        return injectOptions.value.get(value);
      }
    });
  };

  const selectedOptions = ref<OptionObjectItem[]>([]);
  const filterQuery = ref('');

  // 控制输入框的显示内容
  // todo injectOptions根据option进行收集，此computed会执行多次; Vue Test Utils: [Vue warn]: Maximum recursive updates exceeded in component <DSelect>
  // 目前看该警告和下拉面板使用Transition也有关
  const inputValue = computed<string>(() => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      selectedOptions.value = getInjectOptions(props.modelValue).filter((item) => !!item);
      return selectedOptions.value.map((item) => item?.name || item?.value || '').join(',');
    } else if (!Array.isArray(props.modelValue)) {
      selectedOptions.value = getInjectOptions([props.modelValue]).filter((item) => !!item);
      return selectedOptions.value[0]?.name || '';
    }
    return '';
  });

  const onClick = function (e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleChange(!isOpen.value);
  };

  const isSupportFilter = computed(() => isFunction(props.filter) || (typeof props.filter === 'boolean' && props.filter));

  const getSelectInput = () => {
    const selectContentRefs = selectRef.value?.$refs;
    return selectContentRefs.input as HTMLElement;
  };

  const valueChange = (item: OptionObjectItem, isObjectOption: boolean) => {
    const { multiple } = props;
    let { modelValue } = props;
    if (multiple) {
      const checkedItems = Array.isArray(modelValue) ? modelValue.slice() : [];
      const index = checkedItems.indexOf(item.value);
      const option = getInjectOptions([item.value])[0];
      if (option) {
        option._checked = !option._checked;
      }
      if (index > -1) {
        checkedItems.splice(index);
      } else {
        checkedItems.push(item.value);
      }
      modelValue = checkedItems;
      ctx.emit('update:modelValue', modelValue);
      if (item.create) {
        filterQuery.value = '';
      }
      if (isSupportFilter.value && getSelectInput()) {
        getSelectInput()?.focus();
      }
    } else {
      ctx.emit('update:modelValue', item.value);
      toggleChange(false);
    }
    ctx.emit('value-change', isObjectOption ? item : item.value);
  };

  const handleClose = () => {
    isOpen.value = false;
    ctx.emit('toggle-change', false);
  };

  const handleClear = () => {
    if (props.multiple) {
      ctx.emit('update:modelValue', []);
    } else {
      ctx.emit('update:modelValue', '');
    }
    if (isOpen.value) {
      handleClose();
    }
  };

  const tagDelete = (data: OptionObjectItem) => {
    let { modelValue } = props;
    data._checked = !data._checked;
    const checkedItems = [];
    for (const child of injectOptions.value.values()) {
      if (child._checked) {
        checkedItems.push(child.value);
      }
    }
    modelValue = checkedItems;
    ctx.emit('update:modelValue', modelValue);
  };

  const onFocus = (e: FocusEvent) => {
    ctx.emit('focus', e);
  };

  const onBlur = (e: FocusEvent) => {
    ctx.emit('blur', e);
  };

  const queryChange = (query: string) => {
    filterQuery.value = query;
  };

  const isLoading = ref(false);
  const debounceTime = computed(() => (props.remote ? 300 : 0));

  const isUpdateSuccess = () => {
    isLoading.value = false;
  };
  const handlerQueryFunc = (query: string) => {
    if (isFunction(props.filter)) {
      if (props.remote) {
        isLoading.value = true;
      }
      props.filter(query, isUpdateSuccess);
    } else {
      queryChange(query);
    }
  };

  const debounceQueryFilter = debounce((query: string) => {
    handlerQueryFunc(query);
  }, debounceTime.value);

  // allow-create
  const injectOptionsArray = computed(() => Array.from(injectOptions.value.values()));
  const isShowCreateOption = computed(() => {
    const hasCommonOption = injectOptionsArray.value.filter((item) => !item.create).some((item) => item.name === filterQuery.value);
    return typeof props.filter === 'boolean' && props.filter && props.allowCreate && !!filterQuery.value && !hasCommonOption;
  });

  // no-data-text
  const emptyText = computed(() => {
    if (isLoading.value) {
      return props.loadingText;
    }
    if (injectOptionsArray.value.length === 0 && filterQuery.value === '') {
      return props.noDataText;
    }
    if (isSupportFilter.value && filterQuery.value && injectOptionsArray.value.length > 0) {
      return props.noMatchText;
    }
    return '';
  });

  const isShowEmptyText = computed(() => {
    return !!emptyText.value && (!props.allowCreate || isLoading.value || (props.allowCreate && injectOptionsArray.value.length === 0));
  });

  return {
    containerRef,
    selectRef,
    dropdownRef,
    isOpen,
    selectCls,
    mergeOptions,
    inputValue,
    selectedOptions,
    filterQuery,
    emptyText,
    isLoading,
    isShowEmptyText,
    onClick,
    handleClear,
    valueChange,
    handleClose,
    updateInjectOptions,
    tagDelete,
    onFocus,
    onBlur,
    debounceQueryFilter,
    isShowCreateOption,
  };
}
