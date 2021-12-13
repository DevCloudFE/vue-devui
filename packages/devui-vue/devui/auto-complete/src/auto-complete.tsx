import { defineComponent, provide, reactive, Transition,toRefs, ref } from 'vue'
import { autoCompleteProps, AutoCompleteProps, DropdownPropsKey,ConnectionPosition } from './auto-complete-types'
import { Observable} from 'rxjs';
import './auto-complete.scss'
import DAutoCompleteDropdown from './components/dropdown'
import ClickOutside from '../../shared/devui-directive/clickoutside'
export default defineComponent({
  name: 'DAutoComplete',
  directives: { ClickOutside },
  props: autoCompleteProps,
  emits: ['update:modelValue'],
  setup(props: AutoCompleteProps, ctx) {
    // 匹配结果
    let searchList = ref([])
    const {
      appendToBody,
      dAutoCompleteWidth,
      modelValue,
    } = toRefs(props)
    const {
      formatter,
      transInputFocusEmit,
      selectValue,
      source,
      searchFn
    } = props
    const disabled = ref(props.disabled)
    const visible = ref(false)
    const selectedIndex = ref(0)
    const origin = ref()
    const inputRef = ref()
    const position = reactive<ConnectionPosition>({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top'
    })
    const handleSearch = (term:string)=>{
      console.log("term",term);
      if(term==""){
        console.log("term",term);
        searchList.value=[]
        return 
      }
      let arr = []
      term = term.toLowerCase()
      if(!searchFn){
        source.forEach((item)=>{
          let cur = formatter(item)
          cur = cur.toLowerCase()
          if(cur.startsWith(term)){
            arr.push(item)
          }
        })
      }else{
        arr = searchFn(term)
      }
      searchList.value=arr
    }
    const handleClose = ()=>{
      visible.value=false
    }
    const toggleMenu =()=>{
      if(!disabled.value){
        visible.value=!visible.value
      }
    }
    // todo如何使用rx防抖
    const onInput = (e:Event)=>{
      const inp = e.target as HTMLInputElement  
      ctx.emit('update:modelValue',inp.value)
      visible.value=true

      handleSearch(inp.value)
    }
    const onFocus = ()=>{
      handleSearch(modelValue.value)
      transInputFocusEmit&&transInputFocusEmit(true,inputRef)
    }
    //todo 参数还没确定 后期需要约束data类型
    const getListIndex = (item:string)=>{
      if(searchList.value.length==0){
        return 0
      }
      let ind = searchList.value.indexOf(item)
      return ind==-1?0:ind
    }
    // todo 键盘方向键选择回车键选择功能
    const selectOptionClick = (data) => {
      // const { disabledKey } = props
      const cur = searchList.value[data.index]
      ctx.emit('update:modelValue',cur)
      handleSearch(cur)
      selectedIndex.value=getListIndex(cur)
      selectValue&&selectValue()
    }
    provide(DropdownPropsKey, {
      props,
      visible,
      term: '',
      searchList:searchList,
      selectedIndex,
      selectOptionClick
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
              <DAutoCompleteDropdown></DAutoCompleteDropdown>
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
                <DAutoCompleteDropdown />
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
            onClick={toggleMenu}
            v-click-outside={handleClose}
          >
            <input
              disabled={disabled.value}
              type="text"
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
