import { defineComponent, provide, reactive, Transition, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import useSelect from './use-select';
import { selectProps, SelectProps, SelectContext } from './select-types';
import { SELECT_TOKEN } from './const';
import { Checkbox } from '../../checkbox';
import Option from './components/option';
import { useNamespace } from '../../shared/hooks/use-namespace';
import SelectContent from './components/select-content';
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
      selectedOptions,
      onClick,
      valueChange,
      handleClear,
      updateInjectOptions,
      tagDelete
    } = useSelect(props, ctx);

    const scrollbarNs = useNamespace('scrollbar');
    const ns = useNamespace('select');
    const dropdownCls = ns.e('dropdown');
    const listCls = {
      [ns.e('dropdown-list')]: true,
      [scrollbarNs.b()]: true,
    };

    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        selectedOptions,
        emit: ctx.emit,
        valueChange,
        handleClear,
        updateInjectOptions,
        tagDelete
      }) as SelectContext
    );
    return () => {
      return (
        <div class={selectCls.value} ref={containerRef} onClick={onClick}>
          <SelectContent value={inputValue.value}></SelectContent>
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
