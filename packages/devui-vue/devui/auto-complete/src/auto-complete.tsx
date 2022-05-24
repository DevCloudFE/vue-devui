import { defineComponent, provide, Transition, toRefs, ref, SetupContext, Teleport, computed } from 'vue';
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

export default defineComponent({
  name: 'DAutoComplete',
  directives: { ClickOutside },
  props: autoCompleteProps,
  emits: ['update:modelValue', 'clear', 'blur'],
  setup(props: AutoCompleteProps, ctx: SetupContext) {
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
      disabled,
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
      isFocus
    );
    provide(DropdownPropsKey, {
      props,
      visible,
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

    const prefixVisible = ctx.slots.prefix || props.prefix;
    const suffixVisible = ctx.slots.suffix || props.suffix || props.clearable;

    const showClearable = computed(() => props.clearable && !props.disabled);

    const renderBasicDropdown = () => {
      return (
        <Transition name={showAnimation ? 'fade' : ''}>
          <FlexibleOverlay show-arrow origin={origin.value} position={position.value} v-model={visible.value}>
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
                  {ctx.slots.prefix && <div>{ctx.slots.prefix?.()}</div>}
                  {props.prefix && <Icon size="inherit" name={props.prefix} />}
                </span>
              )}
              <input
                disabled={disabled.value}
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
                  {ctx.slots.suffix && <div>{ctx.slots.suffix?.()}</div>}
                  {showClearable.value && <Icon size={props.size} class={ns.em('clear', 'icon')} name="close" onClick={onClear} />}
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
