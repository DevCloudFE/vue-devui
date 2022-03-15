import {
  defineComponent,
  withModifiers,
  computed,
  ref,
  Transition,
  SetupContext,
  reactive,
  watch
} from 'vue';
import { editableSelectProps, EditableSelectProps } from './editable-select-types';
import clickOutside from '../../shared/devui-directive/clickoutside';
import { className } from '../src/utils/index';
import './editable-select.scss';
import { OptionObjectItem } from './editable-select-type';
import { userFilterOptions } from './composables/use-filter-options';
import { useInput } from './composables/use-input';
import { useLazyLoad } from './composables/use-lazy-load';
import { useKeyboardSelect } from './composables/use-keyboard-select';
export default defineComponent({
  name: 'DEditableSelect',
  directives: {
    clickOutside
  },
  props: editableSelectProps,
  emits: ['update:modelValue', 'search', 'loadMore'],
  setup(props: EditableSelectProps, ctx: SetupContext) {
    const getItemCls = (option: OptionObjectItem, index: number) => {
      const { optionDisabledKey: disabledKey } = props;
      return className('devui-dropdown-item', {
        disabled: disabledKey ? !!option[disabledKey] : false,
        selected: index === selectIndex.value,
        'devui-dropdown-bg': index === hoverIndex.value
      });
    };
    // 渲染下拉列表,根据appendToBody属性判断是否渲染在body下
    const renderDropdown = () => {
      if (props.appendToBody) {
        return (
          <d-flexible-overlay
            origin={origin}
            v-model:visible={visible.value}
            position={position}
            hasBackdrop={false}
          >
            <div
              class='devui-editable-select-dropdown'
              style={{
                width: props.width + 'px'
              }}
            >
              <div class='devui-dropdown-menu' v-dLoading={props.loading} v-show={visible.value}>
                <ul
                  ref={dopdownRef}
                  class='devui-list-unstyled scroll-height'
                  style={{
                    maxHeight: props.maxHeight + 'px'
                  }}
                  onScroll={loadMore}
                >
                  {filteredOptions.value.map((option, index) => {
                    return (
                      <li
                        class={getItemCls(option, index)}
                        onClick={(e: MouseEvent) => {
                          e.stopPropagation();
                          handleClick(option);
                        }}
                      >
                        {ctx.slots.itemTemplate ? ctx.slots.itemTemplate(option) : option.label}
                      </li>
                    );
                  })}
                  <li class='devui-no-result-template' v-show={!filteredOptions.value.length}>
                    <div class='devui-no-data-tip'>{emptyText.value}</div>
                  </li>
                </ul>
              </div>
            </div>
          </d-flexible-overlay>
        );
      } else {
        return (
          <Transition name='fade'>
            <div class='devui-dropdown-menu' v-show={visible.value}>
              <ul
                ref={dopdownRef}
                class='devui-list-unstyled scroll-height'
                style={{
                  maxHeight: props.maxHeight + 'px'
                }}
                onScroll={loadMore}
              >
                {filteredOptions.value.map((option, index) => {
                  return (
                    <li
                      class={getItemCls(option, index)}
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        handleClick(option);
                      }}
                    >
                      {ctx.slots.itemTemplate ? ctx.slots.itemTemplate(option) : option.label}
                    </li>
                  );
                })}
                <li class='devui-no-result-template' v-show={!filteredOptions.value.length}>
                  <div class='devui-no-data-tip'>{emptyText.value}</div>
                </li>
              </ul>
            </div>
          </Transition>
        );
      }
    };
    //Ref
    const dopdownRef = ref();
    const origin = ref();

    const position = reactive({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top'
    });
    const visible = ref(false);
    const inputValue = ref(props.modelValue);
    const hoverIndex = ref(0);
    const selectIndex = ref(0);

    //标准化options，统一处理成[{}]的形式
    const normalizeOptions = computed(() => {
      return props.options.map((option) => {
        if (typeof option === 'object') {
          return {
            label: option.label ? option.label : option.value,
            value: option.value,
            ...option
          };
        }
        return {
          label: option + '',
          value: option
        };
      });
    });
    //非远程搜索的情况下对数组进行过滤
    const filteredOptions = userFilterOptions(normalizeOptions, inputValue, props.filterOption);

    const emptyText = computed(() => {
      let text: string;
      if (props.filterOption !== false && !filteredOptions.value.length) {
        text = '找不到相关记录';
      } else if (props.filterOption === false && !filteredOptions.value.length) {
        text = '没有数据';
      }
      return ctx.slots.noResultItemTemplate ? ctx.slots.noResultItemTemplate() : text;
    });

    //下拉列表显影切换
    const toggleMenu = () => {
      visible.value = !visible.value;
    };

    const closeMenu = () => {
      visible.value = false;
    };
    // 懒加载
    const { loadMore } = useLazyLoad(dopdownRef, inputValue, props.filterOption, props.loadMore);

    //输入框变化后的逻辑
    const { handleInput } = useInput(inputValue, ctx);

    const handleClick = (option: OptionObjectItem) => {
      const { optionDisabledKey: disabledKey } = props;
      if (disabledKey && !!option[disabledKey]) return;
      ctx.emit('update:modelValue', option.label);
      closeMenu();
    };
    // 键盘选择
    const { handleKeydown } = useKeyboardSelect(
      dopdownRef,
      props.optionDisabledKey,
      visible,
      hoverIndex,
      selectIndex,
      filteredOptions,
      toggleMenu,
      closeMenu,
      handleClick
    );

    watch(
      () => props.modelValue,
      (newVal) => {
        inputValue.value = newVal;
      }
    );
    return () => {
      const selectCls = className('devui-editable-select devui-form-group devui-has-feedback', {
        'devui-select-open': visible.value === true
      });
      return (
        <div
          class={selectCls}
          ref={origin}
          v-click-outside={closeMenu}
          style={{
            width: props.width + 'px'
          }}
        >
          <input
            class='devui-form-control devui-dropdown-origin devui-dropdown-origin-open'
            onClick={withModifiers(toggleMenu, ['self'])}
            onInput={handleInput}
            onKeydown={handleKeydown}
            value={inputValue.value}
            disabled={props.disabled}
            placeholder={props.placeholder}
            type='text'
          />
          <span class='devui-form-control-feedback'>
            <span class='devui-select-chevron-icon'>
              <d-icon name='select-arrow' />
            </span>
          </span>
          {renderDropdown()}
        </div>
      );
    };
  }
});
