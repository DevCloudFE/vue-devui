import { defineComponent, provide, reactive, ref, Transition, toRefs, getCurrentInstance, onMounted } from 'vue';
import type { SetupContext } from 'vue';
import useSelect from './use-select';
import { selectProps, SelectProps, SelectContext } from './select-types';
import { SELECT_TOKEN } from './const';
import { Checkbox } from '../../checkbox';
import Option from './components/option';
import { useNamespace } from '../../shared/hooks/use-namespace';
import SelectContent from './components/select-content';
import useSelectFunction from './composables/use-select-function';
import useFilterSelect from './composables/use-filter-select';
import useMultipleSelect from './composables/use-multiple-select';
import useNoDataText from './composables/use-no-data-text';
import useAllowCreate from './composables/use-allow-create';
import './select.scss';
import { createI18nTranslate } from '../../locale/create';
import { FlexibleOverlay, Placement } from '../../overlay';

export default defineComponent({
  name: 'DSelect',
  props: selectProps,
  emits: ['toggle-change', 'value-change', 'update:modelValue', 'focus', 'blur', 'remove-tag', 'clear'],
  setup(props: SelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DSelect', app);

    const selectRef = ref<HTMLElement>();
    const { isSelectFocus, focus, blur } = useSelectFunction(props, selectRef);
    const { filterQuery, isSupportFilter, debounceQueryFilter } = useFilterSelect(props);
    const {
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
      valueChange,
      handleClear,
      updateInjectOptions,
      onFocus,
      onBlur,
      isDisabled,
      toggleChange,
      getValuesOption,
      getInjectOptions,
    } = useSelect(props, ctx, focus, blur, isSelectFocus);

    const { multipleValueChange, tagDelete } = useMultipleSelect(props, ctx, {
      filterQuery,
      isSupportFilter,
      isObjectOption,
      mergeOptions,
      injectOptions,
      getValuesOption,
      getInjectOptions,
    });

    const { isShowCreateOption } = useAllowCreate(props, { filterQuery, injectOptionsArray });

    const { isLoading, emptyText, isShowEmptyText } = useNoDataText(props, {
      filterQuery,
      isSupportFilter,
      injectOptionsArray,
      t,
    });

    const scrollbarNs = useNamespace('scrollbar');
    const ns = useNamespace('select');
    const dropdownCls = ns.e('dropdown');
    const listCls = {
      [ns.e('dropdown-list')]: true,
      [scrollbarNs.b()]: true,
    };
    const dropdownEmptyCls = ns.em('dropdown', 'empty');
    ctx.expose({ focus, blur, toggleChange });
    const isRender = ref<boolean>(false);
    const position = ref<Placement[]>(['bottom-start', 'top-start']);

    onMounted(() => {
      isRender.value = true;
    });

    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        selectDisabled,
        selectSize,
        isOpen,
        selectedOptions,
        filterQuery,
        valueChange,
        multipleValueChange,
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
          <div ref={originRef}>
            <SelectContent ref={selectRef}></SelectContent>
          </div>
          <Transition name="fade">
            <FlexibleOverlay
              v-model={isRender.value}
              ref={dropdownRef}
              origin={originRef.value}
              align="start"
              position={position.value}
              style={{ visibility: isOpen.value ? 'visible' : 'hidden', 'z-index': isOpen.value ? 1000 : -1 }}>
              <div class={dropdownCls} style={{ width: `${dropdownWidth.value}`, visibility: isOpen.value ? 'visible' : 'hidden' }}>
                <ul class={listCls} v-show={!isLoading.value}>
                  {isShowCreateOption.value && (
                    <Option value={filterQuery.value} name={filterQuery.value} create>
                      {props.multiple ? <Checkbox modelValue={false} label={filterQuery.value} /> : filterQuery.value}
                    </Option>
                  )}
                  {ctx.slots?.default && ctx.slots.default()}
                  {!ctx.slots?.default &&
                    mergeOptions.value.length >= 1 &&
                    mergeOptions.value.map((item) => (
                      <Option key={item.value} value={item.value} name={item.name} disabled={isDisabled(item)}>
                        {props.multiple ? (
                          <Checkbox modelValue={item._checked} label={item.name} disabled={isDisabled(item)} />
                        ) : (
                          item.name || item.value
                        )}
                      </Option>
                    ))}
                </ul>
                {isShowEmptyText.value && (
                  <div>
                    {ctx.slots?.empty && ctx.slots.empty()}
                    {!ctx.slots?.empty && <p class={dropdownEmptyCls}>{emptyText.value}</p>}
                  </div>
                )}
              </div>
            </FlexibleOverlay>
          </Transition>
        </div>
      );
    };
  },
});
