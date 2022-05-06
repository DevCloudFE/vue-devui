import { defineComponent, provide, Transition, toRefs, ref, SetupContext, Teleport } from 'vue';
import { autoCompleteProps, AutoCompleteProps, DropdownPropsKey } from './auto-complete-types';
import useCustomTemplate from './composables/use-custom-template';
import useSearchFn from './composables/use-searchfn';
import useInputHandle from './composables/use-input-handle';
import useSelectHandle from './composables/use-select-handle';
import useLazyHandle from './composables/use-lazy-handle';
import useKeyBoardHandle from './composables/use-keyboard-select';
import DAutoCompleteDropdown from './components/dropdown';
import ClickOutside from '../../shared/devui-directive/clickoutside';
import { FlexibleOverlay } from '../../overlay/src/flexible-overlay';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './auto-complete.scss';

export default defineComponent({
  name: 'DAutoComplete',
  directives: { ClickOutside },
  props: autoCompleteProps,
  emits: ['update:modelValue'],
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
    } = toRefs(props);
    const ns = useNamespace('auto-complete');
    const formNs = useNamespace('form-group');
    const feedbackNs = useNamespace('has-feedback');
    const selectNs = useNamespace('select-open');
    const formControlNs = useNamespace('form-control');
    const dropdownNs = useNamespace('dropdown-origin');
    const dropdownOpenNs = useNamespace('dropdown-origin-open');

    const { handleSearch, searchList, showNoResultItemTemplate, recentlyFocus } = useSearchFn(
      ctx,
      allowEmptyValueSearch,
      source,
      searchFn,
      formatter
    );
    const { onInput, onFocus, onBlur, inputRef, isFocus, visible, searchStatus, handleClose, toggleMenu } = useInputHandle(
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

    const renderDropdown = () => {
      if (appendToBody.value) {
        return (
          <Teleport to="body">
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
          </Teleport>
        );
      } else {
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
      }
    };
    return () => {
      return (
        <div
          class={[ns.b(), formNs.b(), feedbackNs.b(), visible.value && selectNs.b()]}
          ref={origin}
          v-click-outside={handleClose}
          style={{
            width: `${width.value + 'px'}`,
          }}>
          <input
            disabled={disabled.value}
            type="text"
            onClick={toggleMenu}
            class={[formControlNs.b(), dropdownNs.b(), isFocus.value && dropdownOpenNs.b(), disabled.value && 'disabled']}
            placeholder="Search"
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={modelValue.value}
            ref={inputRef}
            onKeydown={handlekeyDown}
          />
          {renderDropdown()}
        </div>
      );
    };
  },
});
