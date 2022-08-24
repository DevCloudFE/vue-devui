import { defineComponent, withModifiers, computed, ref, SetupContext, watch, Teleport, Transition, getCurrentInstance } from 'vue';
import { editableSelectProps, EditableSelectProps, OptionObjectItem } from './editable-select-types';
import ClickOutside from '../../shared/devui-directive/clickoutside';
import LoadingDirective from '../../loading/src/loading-directive';
import { className } from '../src/utils/index';
import './editable-select.scss';
import { useSelect } from './composables/use-select';
import { useFilterOptions } from './composables/use-filter-options';
import { useInput } from './composables/use-input';
import { useLazyLoad } from './composables/use-lazy-load';
import { useKeyboardSelect } from './composables/use-keyboard-select';
import { FlexibleOverlay } from '../../overlay/src/flexible-overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCacheFilteredOptions } from './composables/use-cache-filtered-options';
import { Placement } from '../../overlay';
import { createI18nTranslate } from '../../locale/create';
export default defineComponent({
  name: 'DEditableSelect',
  directives: {
    ClickOutside,
    Loading: LoadingDirective,
  },

  props: editableSelectProps,
  emits: ['update:modelValue', 'search', 'loadMore'],
  setup(props: EditableSelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DEditableSelect', app);

    const ns = useNamespace('editable-select');

    // Ref
    const dropdownRef = ref();
    const origin = ref();
    const hoverIndex = ref(0);
    const selectedIndex = ref(0);
    const position = ref<Placement[]>(['bottom']);

    const visible = ref(false);
    const inputValue = ref(props.modelValue);

    const loading = ref(props.loading);

    const { normalizeOptions } = useSelect(props);

    const searchFn =
      props.searchFn ||
      ((option: OptionObjectItem, term: string) => option.label.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase()));

    const { filteredOptions } = useFilterOptions(props.enableLazyLoad, normalizeOptions, inputValue, searchFn);

    // 缓存filteredOptions，用value来获取对应的option
    const { getOptionValue } = useCacheFilteredOptions(filteredOptions);

    const emptyText = computed(() => {
      let text: string;
      if (props.enableLazyLoad) {
        text = t('noData');
      } else {
        text = t('noRelatedRecords');
      }
      return text;
    });
    watch(
      () => props.loading,
      (newVal) => {
        loading.value = newVal;
      }
    );

    // 下拉列表显影切换
    const toggleMenu = () => {
      visible.value = !visible.value;
    };

    const closeMenu = () => {
      visible.value = false;
    };
    // 懒加载
    const { loadMore } = useLazyLoad(dropdownRef, props.enableLazyLoad, ctx);

    // 输入框变化后的逻辑
    const { handleInput } = useInput(inputValue, ctx);

    const handleClick = (option: OptionObjectItem, index: number) => {
      const { disabledKey } = props;
      if (disabledKey && !!option[disabledKey]) {
        return;
      }

      inputValue.value = option.label;

      hoverIndex.value = selectedIndex.value;
      selectedIndex.value = index;

      const value = getOptionValue(option);
      ctx.emit('update:modelValue', value + '');
      closeMenu();
    };

    // 键盘选择;
    const { handleKeydown } = useKeyboardSelect(
      dropdownRef,
      hoverIndex,
      filteredOptions,
      props.disabledKey,
      visible,
      loading,
      handleClick,
      toggleMenu,
      closeMenu
    );

    const handleClear = () => {
      inputValue.value = '';
      ctx.emit('update:modelValue', '');
    };

    const getItemCls = (option: OptionObjectItem, index: number) => {
      const { disabledKey } = props;
      return className(`devui-dropdown-item`, {
        disabled: disabledKey ? !!option[disabledKey] : false,
        selected: filteredOptions.value.length === 1 || index === selectedIndex.value,
        [`${ns.em('dropdown', 'bg')}`]: index === hoverIndex.value,
      });
    };

    return () => {
      const selectCls = className(
        `${ns.b()} devui-form-group devui-has-feedback ${inputValue.value && props.allowClear && 'allow-clear'}`,
        {
          [`${ns.m('open')}`]: visible.value === true,
        }
      );
      const inputCls = className(`devui-form-control devui-dropdown-origin`, {
        'devui-dropdown-origin-open': visible.value === true,
      });
      return (
        <div
          class={selectCls}
          ref={origin}
          v-click-outside={closeMenu}
          style={{
            width: props.width + 'px',
          }}>
          <input
            class={inputCls}
            onClick={withModifiers(toggleMenu, ['self'])}
            onInput={handleInput}
            onKeydown={handleKeydown}
            value={inputValue.value}
            disabled={props.disabled}
            placeholder={props.placeholder}
            type="text"
          />
          <span class="devui-form-control-feedback">
            <span class="devui-select-clear-icon" onClick={handleClear}>
              <d-icon name="icon-remove"></d-icon>
            </span>
            <span class="devui-select-chevron-icon">
              <d-icon name="select-arrow" />
            </span>
          </span>
          <Teleport to="body">
            <Transition name="fade">
              <FlexibleOverlay
                origin={origin.value}
                v-model={visible.value}
                position={position.value}
                style={{ zIndex: 'var(--devui-z-index-dropdown, 1052)' }}>
                <div
                  style={{
                    width: props.width + 'px',
                  }}
                  class={`${ns.e('menu')}`}>
                  <div class={`devui-dropdown-menu`} v-show={visible.value} v-loading={props.loading}>
                    <ul
                      ref={dropdownRef}
                      class={`${ns.em('list', 'unstyled')} devui-scrollbar scroll-height`}
                      style={{
                        maxHeight: props.maxHeight + 'px',
                      }}
                      onScroll={loadMore}>
                      {filteredOptions.value.map((option, index) => {
                        return (
                          <li
                            class={getItemCls(option, index)}
                            onClick={(e: MouseEvent) => {
                              e.stopPropagation();
                              handleClick(option, index);
                            }}>
                            {ctx.slots.item ? ctx.slots.item(option) : option.label}
                          </li>
                        );
                      })}
                      <div class="devui-no-data-tip" v-show={!filteredOptions.value.length}>
                        {ctx.slots.noResultItem ? ctx.slots.noResultItem(inputValue.value) : emptyText.value}
                      </div>
                    </ul>
                  </div>
                </div>
              </FlexibleOverlay>
            </Transition>
          </Teleport>
        </div>
      );
    };
  },
});
