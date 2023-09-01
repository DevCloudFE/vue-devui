import {
  defineComponent,
  provide,
  reactive,
  ref,
  Transition,
  toRefs,
  getCurrentInstance,
  onBeforeMount,
  Teleport,
  withModifiers,
  onMounted,
  nextTick,
} from 'vue';
import type { SetupContext } from 'vue';
import useSelect from './use-select';
import { selectProps, SelectProps, SelectContext } from './select-types';
import { SELECT_TOKEN } from './const';
import { Checkbox } from '../../checkbox';
import Option from './components/option';
import { useNamespace } from '@devui/shared/utils';
import SelectContent from './components/select-content';
import useSelectFunction from './composables/use-select-function';
import { useSelectMenuSize } from './composables/use-select-menu-size';
import './select.scss';
import { createI18nTranslate } from '../../locale/create';
import { FlexibleOverlay } from '../../overlay';

export default defineComponent({
  name: 'DSelect',
  props: selectProps,
  emits: ['toggle-change', 'value-change', 'update:modelValue', 'focus', 'blur', 'remove-tag', 'clear', 'load-more'],
  setup(props: SelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DSelect', app);

    const selectRef = ref();
    const { isSelectFocus, focus, blur } = useSelectFunction(props, selectRef);
    const {
      selectDisabled,
      selectSize,
      dropdownRef,
      isOpen,
      selectCls,
      mergeOptions,
      selectedOptions,
      filterQuery,
      emptyText,
      isLoading,
      isShowEmptyText,
      valueChange,
      handleClear,
      updateInjectOptions,
      tagDelete,
      onFocus,
      onBlur,
      debounceQueryFilter,
      isDisabled,
      toggleChange,
      isShowCreateOption,
    } = useSelect(props, selectRef, ctx, focus, blur, isSelectFocus, t);
    const dropdownContainer = ref();
    const { originRef, dropdownWidth } = useSelectMenuSize(selectRef, dropdownRef, isOpen);

    const scrollbarNs = useNamespace('scrollbar');
    const ns = useNamespace('select');
    const dropdownCls = {
      [ns.e('dropdown')]: true,
      [ns.em('dropdown', 'multiple')]: props.multiple,
    };
    const listCls = {
      [ns.e('dropdown-list')]: true,
      [scrollbarNs.b()]: true,
    };
    const dropdownEmptyCls = ns.em('dropdown', 'empty');
    ctx.expose({ focus, blur, toggleChange });
    const isRender = ref<boolean>(false);

    onBeforeMount(() => {
      isRender.value = true;
    });

    const scrollToBottom = () => {
      const compareHeight = dropdownContainer.value.scrollHeight - dropdownContainer.value.clientHeight;
      const scrollTop = dropdownContainer.value.scrollTop;
      if (scrollTop === compareHeight) {
        ctx.emit('load-more');
      }
    };

    onMounted(() => {
      nextTick(() => {
        dropdownContainer.value.addEventListener('scroll', scrollToBottom);
      });
    });

    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        selectDisabled,
        selectSize,
        isOpen,
        isSelectFocus,
        selectedOptions,
        filterQuery,
        dropdownWidth,
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
        <div
          class={selectCls.value}
          onClick={withModifiers(() => {
            toggleChange(!isOpen.value);
          }, [])}>
          <SelectContent ref={selectRef}></SelectContent>
          <Teleport to="body">
            <Transition name="fade">
              <FlexibleOverlay
                v-model={isRender.value}
                ref={dropdownRef}
                origin={originRef.value}
                offset={4}
                place-strategy="no-space"
                position={props.position}
                style={{
                  visibility: isOpen.value ? 'visible' : 'hidden',
                  'z-index': isOpen.value ? 'var(--devui-z-index-dropdown, 1052)' : -1,
                }}>
                <div class={dropdownCls} style={{ width: `${dropdownWidth.value}px`, visibility: isOpen.value ? 'visible' : 'hidden' }}>
                  <ul
                    class={listCls}
                    v-show={!isLoading.value}
                    style={{ padding: isShowEmptyText.value ? '0' : '12px' }}
                    ref={dropdownContainer}>
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
                            <Checkbox modelValue={item._checked} label={item.name} disabled={isDisabled(item)} class={'select-checkbox'} />
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
          </Teleport>
        </div>
      );
    };
  },
});
