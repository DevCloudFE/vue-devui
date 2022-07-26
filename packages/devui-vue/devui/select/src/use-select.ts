import { ref, computed, Ref, inject, watch } from 'vue';
import type { SetupContext } from 'vue';
import { SelectProps, OptionObjectItem, UseSelectReturnType } from './select-types';
import { className, KeyType } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { onClickOutside } from '@vueuse/core';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../form';

export default function useSelect(
  props: SelectProps,
  ctx: SetupContext,
  focus: () => void,
  blur: () => void,
  isSelectFocus: Ref<boolean>
): UseSelectReturnType {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const ns = useNamespace('select');
  const containerRef = ref<HTMLElement>();
  const dropdownRef = ref<HTMLElement>();

  const selectDisabled = computed(() => formContext?.disabled || props.disabled);
  const selectSize = computed(() => formContext?.size || props.size);
  const isObjectOption = ref(false);

  const originRef = ref<HTMLElement>();
  const dropdownWidth = computed(() => {
    if (!originRef?.value?.clientWidth) {
      return '100%';
    }
    return originRef.value.clientWidth + 'px';
  });

  // 控制弹窗开合
  const isOpen = ref<boolean>(false);
  const toggleChange = (bool: boolean) => {
    if (selectDisabled.value) {
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
      [ns.m('lg')]: selectSize.value === 'lg',
      [ns.m('sm')]: selectSize.value === 'sm',
      [ns.m('underlined')]: props.overview === 'underlined',
      [ns.m('disabled')]: selectDisabled.value,
      [ns.m('focus')]: isSelectFocus.value,
    });
  });

  // 这里对d-select组件options做统一处理,此options只用作渲染option列表
  const cacheOptions = new Map();
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
      cacheOptions.set(option.value, option);
      return option;
    });
  });

  // 缓存options，用value来获取对应的optionItem
  const getValuesOption = (values: KeyType<OptionObjectItem, 'value'>[]) => values.map((value) => cacheOptions.get(value));

  // 这里处理d-option组件生成的Options
  const injectOptions = ref(new Map());
  const updateInjectOptions = (item: Record<string, unknown>, operation: string, isObject: boolean) => {
    if (operation === 'add') {
      injectOptions.value.set(item.value, item);
    } else if (operation === 'delete') {
      if (injectOptions.value.get(item.value)) {
        injectOptions.value.delete(item.value);
      }
    }
    isObjectOption.value = isObject;
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

  const injectOptionsArray = computed(() => Array.from(injectOptions.value.values()));

  // 当前选中的项
  const selectedOptions = computed<OptionObjectItem[]>(() => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      return getInjectOptions(props.modelValue).filter((item) => (item ? true : false));
    } else if (!Array.isArray(props.modelValue)) {
      return getInjectOptions([props.modelValue]).filter((item) => (item ? true : false));
    }
    return [];
  });

  const onClick = function (e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleChange(!isOpen.value);
  };

  const getSingleSelected = (item: OptionObjectItem) => {
    if (mergeOptions.value.length) {
      ctx.emit('value-change', getValuesOption([item.value])[0]);
    } else if (isObjectOption.value) {
      ctx.emit('value-change', item);
    } else {
      ctx.emit('value-change', item.value);
    }
  };

  const valueChange = (item: OptionObjectItem) => {
    ctx.emit('update:modelValue', item.value);
    getSingleSelected(item);
    toggleChange(false);
  };

  const handleClose = () => {
    isOpen.value = false;
    ctx.emit('toggle-change', false);
  };

  const handleClear = () => {
    if (props.multiple) {
      ctx.emit('update:modelValue', []);
      ctx.emit('value-change', []);
    } else {
      ctx.emit('update:modelValue', '');
      ctx.emit('value-change', '');
    }
    ctx.emit('clear');
    if (isOpen.value) {
      handleClose();
      blur();
    }
  };

  const onFocus = (e: FocusEvent) => {
    ctx.emit('focus', e);
    if (!selectDisabled.value) {
      isSelectFocus.value = true;
    }
  };

  const onBlur = (e: FocusEvent) => {
    ctx.emit('blur', e);
    if (!selectDisabled.value) {
      isSelectFocus.value = false;
    }
  };

  const isDisabled = (item: OptionObjectItem): boolean => {
    const checkOptionDisabledKey = props.optionDisabledKey ? !!item[props.optionDisabledKey] : false;
    if (!props.multiple) {
      return checkOptionDisabledKey;
    } else {
      let tempModelValue = [];
      tempModelValue = props.modelValue as Array<number | string>;
      return (
        checkOptionDisabledKey ||
        (!!props.multipleLimit && props.multipleLimit <= tempModelValue.length && !tempModelValue.includes(item.value))
      );
    }
  };

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    },
    { deep: true }
  );

  return {
    selectDisabled,
    selectSize,
    containerRef,
    originRef,
    dropdownRef,
    isOpen,
    selectCls,
    isObjectOption,
    mergeOptions,
    injectOptions,
    injectOptionsArray,
    selectedOptions,
    dropdownWidth,
    onClick,
    handleClear,
    valueChange,
    handleClose,
    updateInjectOptions,
    onFocus,
    onBlur,
    isDisabled,
    toggleChange,
    getValuesOption,
    getInjectOptions,
  };
}
