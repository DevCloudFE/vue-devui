// 三方库依赖
import { defineComponent, provide, ref, Teleport, toRef, toRefs, Transition, withModifiers } from 'vue';
import { onClickOutside } from '@vueuse/core';
// 类型文件
import type { SetupContext } from 'vue';
import { editableSelectProps, EditableSelectProps, SELECT_KEY } from './editable-select-types';
// 子组件
import Icon from '../../icon/src/icon';
import { FlexibleOverlay } from '../../overlay';
import Dropdown from './components/dropdown/dropdown';
// 工具函数
import { useSelect, useSelectStates } from './composables/use-select';
import { useKeyboardSelect } from './composables/use-keyboard-select';
import { useInputRender } from './composables/use-input-render';
import { useInputEvent } from './composables/use-input-event';
import { useLazyLoad } from './composables/use-lazy-load';
import { useNamespace } from '../../shared/hooks/use-namespace';
// 样式
import './editable-select.scss';

export default defineComponent({
  name: 'DEditableSelect',
  props: editableSelectProps,
  emits: ['update:modelValue', 'focus', 'blur', 'clear', 'change', 'visibleChange', 'loadMore'],
  setup(props: EditableSelectProps, ctx: SetupContext) {
    // name space
    const ns = useNamespace('editable-select');

    // DOM & Component refs
    const inputRef = ref<HTMLInputElement>();
    const originRef = ref<HTMLElement>();
    const dropdownRef = ref<HTMLElement>();
    const overlayRef = ref<HTMLElement>();

    const states = useSelectStates();
    //  data refs
    const { appendToBody, disabled, modelValue, position, placeholder } = toRefs(props);

    // input事件
    const { onInput, onMouseenter, onMouseleave, setSoftFocus, handleBlur, handleFocus, handleClear } = useInputEvent(
      inputRef,
      props,
      states,
      ctx
    );

    const { filteredOptions, emptyText, showClearable, toggleMenu, handleOptionSelect, scrollToItem } = useSelect(
      dropdownRef,
      props,
      states,
      setSoftFocus,
      ctx
    );
    const { onKeydown } = useKeyboardSelect(props, states, filteredOptions, scrollToItem, handleOptionSelect);

    const { loadMore } = useLazyLoad(dropdownRef, props, ctx);

    provide(SELECT_KEY, {
      dropdownRef,
      disabledKey: props.disabledKey,
      modelValue,
      inputValue: toRef(states, 'inputValue'),
      query: toRef(states, 'query'),
      hoveringIndex: toRef(states, 'hoveringIndex'),
      loading: toRef(props, 'loading'),
      emptyText,
      loadMore,
      handleOptionSelect,
      setSoftFocus,
    });

    onClickOutside(
      originRef,
      () => {
        states.visible = false;
        states.isFocus = false;
      },
      { ignore: [overlayRef] }
    );

    //  类名
    const { inputClasses, inputWrapperClasses, inputInnerClasses, inputSuffixClasses } = useInputRender(props, states);

    // 渲染自定义模板

    // 渲染下拉框核心
    const renderBasicDropdown = () => {
      return (
        <Transition name="fade">
          <FlexibleOverlay
            ref={overlayRef}
            v-model={states.visible}
            origin={originRef.value}
            position={position.value}
            style={{ zIndex: 'var(--devui-z-index-dropdown, 1052)' }}>
            <Dropdown options={filteredOptions.value} width={props.width} maxHeight={props.maxHeight} v-slots={ctx.slots}></Dropdown>
          </FlexibleOverlay>
        </Transition>
      );
    };

    // 渲染下拉框
    const renderDropdown = () => {
      if (appendToBody.value) {
        return <Teleport to="body">{renderBasicDropdown()}</Teleport>;
      } else {
        return renderBasicDropdown();
      }
    };
    return () => {
      return (
        <div
          ref={originRef}
          class={ns.b()}
          style={{
            width: props.width + 'px',
          }}
          onClick={toggleMenu}>
          <div class={inputClasses.value} onMouseenter={onMouseenter} onMouseleave={onMouseleave}>
            <div class={inputWrapperClasses.value}>
              <input
                ref={inputRef}
                class={inputInnerClasses.value}
                disabled={disabled.value}
                placeholder={placeholder.value}
                value={states.inputValue}
                type="text"
                onInput={onInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeydown={onKeydown}
              />
              <span class={inputSuffixClasses.value}>
                <span class={ns.e('clear-icon')} v-show={showClearable.value} onClick={withModifiers(handleClear, ['stop'])}>
                  <Icon name="icon-remove" />
                </span>
                <span class={ns.e('arrow-icon')} v-show={!showClearable.value}>
                  <Icon name="select-arrow" />
                </span>
              </span>
            </div>
          </div>
          {renderDropdown()}
        </div>
      );
    };
  },
});
