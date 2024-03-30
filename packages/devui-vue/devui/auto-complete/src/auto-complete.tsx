import { defineComponent, provide, Transition, toRefs, ref, SetupContext, Teleport, computed, inject } from 'vue';
import { autoCompleteProps, AutoCompleteProps, DropdownPropsKey } from './auto-complete-types';
import useCustomTemplate from './composables/use-custom-template';
import useSearchFn from './composables/use-searchfn';
import useInputHandle from './composables/use-input-handle';
import useSelectHandle from './composables/use-select-handle';
import useLazyHandle from './composables/use-lazy-handle';
import useKeyBoardHandle from './composables/use-keyboard-select';
import { useAutoCompleteRender } from './composables/use-auto-complete-render';
import DAutoCompleteDropdown from './components/dropdown';
import ClickOutside from '../../shared/devui-directive/clickoutside';
import { FlexibleOverlay } from '../../overlay/src/flexible-overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './auto-complete.scss';
import { Icon } from '../../icon';
import { FORM_TOKEN } from '../../form';

export default defineComponent({
  name: 'DAutoComplete',
  directives: { ClickOutside },
  props: autoCompleteProps,
  emits: ['update:modelValue', 'clear', 'blur'],
  setup(props: AutoCompleteProps, ctx: SetupContext) {
    const formContext = inject(FORM_TOKEN, undefined);
    const {
      disabled,
      modelValue,
      width,
      delay,
      allowEmptyValueSearch,
      appendToBody,
      formatter,
      transInputFocusEmit,
      selectValue,
      source,
      searchFn,
      position,
      latestSource,
      showAnimation,
      valueParser,
      placeholder,
    } = toRefs(props);
    const ns = useNamespace('auto-complete');
    const inputNs = useNamespace('auto-complete-input');
    const isDisabled = computed(() => formContext?.disabled || disabled.value);
    const autoCompleteSize = computed(() => formContext?.size || props.size);
    const align = computed(() => (position.value.some((item) => item.includes('start') || item.includes('end')) ? 'start' : null));

    const { handleSearch, searchList, showNoResultItemTemplate, recentlyFocus } = useSearchFn(
      ctx,
      allowEmptyValueSearch,
      source,
      searchFn,
      formatter
    );
    const { onInput, onFocus, onBlur, onClear, inputRef, isFocus, visible, searchStatus, handleClose, toggleMenu } = useInputHandle(
      ctx,
      searchList,
      showNoResultItemTemplate,
      modelValue,
      isDisabled,
      delay,
      handleSearch,
      transInputFocusEmit,
      recentlyFocus,
      latestSource
    );
    const { selectedIndex, selectOptionClick } = useSelectHandle(ctx, searchList, selectValue, handleSearch, formatter, handleClose);
    const { showLoading, dropDownRef, loadMore } = useLazyHandle(props, ctx, handleSearch);
    const { customRenderSolts } = useCustomTemplate(ctx, modelValue);
    const { hoverIndex, handlekeyDown } = useKeyBoardHandle(
      dropDownRef,
      visible,
      searchList,
      selectedIndex,
      searchStatus,
      showNoResultItemTemplate,
      selectOptionClick,
      handleClose
    );
    const { autoCompleteTopClasses, inputClasses, inputWrapperClasses, inputInnerClasses } = useAutoCompleteRender(
      props,
      ctx,
      visible,
      isFocus,
      isDisabled,
      autoCompleteSize
    );
    provide(DropdownPropsKey, {
      props,
      visible,
      isDisabled,
      term: '',
      searchList: searchList,
      selectedIndex,
      searchStatus,
      selectOptionClick,
      dropDownRef,
      showLoading,
      loadMore,
      latestSource,
      modelValue,
      showNoResultItemTemplate: showNoResultItemTemplate,
      hoverIndex: hoverIndex,
      valueParser,
    });
    const origin = ref<HTMLElement>();
    const currentPosition = ref('bottom');

    const prefixVisible = ctx.slots.prefix || props.prefix;
    const suffixVisible = ctx.slots.suffix || props.suffix || props.clearable;

    const showClearable = computed(() => props.clearable && !isDisabled.value);
    const overlayStyles = computed(() => ({
      transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
      zIndex: 'var(--devui-z-index-dropdown, 1052)',
    }));

    const handlePositionChange = (pos: string) => {
      currentPosition.value = pos.includes('top') || pos.includes('right-end') || pos.includes('left-end') ? 'top' : 'bottom';
    };

    const renderBasicDropdown = () => {
      return (
        <Transition name={showAnimation ? ns.m(`fade-${currentPosition.value}`) : ''}>
          <FlexibleOverlay
            origin={origin.value}
            position={position.value}
            align={align.value}
            v-model={visible.value}
            onPositionChange={handlePositionChange}
            style={overlayStyles.value}>
            <div
              class={ns.e('menu')}
              style={{
                width: `
                      ${width.value + 'px'}
                    `,
              }}>
              <DAutoCompleteDropdown>{customRenderSolts()}</DAutoCompleteDropdown>
            </div>
          </FlexibleOverlay>
        </Transition>
      );
    };

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
          class={autoCompleteTopClasses.value}
          ref={origin}
          v-click-outside={handleClose}
          style={{
            width: `${width.value + 'px'}`,
          }}>
          <div class={inputClasses.value}>
            {ctx.slots.prepend && <div class={inputNs.e('prepend')}>{ctx.slots.prepend?.()}</div>}
            <div class={inputWrapperClasses.value}>
              {prefixVisible && (
                <span class={inputNs.e('prefix')}>
                  {ctx.slots.prefix && ctx.slots.prefix?.()}
                  {props.prefix && <Icon size="inherit" name={props.prefix} />}
                </span>
              )}
              <input
                disabled={isDisabled.value}
                type="text"
                onClick={toggleMenu}
                class={inputInnerClasses.value}
                placeholder={placeholder.value}
                onInput={onInput}
                onFocus={onFocus}
                onBlur={onBlur}
                value={modelValue.value}
                ref={inputRef}
                onKeydown={handlekeyDown}
              />
              {suffixVisible && (
                <span class={inputNs.e('suffix')}>
                  {props.suffix && <Icon size="inherit" name={props.suffix} />}
                  {ctx.slots.suffix && ctx.slots.suffix?.()}
                  {showClearable.value && (
                    <Icon size={autoCompleteSize.value} class={ns.em('clear', 'icon')} name="close" onClick={onClear} />
                  )}
                </span>
              )}
            </div>
            {ctx.slots.append && <div class={inputNs.e('append')}>{ctx.slots.append?.()}</div>}
          </div>
          {renderDropdown()}
        </div>
      );
    };
  },
});
