import { defineComponent, ref, Transition, computed } from 'vue';
import { selectProps, SelectProps, OptionObjectItem } from './use-select';
import { Icon } from '../../icon';
import { Checkbox } from '../../checkbox';
import { className } from './utils';
import useCacheOptions from '../hooks/use-cache-options';
import useSelectOutsideClick from '../hooks/use-select-outside-click';
import './select.scss';

export default defineComponent({
  name: 'DSelect',
  props: selectProps,
  emits: ['toggleChange', 'valueChange', 'update:modelValue'],
  setup(props: SelectProps, ctx) {
    const containerRef = ref(null);
    const dropdownRef = ref(null);
    // 控制弹窗开合
    const isOpen = ref<boolean>(false);
    function toggleChange(bool: boolean) {
      if (props.disabled) {return;}
      isOpen.value = bool;
      ctx.emit('toggleChange', bool);
    }
    useSelectOutsideClick([containerRef, dropdownRef], isOpen, toggleChange);

    // 这里对options做统一处理
    const mergeOptions = computed(() => {
      const { multiple, modelValue } = props;
      return props.options.map((item) => {
        let option: OptionObjectItem;
        if (typeof item === 'object') {
          option = {
            name: item.name ? item.name : item.value + '',
            value: item.value,
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
    // 控制输入框的显示内容
    const inputValue = computed<string>(() => {
      if (props.multiple && Array.isArray(props.modelValue)) {
        const selectedOptions = getValuesOption(props.modelValue);
        return selectedOptions.map((item) => item.name).join(',');
      } else if (!Array.isArray(props.modelValue)) {
        return getValuesOption([props.modelValue])[0]?.name || '';
      }
      return '';
    });
    // 是否可清空
    const mergeClearable = computed<boolean>(() => {
      return !props.disabled && props.allowClear && inputValue.value.length > 0;
    });

    function valueChange(item: OptionObjectItem, index: number) {
      const { multiple, optionDisabledKey: disabledKey } = props;
      let { modelValue } = props;
      if (disabledKey && !!item[disabledKey]) {return;}
      if (multiple) {
        item._checked = !item._checked;
        modelValue = mergeOptions.value
          .filter((item) => item._checked)
          .map((item) => item.value);
        ctx.emit('update:modelValue', modelValue);
      } else {
        ctx.emit('update:modelValue', item.value);
        toggleChange(false);
      }
      ctx.emit('valueChange', item, index);
    }

    function getItemClassName(item: OptionObjectItem) {
      const { optionDisabledKey: disabledKey } = props;
      return className('devui-select-item', {
        active: item.value === props.modelValue,
        disabled: disabledKey ? !!item[disabledKey] : false,
      });
    }

    function handleClear(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (props.multiple) {
        ctx.emit('update:modelValue', []);
      } else {
        ctx.emit('update:modelValue', '');
      }
    }

    return {
      isOpen,
      containerRef,
      dropdownRef,
      inputValue,
      mergeOptions,
      mergeClearable,
      valueChange,
      toggleChange,
      getItemClassName,
      handleClear,
    };
  },
  render() {
    const {
      mergeOptions,
      isOpen,
      inputValue,
      size,
      multiple,
      disabled,
      optionDisabledKey: disabledKey,
      placeholder,
      overview,
      valueChange,
      toggleChange,
      getItemClassName,
      mergeClearable,
      handleClear,
    } = this;

    const selectCls = className('devui-select', {
      'devui-select-open': isOpen,
      'devui-dropdown-menu-multiple': multiple,
      'devui-select-lg': size === 'lg',
      'devui-select-sm': size === 'sm',
      'devui-select-underlined': overview === 'underlined',
      'devui-select-disabled': disabled,
    });

    const inputCls = className('devui-select-input', {
      'devui-select-input-lg': size === 'lg',
      'devui-select-input-sm': size === 'sm',
    });

    const selectionCls = className('devui-select-selection', {
      'devui-select-clearable': mergeClearable,
    });

    return (
      <div class={selectCls} ref="containerRef">
        <div class={selectionCls} onClick={() => toggleChange(!isOpen)}>
          <input
            value={inputValue}
            type="text"
            class={inputCls}
            placeholder={placeholder}
            readonly
            disabled={disabled}
          />
          <span onClick={handleClear} class="devui-select-clear">
            <Icon name="close" />
          </span>
          <span class="devui-select-arrow">
            <Icon name="select-arrow" />
          </span>
        </div>
        <Transition name="fade" ref="dropdownRef">
          <div v-show={isOpen} class="devui-select-dropdown">
            <ul class="devui-select-dropdown-list devui-scrollbar">
              {mergeOptions.map((item, i) => (
                <li
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    valueChange(item, i);
                  }}
                  class={getItemClassName(item)}
                  key={i}
                >
                  {multiple ? (
                    <Checkbox
                      modelValue={item._checked}
                      label={item.name}
                      disabled={disabledKey ? !!item[disabledKey] : false}
                    />
                  ) : (
                    item.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      </div>
    );
  },
});
