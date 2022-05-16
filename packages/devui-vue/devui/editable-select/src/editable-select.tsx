import { defineComponent, withModifiers, computed, ref, SetupContext, watch } from 'vue';
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
export default defineComponent({
  name: 'DEditableSelect',
  directives: {
    clickOutside,
    dLoading: loadingDirective,
  },
  props: editableSelectProps,
  emits: ['update:modelValue', 'search', 'loadMore'],
  setup(props: EditableSelectProps, ctx: SetupContext) {
    // Ref
    const dropdownRef = ref();
    const origin = ref();

    const position = ref(['bottom']);
    const visible = ref(false);
    const inputValue = ref(props.modelValue);
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

    const emptyText = computed(() => {
      /**
       * filterOption === false 代表远程搜索
       * filterOption等于true、function、undefined代表本地搜索
       * */

      let text = '';
      // 不传filterOption时默认为true
      if (props.filterOption !== false && !filteredOptions.value.length) {
        text = '找不到相关记录';
      } else if (props.filterOption === false && !filteredOptions.value.length) {
        text = '没有数据';
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

    const handleClick = (option: OptionObjectItem) => {
      const { optionDisabledKey: disabledKey } = props;
      if (disabledKey && !!option[disabledKey]) {
        return;
      }
      ctx.emit('update:modelValue', option.label);
      closeMenu();
    };
    // 键盘选择
    const { handleKeydown, hoverIndex, selectedIndex } = useKeyboardSelect(
      dropdownRef,
      visible,
      inputValue,
      filteredOptions,
      props.optionDisabledKey,
      props.filterOption,
      loading,
      handleClick,
      closeMenu,
      toggleMenu
    );

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          inputValue.value = newVal;
        }
      }
    );
    const getItemCls = (option: OptionObjectItem, index: number) => {
      const { optionDisabledKey: disabledKey } = props;
      return className('devui-dropdown-item', {
        disabled: disabledKey ? !!option[disabledKey] : false,
        selected: index === selectedIndex.value,
        'devui-dropdown-bg': index === hoverIndex.value,
      });
    };
    // 渲染下拉列表,根据appendToBody属性判断是否渲染在body下

    return () => {
      const selectCls = className('devui-editable-select devui-form-group devui-has-feedback', {
        'devui-select-open': visible.value === true,
      });
      const inputCls = className('devui-form-control devui-dropdown-origin', {
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

          <FlexibleOverlay origin={origin.value} v-model={visible.value} position={position.value} hasBackdrop={false}>
            <div
              style={{
                width: props.width + 'px',
              }}>
              <div class="devui-dropdown-menu " v-dLoading={props.loading} v-show={visible.value}>
                <ul
                  ref={dropdownRef}
                  class="devui-list-unstyled scroll-height"
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
                          handleClick(option);
                        }}>
                        {ctx.slots.item ? ctx.slots.item(option) : option.label}
                      </li>
                    );
                  })}
                  <li class="devui-no-result-template" v-show={!filteredOptions.value.length}>
                    <div class="devui-no-data-tip">{ctx.slots.noResultItem ? ctx.slots.noResultItem() : emptyText.value}</div>
                  </li>
                </ul>
              </div>
            </div>
          </FlexibleOverlay>
        </div>
      );
    };
  },
});
