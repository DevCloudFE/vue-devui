import { defineComponent, provide, reactive, Transition,toRefs, ref, SetupContext } from 'vue'
import { autoCompleteProps, AutoCompleteProps, DropdownPropsKey,ConnectionPosition } from './auto-complete-types'
import useCustomTemplate from "./composables/use-custom-template"
import useSearchFn from "./composables/use-searchfn"
import useInputHandle from "./composables/use-input-handle"
import useSelectHandle from "./composables/use-select-handle"
import './auto-complete.scss'
import DAutoCompleteDropdown from './components/dropdown'
import ClickOutside from '../../shared/devui-directive/clickoutside'
export default defineComponent({
  name: 'DAutoComplete',
  directives: { ClickOutside },
  props: autoCompleteProps,
  emits: ['update:modelValue'],
  setup(props: AutoCompleteProps, ctx:SetupContext) {
    const {
      disabled,
      modelValue,
      appendToBody,
      dAutoCompleteWidth,
      delay,
      allowEmptyValueSearch,
      formatter,
      transInputFocusEmit,
      selectValue,
      source,
      searchFn,
    } = toRefs(props)
    
    const {handleSearch,searchList,showNoResultItemTemplate} = useSearchFn(ctx,allowEmptyValueSearch,source,searchFn,formatter)
    const {onInput,onFocus,inputRef,visible,searchStatus,handleClose,toggleMenu} = useInputHandle(ctx,showNoResultItemTemplate,modelValue,disabled,delay,handleSearch,transInputFocusEmit)
    const {selectedIndex,selectOptionClick} = useSelectHandle(ctx,searchList,selectValue,handleSearch,formatter,toggleMenu)
    const {customRenderSolts} = useCustomTemplate(ctx,modelValue)
    provide(DropdownPropsKey, {
      props,
      visible,
      term: '',
      searchList:searchList,
      selectedIndex,
      searchStatus,
      selectOptionClick,
      showNoResultItemTemplate:showNoResultItemTemplate
    })
    const origin = ref()
    const position = reactive<ConnectionPosition>({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top'
    })
    const renderDropdown = () => {
      if(appendToBody.value){
        return (
          <d-flexible-overlay
            hasBackdrop={false}
            origin={origin}
            position={position}
            v-model:visible={visible.value}
          >
            <div
              class='devui-dropdown devui-auto-complete-menu'
              style={{
                width: dAutoCompleteWidth.value>0?dAutoCompleteWidth.value+'px':'450px' 
              }}
            >
              <DAutoCompleteDropdown>
                {customRenderSolts()}
              </DAutoCompleteDropdown>
            </div>
           </d-flexible-overlay>
        )
      }else{
        return (
            <div 
              class="devui-dropdown"
              style={{
                width: dAutoCompleteWidth.value>0&&dAutoCompleteWidth.value+'px' 
              }}
            >
              <Transition name='fade'>
                <DAutoCompleteDropdown v-show="false">
                  {customRenderSolts()}
                </DAutoCompleteDropdown>
              </Transition>
            </div>
        )
      }
      
    }
    return () => {
      return (
        <>
          <div 
            class={['devui-auto-complete','devui-form-group','devui-has-feedback',visible.value&&'devui-select-open']}
            ref={origin}
            v-click-outside={handleClose}
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
            />
            {renderDropdown()}
          </div>
        </>
      )
    }
  }
})
