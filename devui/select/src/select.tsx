import { defineComponent, ref, Transition, toRefs, computed } from 'vue';
import {
  selectProps,
  SelectProps,
  OptionObjectItem,
} from './use-select';
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
    const containerRef = ref(null)
    const dropdownRef = ref(null)
    const isOpen = ref<boolean>(false);
    function toggleChange(bool: boolean) {
      isOpen.value = bool;
      ctx.emit('toggleChange', bool);
    }
    useSelectOutsideClick([containerRef, dropdownRef], isOpen, toggleChange)

    const mergeOptions = computed(() => {
      return props.options.map((item) => {
        let option: OptionObjectItem;
        if (typeof item === 'object') {
          option = {
            name: item.name ? item.name : item.value + '',
            value: item.value,
            checked: false,
            ...item,
          };
        } else {
          option = {
            name: item + '',
            value: item,
            checked: false,
          };
        }

        return option;
      });
    });

    const getValuesOption = useCacheOptions(mergeOptions);

    const inputValue = computed(() => {
      if (props.multiple && Array.isArray(props.modelValue)) {
        const selectedOptions = getValuesOption(props.modelValue);
        return selectedOptions.map((item) => item.name).join(',');
      } else if (!Array.isArray(props.modelValue)) {
        return getValuesOption([props.modelValue])[0]?.name || '';
      }
      return ''
    });

    function valueChange(item: OptionObjectItem, index: number) {
      let { modelValue } = props
      if (props.multiple) {
        item.checked = !item.checked
        modelValue = mergeOptions.value.filter(item => item.checked).map(item => item.value)
        ctx.emit('update:modelValue', modelValue);
      } else {
        ctx.emit('update:modelValue', item.value);
        toggleChange(false);
      }
      ctx.emit('valueChange', item, index);
    }

    function getItemClassName(item: OptionObjectItem) {
      return className('devui-select-item', {
        active: item.value === props.modelValue,
      });
    }

    return {
      ...toRefs(props),
      isOpen,
      containerRef,
      dropdownRef,
      inputValue,
      mergeOptions,
      valueChange,
      toggleChange,
      getItemClassName,
    };
  },
  render() {
    const {
      mergeOptions,
      isOpen,
      inputValue,
      size,
      multiple,
      placeholder,
      overview,
      valueChange,
      toggleChange,
      getItemClassName,
    } = this;

    const selectClassName = className('devui-select', {
      'devui-select-open': isOpen,
      'devui-dropdown-menu-multiple': multiple,
      'devui-select-lg': size === 'lg',
      'devui-select-sm': size === 'sm',
      'devui-select-underlined': overview === 'underlined',
    });

    const inputClassName = className('devui-select-input', {
      'devui-select-input-lg': size === 'lg',
      'devui-select-input-sm': size === 'sm',
    });

    return (
      <div class={selectClassName} ref="containerRef">
        <div class="devui-select-selection">
          <input
            value={inputValue}
            type="text"
            class={inputClassName}
            placeholder={placeholder}
            readonly
            onClick={() => toggleChange(!isOpen)}
          />
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
                    e.preventDefault()
                    e.stopPropagation()
                    valueChange(item, i);
                  }}
                  class={getItemClassName(item)}
                  key={i}
                >
                  {multiple ? (
                    <Checkbox modelValue={item.checked} label={item.name}/>
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
