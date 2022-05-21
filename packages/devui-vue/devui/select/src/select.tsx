import { defineComponent, provide, reactive, Transition, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import useSelect from './use-select';
import { selectProps, SelectProps } from './select-types';
import { SELECT_TOKEN } from './const';
import { Icon } from '../../icon';
import { Checkbox } from '../../checkbox';
import Option from './option';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './select.scss';
import ClickOutside from '../../shared/devui-directive/clickoutside';

export default defineComponent({
  name: 'DSelect',
  directives: { ClickOutside },
  props: selectProps,
  emits: ['toggle-change', 'value-change', 'update:modelValue'],
  setup(props: SelectProps, ctx: SetupContext) {
    const {
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
    } = useSelect(props, ctx);

    const scrollbarNs = useNamespace('scrollbar');
    const ns = useNamespace('select');
    const clearCls = ns.e('clear');
    const arrowCls = ns.e('arrow');
    const dropdownCls = ns.e('dropdown');
    const listCls = {
      [ns.e('dropdown-list')]: true,
      [scrollbarNs.b()]: true,
    };

    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        emit: ctx.emit,
        valueChange,
        updateInjectOptions,
      })
    );

    return () => {
      return (
        <div class={selectCls.value} ref={containerRef} v-click-outside={handleClose}>
          <div class={selectionCls.value} onClick={onClick} ref="origin">
            <input
              value={inputValue.value}
              type="text"
              class={inputCls.value}
              placeholder={props.placeholder}
              readonly
              disabled={props.disabled}
            />
            <span onClick={handleClear} class={clearCls}>
              <Icon name="close" />
            </span>
            <span class={arrowCls}>
              <Icon name="select-arrow" />
            </span>
          </div>
          <Transition name="fade" ref={dropdownRef}>
            <div v-show={isOpen.value} class={dropdownCls}>
              <ul class={listCls}>
                {ctx.slots?.default ? ctx.slots.default()
                  : mergeOptions.value.map((item, i) => (
                    <Option
                      key={i}
                      value={item.value}
                      name={item.name}
                      disabled={props.optionDisabledKey ? !!item[props.optionDisabledKey] : false}
                    >
                      {props.multiple ? (
                        <Checkbox
                          modelValue={item._checked}
                          label={item.name}
                          disabled={props.optionDisabledKey ? !!item[props.optionDisabledKey] : false}
                        />
                      ) : (
                        item.name || item.value
                      )}
                    </Option>
                  ))
                }
              </ul>
            </div>
          </Transition>
        </div>
      );
    };
  },
});
