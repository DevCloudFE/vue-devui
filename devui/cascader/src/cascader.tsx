import './cascader.scss'

import { defineComponent, ref, reactive, watch } from 'vue'
import { cascaderProps, CascaderItem, CascaderProps, CascaderValueType } from './cascader-types'
import { getRootClass } from '../hooks/use-cascader-class'
import { popupHandles } from '../hooks/use-cascader-popup'
import DCascaderList from '../components/cascader-list'
// import { optionsHandles } from '../hooks/use-cascader-options'
import { useCascaderItem } from '../hooks/use-cascader-item'
import { UnwrapNestedRefs } from '@vue/reactivity'
type ValueType = UnwrapNestedRefs<CascaderValueType>
export default defineComponent({
  name: 'DCascader',
  props: cascaderProps,
  setup(props: CascaderProps, ctx) {
    const origin = ref(null)
    const cascaderOptions = reactive<[CascaderItem[]]>([ props?.options ])
    
    const inputValue = ref('')
    const position = reactive({
      originX: 'left', 
      originY: 'bottom', 
      overlayX: 'left', 
      overlayY: 'top'
    } as const)
    // popup弹出层
    const { menuShow, menuOpenClass, openPopup } = popupHandles(props)
    // 配置class
    const rootClasses = getRootClass(props, menuShow)
    // 传递给cascaderItem的props
    const { cascaderItemNeedProps } = useCascaderItem(props)
    /**
     * 
     * @param value value数组
     * @param index 起始项
     */
    const getCascaderLoop = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
      if (index === value.length) return
      // 区分单选多选模式
      if (!props.multiple) {
        const i = value[index]
        getInputValue(currentOption[i as number]?.label, currentOption[i as number]?.children)
        if (currentOption[i as number]?.children?.length > 0) {
          // 为下一级增添数据
          cascaderOptions[index + 1] = currentOption[i as number].children
          // 递归添加
          getCascaderLoop(value, currentOption[i as number].children, index + 1)
        } else {
          // 当最新的ul(级)没有下一级时删除之前选中ul的数据
          cascaderOptions.splice(index + 1, cascaderOptions.length - 1)
        }
      }
    }

    /**
     * 
     * @param value 当前value数组
     */
    const getInputValue = (label: string, arr?: CascaderItem[]) => {
      cascaderItemNeedProps.inputValueCache.value += (label + (arr?.length > 0 ? ' / ' : ''))
    }
    /**
     * 监听value值的改变
     * 改变cascaderOptions弹窗内容
     * 改变展示值
     */
    watch(cascaderItemNeedProps.value, (val) => {
      cascaderItemNeedProps.inputValueCache.value = ''
      getCascaderLoop(val, props?.options, 0)
    })

    watch(() => cascaderItemNeedProps.confirmInputValueFlg.value, () => {
      inputValue.value = cascaderItemNeedProps.inputValueCache.value
      menuShow.value = false
    })
    return () => (
      <>
        <div class={rootClasses.value} onClick={openPopup} ref={origin} {...ctx.attrs}>
          <d-input
            disabled={props.disabled}
            placeholder={props.placeholder}
            value={inputValue.value}
          ></d-input>
          <div class="devui-cascader__icon devui-drop-icon-animation">
            <d-icon name="select-arrow" size="12px"></d-icon>
          </div>
        </div>
        <d-flexible-overlay origin={origin} v-model={[menuShow.value, 'visible']} position={position}>
          <div class="devui-drop-menu-animation">
            <div class={`${menuOpenClass.value} devui-dropdown-menu`}>
              {cascaderOptions.map((item, index) => {
                return <DCascaderList
                  cascaderItems={item}
                  ul-index={index}
                  cascaderItemNeedProps={cascaderItemNeedProps}
                  cascaderOptions={cascaderOptions}
                  {...props}
                ></DCascaderList>
              })}
            </div>
          </div>
        </d-flexible-overlay>
      </>
    )
  },
})
