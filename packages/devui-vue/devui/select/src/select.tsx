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
  emits: ['toggle-change', 'value-change', 'update:modelValue', 'focus', 'blur'],
  setup(props: SelectProps, ctx: SetupContext) {
    const {
      containerRef,
      selectRef,
      dropdownRef,
      isOpen,
      selectCls,
      mergeOptions,
      inputValue,
      selectedOptions,
      filterQuery,
      onClick,
      valueChange,
      handleClear,
      updateInjectOptions,
      tagDelete,
      onFocus,
      onBlur,
      debounceQueryFilter,
      isShowCreateOption,
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
        isOpen,
        selectedOptions,
        filterQuery,
        valueChange,
        handleClear,
        updateInjectOptions,
        tagDelete,
        onFocus,
        onBlur,
        debounceQueryFilter,
      }) as SelectContext
    );
    return () => {
      return (
        <div class={selectCls.value} ref={containerRef} onClick={onClick}>
          <SelectContent ref={selectRef} value={inputValue.value}></SelectContent>
          <div name="fade" ref={dropdownRef}>
            <div v-show={isOpen.value} class={dropdownCls}>
              <ul class={listCls}>
                {isShowCreateOption.value && (
                  <Option value={filterQuery.value} name={filterQuery.value} create>
                    {props.multiple ? <Checkbox modelValue={false} label={filterQuery.value} /> : filterQuery.value}
                  </Option>
                )}
                {ctx.slots?.default && ctx.slots.default()}
                {!ctx.slots?.default &&
                  mergeOptions.value.length >= 1 &&
                  mergeOptions.value.map((item, i) => (
                    <Option
                      key={i}
                      value={item.value}
                      name={item.name}
                      disabled={props.optionDisabledKey ? !!item[props.optionDisabledKey] : false}>
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
                  ))}
              </ul>
            </div>
          </div>
        </div>
      );
    };
  },
});
