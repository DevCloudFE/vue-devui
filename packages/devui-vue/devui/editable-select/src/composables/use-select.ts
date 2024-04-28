import { computed, ComputedRef, getCurrentInstance, nextTick, onMounted, reactive, ref, Ref, SetupContext, watch } from 'vue';
import { EditableSelectProps, Option, Options } from '../editable-select-types';
import { createI18nTranslate } from '../../../locale/create';
import { isFunction, isNil } from 'lodash';

export interface UseSelectStatesReturnType {
  hoveringIndex: number;
  selectedIndex: number;
  query: string;
  inputValue: string;
  selectedLabel: string;
  isFocus: boolean;
  visible: boolean;
  softFocus: boolean;
  isSilentBlur: boolean;
  inputHovering: boolean;
}

interface UseSelectReturnType {
  cachedOptions: Ref<Options>;
  filteredOptions: ComputedRef<Options>;
  emptyText: ComputedRef<string>;
  showClearable: ComputedRef<boolean>;
  toggleMenu: () => void;
  handleOptionSelect: (option: Option, byClick: boolean) => void;
  scrollToItem: (index: number) => void;
}

export type States = UseSelectStatesReturnType;

export function useSelectStates(): UseSelectStatesReturnType {
  return reactive({
    hoveringIndex: -1,
    selectedIndex: -1,
    query: '',
    inputValue: '',
    selectedLabel: '',
    isFocus: false,
    visible: false,
    softFocus: false,
    isSilentBlur: false,
    inputHovering: false,
  });
}

export function useSelect(
  dropdownRef: Ref,
  props: EditableSelectProps,
  states: States,
  setSoftFocus: () => void,
  ctx: SetupContext
): UseSelectReturnType {
  const app = getCurrentInstance();
  const t = createI18nTranslate('DEditableSelect', app);
  const cachedOptions = ref(props.options);

  const hasCustomFilter = () => {
    return (props.remote && isFunction(props.remoteMethod)) || isFunction(props.filterMethod);
  };

  // computed
  const filteredOptions = computed(() => {
    return cachedOptions.value.filter((option) => {
      if (hasCustomFilter()) {
        return true;
      }
      return option.label.toLocaleLowerCase().includes(states.query.toLocaleLowerCase().trim());
    });
  });

  const emptyText = computed(() => {
    let text = '';
    props.remote ? (text = t('noData')) : (text = t('noRelatedRecords'));
    return text;
  });

  const showClearable = computed(() => {
    const hasModelValue = !isNil(props.modelValue) && props.modelValue !== '';
    return props.allowClear && !props.disabled && states.inputHovering && hasModelValue;
  });

  const toggleMenu = () => {
    if (!props.disabled) {
      states.visible = !states.visible;
    }
  };

  const updateIndex = (index: number) => {
    states.hoveringIndex = index;
    states.selectedIndex = index;
  };

  // mounted 时设置v-model绑定值对应的label
  const setSelected = () => {
    const options = cachedOptions.value;
    if (!isNil(props.modelValue)) {
      const index = options.findIndex((option) => option.value === props.modelValue);
      if (index !== -1) {
        states.inputValue = options[index].label;
        states.selectedLabel = options[index].label;
        updateIndex(index);
      } else {
        states.inputValue = `${props.modelValue}`;
        states.selectedLabel = `${props.modelValue}`;
      }
    } else {
      states.inputValue = '';
    }
  };

  const handleOptionSelect = (option: Option, byClick: boolean) => {
    ctx.emit('update:modelValue', option.value);
    ctx.emit('change', option.value);
    states.isSilentBlur = byClick;
    setSoftFocus();
    states.visible = false;
  };

  const scrollToItem = (idx: number) => {
    const ul = dropdownRef.value;
    const li = ul.children[idx];

    nextTick(() => {
      if (li.scrollIntoViewIfNeeded) {
        li.scrollIntoViewIfNeeded(false);
      } else {
        const containerInfo = ul.getBoundingClientRect();
        const elementInfo = li.getBoundingClientRect();
        if (elementInfo.bottom > containerInfo.bottom || elementInfo.top < containerInfo.top) {
          li.scrollIntoView(false);
        }
      }
    });
  };

  watch(
    () => states.visible,
    (visible) => {
      if (visible) {
        states.selectedIndex !== -1 &&
          nextTick(() => {
            scrollToItem(states.selectedIndex);
          });
      } else {
        states.query = '';
        states.inputValue = states.selectedLabel;
      }
      ctx.emit('visibleChange', visible);
    }
  );

  watch(
    () => props.modelValue,
    () => {
      setSelected();
    }
  );

  watch(
    () => props.options,
    (newOptions) => {
      cachedOptions.value = newOptions;
    }
  );

  onMounted(() => {
    setSelected();
  });

  return {
    cachedOptions,
    filteredOptions,
    emptyText,
    showClearable,
    toggleMenu,
    handleOptionSelect,
    scrollToItem,
  };
}
