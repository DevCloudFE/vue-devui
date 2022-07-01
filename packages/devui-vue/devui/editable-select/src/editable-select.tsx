import { defineComponent, withModifiers, computed, ref, SetupContext, watch, Teleport, Transition, getCurrentInstance } from 'vue';
import { editableSelectProps, EditableSelectProps, OptionObjectItem } from './editable-select-types';
import clickOutside from '../../shared/devui-directive/clickoutside';
import loadingDirective from '../../loading/src/loading-directive';
import { className } from '../src/utils/index';
import './editable-select.scss';
import { userFilterOptions } from './composables/use-filter-options';
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
    clickOutside,
    dLoading: loadingDirective,
  },

  props: editableSelectProps,
  emits: ['update:modelValue', 'search', 'loadMore'],
  setup(props: EditableSelectProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DEditableSelect', app);

    const ns = useNamespace('editable-select');
    const dropdownNS = useNamespace('editable-select-dropdown');

    // Ref
    const dropdownRef = ref();
    const origin = ref();

    const position = ref<Placement[]>(['bottom']);

    const visible = ref(false);
    const inputValue = ref(props.modelValue);
    const cacheInput = ref();
    const loading = ref(props.loading);

    // 标准化options，统一处理成[{}]的形式
    const normalizeOptions = computed(() => {
      return props.options.map((option) => {
        if (typeof option === 'object') {
          return Object.assign({}, option, {
            label: option.label ? option.label : option.value,
            value: option.value,
          });
        }
        return {
          label: option + '',
          value: option,
        };
      });
    });
    // 非远程搜索的情况下对数组进行过滤
    const filteredOptions = userFilterOptions(normalizeOptions, inputValue, props.filterOption);

    // 缓存filteredOptions，用value来获取对应的option
    const { getOptionValue } = useCacheFilteredOptions(filteredOptions);

    const emptyText = computed(() => {
      /**
       * filterOption === false 代表远程搜索
       * filterOption等于true、function、undefined代表本地搜索
       * */

      let text = '';
      // 不传filterOption时默认为true
      if (props.filterOption !== false && !filteredOptions.value.length) {
        text = t('noRelatedRecords');
      } else if (props.filterOption === false && !filteredOptions.value.length) {
        text = t('noData');
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
    const { loadMore } = useLazyLoad(dropdownRef, inputValue, props.filterOption, ctx);

    // 输入框变化后的逻辑
    const { handleInput } = useInput(inputValue, ctx);

    const handleClick = (option: OptionObjectItem, index: number) => {
      const { optionDisabledKey: disabledKey } = props;
      if (disabledKey && !!option[disabledKey]) {
        return;
      }

      inputValue.value = option.label;
      cacheInput.value = option.label;
      selectedIndex.value = index;

      const value = getOptionValue(option.label);
      ctx.emit('update:modelValue', value + '');
      closeMenu();
    };
    // 键盘选择
    const { handleKeydown, hoverIndex, selectedIndex } = useKeyboardSelect(
      dropdownRef,
      visible,
      inputValue,
      cacheInput,
      filteredOptions,
      props.optionDisabledKey,
      props.filterOption,
      loading,
      handleClick,
      closeMenu,
      toggleMenu
    );

    const getItemCls = (option: OptionObjectItem, index: number) => {
      const { optionDisabledKey: disabledKey } = props;
      return className(`${dropdownNS.e('item')}`, {
        disabled: disabledKey ? !!option[disabledKey] : false,
        selected: index === selectedIndex.value,
        [`${dropdownNS.m('bg')}`]: index === hoverIndex.value,
      });
    };
    // 渲染下拉列表,根据appendToBody属性判断是否渲染在body下

    return () => {
      const selectCls = className(`${ns.b()} devui-form-group devui-has-feedback`, {
        [`${ns.m('open')}`]: visible.value === true,
      });
      const inputCls = className(`${ns.e('input')} devui-dropdown-origin devui-form-control`, {
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
            <span class="devui-select-chevron-icon">
              <d-icon name="select-arrow" />
            </span>
          </span>
          <Teleport to="body">
            <Transition name="fade">
              <FlexibleOverlay origin={origin.value} v-model={visible.value} position={position.value}>
                <div
                  style={{
                    width: props.width + 'px',
                  }}
                  class={`${dropdownNS.b()}`}>
                  <div class={`${dropdownNS.e('wrap')}`} v-dLoading={props.loading} v-show={visible.value}>
                    <ul
                      ref={dropdownRef}
                      class={`${dropdownNS.e('list')}`}
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
                      <li class={`${dropdownNS.e('empty')}`} v-show={!filteredOptions.value.length}>
                        <div class={`${dropdownNS.em('empty', 'tip')}`}>
                          {ctx.slots.noResultItem ? ctx.slots.noResultItem() : emptyText.value}
                        </div>
                      </li>
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
