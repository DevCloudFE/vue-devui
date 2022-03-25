import { defineComponent, provide, Transition,toRefs, ref, SetupContext, Teleport } from 'vue'
import { autoCompleteProps, AutoCompleteProps, DropdownPropsKey } from './auto-complete-types'
import useCustomTemplate from './composables/use-custom-template'
import useSearchFn from './composables/use-searchfn'
import useInputHandle from './composables/use-input-handle'
import useSelectHandle from './composables/use-select-handle'
import useLazyHandle from './composables/use-lazy-handle'
import useKeyBoardHandle from './composables/use-keyboard-select'
import './auto-complete.scss'
import DAutoCompleteDropdown from './components/dropdown'
import ClickOutside from '../../shared/devui-directive/clickoutside'
import {FlexibleOverlay} from '../../overlay/src/flexible-overlay'

export default defineComponent({
  name: 'DAutoComplete',
  directives: { ClickOutside },
  props: autoCompleteProps,
  emits: ['update:modelValue'],
  setup(props: AutoCompleteProps, ctx:SetupContext) {
    const {
      disabled,
      modelValue,
      width,
      delay,
      allowEmptyValueSearch,
      formatter,
      transInputFocusEmit,
      selectValue,
      source,
      searchFn,
      position,
      latestSource,
      showAnimation
    } = toRefs(props)

    const {
      handleSearch,
      searchList,
      showNoResultItemTemplate,
      recentlyFocus
    } = useSearchFn(
      ctx,
      allowEmptyValueSearch,
      source,
      searchFn,
      formatter
    )
    const {
      onInput,
      onFocus,
      inputRef,
      visible,
      searchStatus,
      handleClose,
      toggleMenu
    } = useInputHandle(
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
    )
    const {
      selectedIndex,
      selectOptionClick
    } = useSelectHandle(
      ctx,
      searchList,
      selectValue,
      handleSearch,
      formatter,
      handleClose
    )
    const {
      showLoading,
      dropDownRef,
      loadMore
    } = useLazyHandle(
      props,
      ctx,
      handleSearch
    )
    const {
      customRenderSolts
    } = useCustomTemplate(
      ctx,
      modelValue
    )
    const {
      hoverIndex,
      handlekeyDown
    } = useKeyBoardHandle(
      dropDownRef,
      visible,
      searchList,
      selectedIndex,
      searchStatus,
      showNoResultItemTemplate,
      selectOptionClick,
      handleClose
    )
    provide(DropdownPropsKey, {
      props,
      visible,
      term: '',
      searchList:searchList,
      selectedIndex,
      searchStatus,
      selectOptionClick,
      dropDownRef,
      showLoading,
      loadMore,
      latestSource,
      modelValue,
      showNoResultItemTemplate:showNoResultItemTemplate,
      hoverIndex:hoverIndex
    })
    const origin = ref<HTMLElement>()
    
    const renderDropdown = () => {
      return (
        <Teleport to='body'>
          <Transition name={showAnimation?'fade':''}>
            <FlexibleOverlay
              origin={origin.value}
              position={position.value}
              v-model={visible.value}
            >
              <div
                class='devui-auto-complete-menu'
                style={{
                  width: `
                    ${width.value+'px'}
                  `
                }}
              >
                <DAutoCompleteDropdown>
                  {customRenderSolts()}
                </DAutoCompleteDropdown>
              </div>
            </FlexibleOverlay>
          </Transition>
         </Teleport>
      )

    }
    return () => {
      return (
        <div
          class={['devui-auto-complete','devui-form-group','devui-has-feedback',visible.value&&'devui-select-open']}
          ref={origin}
          v-click-outside={handleClose}
          style={{
            width: `${width.value+'px'}`
          }}
        >
          <input
            disabled={disabled.value}
            type="text"
            onClick={toggleMenu}
            class={['devui-form-control','devui-dropdown-origin','devui-dropdown-origin-open',disabled.value&&'disabled']}
            placeholder="Search"
            onInput={onInput}
            onFocus={onFocus}
            value={modelValue.value}
            ref = {inputRef}
            onKeydown={handlekeyDown}
          />
          {renderDropdown()}
        </div>
      )
    }
  }
})
