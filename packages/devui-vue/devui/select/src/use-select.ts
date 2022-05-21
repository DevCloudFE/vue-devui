import { ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import { SelectProps, OptionObjectItem, UseSelectReturnType } from './select-types';
import { className, KeyType } from './utils';
import useCacheOptions from '../composables/use-cache-options';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default function useSelect(props: SelectProps, ctx: SetupContext): UseSelectReturnType {
  const ns = useNamespace('select');
  const containerRef = ref<HTMLElement>();
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
  // 缓存options，用value来获取对应的optionItem
  const getValuesOption = useCacheOptions(mergeOptions);

  // 这里处理d-option组件生成的Options
  const injectOptions = new Map();
  const updateInjectOptions = (item: Record<string, unknown> , operation:  string) => {
    if (operation === 'add') {
      injectOptions.set(item.value, item);
    } else if (operation === 'delete') {
      injectOptions.delete(item.value);
    }
  };

  const getInjectOptions = (values: KeyType<OptionObjectItem, 'value'>[]) => {
    return values.map((value) => injectOptions.get(value));
  };

  // 控制输入框的显示内容
  const inputValue = computed<string>(() => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      const selectedOptions = getInjectOptions(props.modelValue);
      return selectedOptions.map((item) => item?.name || item?.value || '').join(',');
    } else if (!Array.isArray(props.modelValue)) {
      const selectedOption = getInjectOptions([props.modelValue])[0];
      return selectedOption?.name || selectedOption?.value || '';
    }
    return '';
  });
  // 是否可清空
  const mergeClearable = computed<boolean>(() => {
    return !props.disabled && props.allowClear && inputValue.value.length > 0;
  });

  const selectionCls = computed(() => {
    return className(ns.e('selection'), {
      [ns.e('clearable')]: mergeClearable.value,
    });
  });

  const inputCls = computed(() => {
    return className(ns.e('input'), {
      [ns.em('input', 'lg')]: props.size === 'lg',
      [ns.em('input', 'sm')]: props.size === 'sm',
    });
  });

  const onClick = function (e: MouseEvent) {
    toggleChange(!isOpen.value);
  };

  const valueChange = (item: OptionObjectItem, isObjectOption: boolean) => {
    const { multiple } = props;
    let { modelValue } = props;
    item._checked = !item._checked;
    if (multiple) {
      const checkedItems = [];
      for(const child of injectOptions.value.values()) {
        if (child._checked) {
          checkedItems.push(child.value);
        }
      }
      modelValue = checkedItems;
      // 此处需要更新chckbox选中状态
      const mergeOptionItem = getValuesOption([item.value])[0];
      mergeOptionItem && (mergeOptionItem._checked = !mergeOptionItem._checked);
      ctx.emit('update:modelValue', modelValue);
    } else {
      ctx.emit('update:modelValue', item.value);
      toggleChange(false);
    }
    ctx.emit('value-change', isObjectOption ? item : item.value);
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.multiple) {
      ctx.emit('update:modelValue', []);
    } else {
      ctx.emit('update:modelValue', '');
    }
  };

  const handleClose = () => {
    isOpen.value = false;
    ctx.emit('toggle-change', false);
  };

  return {
    containerRef,
    dropdownRef,
    isOpen,
    selectCls,
    mergeOptions,
    inputValue,
    selectionCls,
    inputCls,
    onClick,
    handleClear,
    valueChange,
    handleClose,
    updateInjectOptions
  };
}
