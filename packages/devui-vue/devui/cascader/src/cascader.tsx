import { defineComponent, ref, reactive, watch, toRef } from 'vue'
import { cascaderProps, CascaderItem, CascaderProps, CascaderValueType } from './cascader-types'
import { getRootClass } from '../hooks/use-cascader-class'
import { popupHandles } from '../hooks/use-cascader-popup'
import DCascaderList from '../components/cascader-list'
// import { optionsHandles } from '../hooks/use-cascader-options'
import { useCascaderItem } from '../hooks/use-cascader-item'
import { cloneDeep } from 'lodash-es'
import './cascader.scss'
// import { UnwrapNestedRefs } from '@vue/reactivity'
// type OptionsType = UnwrapNestedRefs<[CascaderItem[]]>
export default defineComponent({
  name: 'DCascader',
  props: cascaderProps,
  setup(props: CascaderProps, ctx) {
    const origin = ref(null)
    const cascaderOptions = reactive<[CascaderItem[]]>(cloneDeep([ props?.options ]))
    const multiple = toRef(props, 'multiple')
    const inputValue = ref('')
    let initIptValue = props.value.length > 0 ? true : false
    const position = reactive({
      originX: 'left', 
      originY: 'bottom', 
      overlayX: 'left', 
      overlayY: 'top'
    } as const)
    // popup弹出层
    const { menuShow, menuOpenClass, openPopup, stopDefault, updateStopDefaultType } = popupHandles(props)
    // 配置class
    const rootClasses = getRootClass(props, menuShow)
    // 传递给cascaderItem的props
    const { cascaderItemNeedProps } = useCascaderItem(props, stopDefault)
    /**
     * 
     * @param value value数组
     * @param currentOption 选中的某项
     * @param index 数组项
     */
    const getCascaderLoop = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
      // 区分单选多选模式
      if (!multiple.value) {
        if (index === value.length) return
        const i = value[index] as number
        // 当前的子级
        const current = getCurrentOption(currentOption, i)
        const children = current?.children
        getInputValue(current.label, children)
        if (children?.length > 0) {
          // 为下一级增添数据
          cascaderOptions[index + 1] = children
          // 递归添加
          getCascaderLoop(value, children, index + 1)
        } else {
          // 当最新的ul(级)没有下一级时删除之前选中ul的数据
          cascaderOptions.splice(index + 1, cascaderOptions.length - 1)
        }
      } else {
        // 多选模式
        // console.log('currentOption', currentOption)
        value.forEach(singleValues => {
          console.log('singleValues', singleValues)
          getMultipleCascaderItem(currentOption, singleValues, index)
        })
      }
    }

    /**
     * 
     * 筛选每列中选中的value
     */
    const getCurrentOption = (currentOption: CascaderItem[], i: number) => {
      return currentOption.filter(item => item?.value === i)[0]
    }
    /**
     * 需要判断是否是多选
     * 需要判断单选模式下是否showPath
     * @param label 当前current的内容
     * @param arr 当前选中项current的children数组
     */
    const getInputValue = (label: string, arr?: CascaderItem[]) => {
      if (!props.showPath) {
        cascaderItemNeedProps.inputValueCache.value = label
      } else {
        cascaderItemNeedProps.inputValueCache.value += (label + (arr?.length > 0 ? ' / ' : ''))
      }
    }
    const getMultipleIptValue = () => {

    }
    /**
     * @param currentOption 选中的某项
     * @param cascaderUlValues 多选集合中的某一个集合
     * @param index cascaderUlValues数组的起始项，最开始为0
     */
    const getMultipleCascaderItem = (currentOption: CascaderItem[], cascaderUlValues: number[], index: number) => {
      console.log('currentOption', currentOption, cascaderUlValues[index], index)
      let nextOption = null
      for (let i = 0; i < currentOption.length; i++) {
        if (currentOption[i]?.value === cascaderUlValues[index]) {
          nextOption = currentOption[i]
          break
        }
      }
      console.log(nextOption?.label)
      if (nextOption?.children?.length > 0) {
        index += 1
        getMultipleCascaderItem(nextOption.children, cascaderUlValues, index)
      }
    }
    // const initMultipleActiveItem = ()
    /**
     * 触发input内容输出监听
     */
    const triggerUpdateIptValue = () => {
      cascaderItemNeedProps.confirmInputValueFlg.value = !cascaderItemNeedProps.confirmInputValueFlg.value
    }
    /**
     * 监听点击最终的节点输出内容
     */
     watch(() => cascaderItemNeedProps.confirmInputValueFlg.value, () => {
      inputValue.value = cascaderItemNeedProps.inputValueCache.value
      menuShow.value = false
      // 点击确定过后禁止再次选中
      updateStopDefaultType()
    })
    /**
     * 监听value值的改变
     * 改变cascaderOptions弹窗内容
     * 改变展示值
     */
    watch(cascaderItemNeedProps.value, (val) => {
      cascaderItemNeedProps.inputValueCache.value = ''
      getCascaderLoop(val, props?.options, 0)
      if (initIptValue) { // 因为初始化了value，所以默认输出值
        triggerUpdateIptValue()
        initIptValue = false // 只需要初始化一次，之后不再执行
      }
    }, {
      immediate: true
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
