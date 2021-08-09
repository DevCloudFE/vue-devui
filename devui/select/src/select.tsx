import './select.scss';
import { defineComponent, ref, Transition, toRefs } from 'vue';
import { selectProps, SelectProps, OptionItem } from './use-select';
import DIcon from '../../icon/src/icon';
import { className } from './utils';

export default defineComponent({
  name: 'DSelect',
  props: selectProps,
  emits: ['toggleChange', 'valueChange', 'update:modelValue'],
  setup(props: SelectProps, ctx) {
    const isOpen = ref<boolean>(false);
    function toggleChange(bool: boolean) {
      isOpen.value = bool;
      ctx.emit('toggleChange', bool);
    }

    const inputValue = ref<string>(props.modelValue + '');
    initInputValue();

    function initInputValue() {
      props.options.forEach((item) => {
        if (typeof item === 'object' && item.value === props.modelValue) {
          inputValue.value = item.name;
        }
      });
    }

    function valueChange(item: OptionItem, index: number) {
      const value = typeof item === 'object' ? item.value : item;
      inputValue.value = getInputValue(item);
      ctx.emit('update:modelValue', value);
      ctx.emit('valueChange', item, index);
      toggleChange(false);
    }

    function getItemClassName(item: OptionItem) {
      const value = typeof item === 'object' ? item.value : item;
      return className('devui-select-item', {
        active: value === props.modelValue,
      });
    }

    function getInputValue(item: OptionItem) {
      const value = typeof item === 'object' ? item.name : item;
      return value + '';
    }

    return {
      isOpen,
      inputValue,
      valueChange,
      toggleChange,
      getItemClassName,
      ...toRefs(props),
    };
  },
  render() {
    const {
      options,
      isOpen,
      inputValue,
      size,
      placeholder,
      overview,
      valueChange,
      toggleChange,
      getItemClassName,
    } = this;

    const selectClassName = className('devui-select', {
      'devui-select-open': isOpen,
      'devui-select-lg': size === 'lg',
      'devui-select-sm': size === 'sm',
      'devui-select-underlined': overview === 'underlined',
    });

    const inputClassName = className('devui-select-input', {
      'devui-select-input-lg': size === 'lg',
      'devui-select-input-sm': size === 'sm',
    });

    return (
      <div class={selectClassName}>
        <div class="devui-select-selection">
          <input
            value={inputValue}
            type="text"
            class={inputClassName}
            placeholder={placeholder}
            readonly
            onClick={() => toggleChange(!isOpen)}
            onBlur={() => toggleChange(false)}
          />
          <span class="devui-select-arrow">
            <DIcon name="select-arrow" />
          </span>
        </div>
        <Transition name="fade">
          <div v-show={isOpen} class="devui-select-dropdown">
            <ul class="devui-select-dropdown-list devui-scrollbar">
              {options.map((item, i) => (
                <li
                  onClick={() => {
                    valueChange(item, i);
                  }}
                  class={getItemClassName(item)}
                  key={i}
                >
                  {typeof item === 'object' ? item.name : item}
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      </div>
    );
  },
});
