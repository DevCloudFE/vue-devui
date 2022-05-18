import { defineComponent, provide, reactive, Transition, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import useSelect from './use-select';
import { selectProps, SelectProps, SELECT_TOKEN } from './select-types';
import { Icon } from '../../icon';
import { Checkbox } from '../../checkbox';
import Option from './option';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './select.scss';

export default defineComponent({
  name: 'DSelect',
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
      })
    );

    return () => {
      return (
        <div class={selectCls.value} ref={containerRef}>
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
                {mergeOptions.value.map((item, i) => (
                  <Option key={i} value={item.value} data={item} label={item.name} index={i}>
                    {props.multiple ? (
                      <Checkbox
                        modelValue={item._checked}
                        label={item.name}
                        disabled={props.optionDisabledKey ? !!item[props.optionDisabledKey] : false}
                      />
                    ) : (
                      item.name
                    )}
                  </Option>
                ))}
              </ul>
            </div>
          </Transition>
        </div>
      );
    };
  },
});
