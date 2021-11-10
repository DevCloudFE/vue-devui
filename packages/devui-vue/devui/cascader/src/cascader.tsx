import { defineComponent, ref, reactive, watch, toRef, Ref } from 'vue'
import { cascaderProps, CascaderItem, CascaderProps, CascaderValueType } from './cascader-types'
import { getRootClass } from '../hooks/use-cascader-class'
import { popupHandles } from '../hooks/use-cascader-popup'
import DCascaderList from '../components/cascader-list'
// import { optionsHandles } from '../hooks/use-cascader-options'
import { useCascaderItem } from '../hooks/use-cascader-item'
import { DMultipleBox } from '../components/cascader-multiple/index' 
import { useMultiple } from '../hooks/use-cascader-multiple'
import { useSingle } from '../hooks/use-cascader-single'
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
    const tagList = reactive<CascaderItem[]>([]) // 多选模式下选中的值数组，用于生成tag
    const { initSingleIptValue } = useSingle()
    let initIptValue = props.value.length > 0 ? true : false // 有value默认值时，初始化输出内容

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
    const { cascaderItemNeedProps } = useCascaderItem(props, stopDefault, tagList)
    const { initTagList, initMultipleCascaderItem, initActiveIndexs, getInputValue } = useMultiple(cascaderItemNeedProps)

    /**
     * 控制视图更新
     * 注意视图更新不区分单选或者多选
     * @param activeIndexs 视图展示下标集合
     * @param currentOption 选中的某项
     * @param index value的下标，起始为0
     */
    const updateCascaderView = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
      if (index === value.length) return
      const i = value[index] as number
      // 当前的子级
      const current = currentOption[i]
      const children = current?.children
      if (children?.length > 0) {
        // 为下一级增添数据
        cascaderOptions[index + 1] = children
        // 递归添加
        updateCascaderView(value, children, index + 1)
      } else {
        // 当最新的ul(级)没有下一级时删除之前选中ul的数据
        cascaderOptions.splice(index + 1, cascaderOptions.length - 1)
      }
    }
    /**
     * 选中项输出
     * 需要区分单选或多选模式
     * @param value 选中值集合
     * @param currentOption 激活的某项
     * @param index value的下标，起始为0
     */
    const updateCascaderValue = (value: CascaderValueType, currentOption: CascaderItem[], index: number) => {
      if (!multiple.value) {
        // 单选模式
        if (index === value.length) return
        const i = value[index] as number
        // 当前的子级
        const current = getCurrentOption(currentOption, i)
        const children = current?.children
        getInputValue(current.label, children, cascaderItemNeedProps.inputValueCache, props.showPath)
        if (children?.length > 0) {
          updateCascaderValue(value, children, index + 1)
        }
      } else {
        // 多选模式
        value.forEach((targetValue) => {
          console.log(tagList)
          initMultipleCascaderItem(targetValue, cascaderOptions[0], tagList)
        })
      }
    }
    /**
     * 根据value筛选每列中选中item
     */
    const getCurrentOption = (currentOption: CascaderItem[], i: number) => {
      return currentOption.filter(item => item?.value === i)[0]
    }
    /**
     * 监听视图更新
     */
    watch(cascaderItemNeedProps.activeIndexs, val => {
      // TODO 多选模式下优化切换选择后的视图切换
      cascaderOptions.splice(val.length, cascaderOptions.length - 1)
      updateCascaderView(val, cascaderOptions[0], 0)
    })
    /**
     * 监听点击最终的节点输出内容
     */
    watch(() => cascaderItemNeedProps.confirmInputValueFlg.value, () => {
      // 单选和多选模式初始化
      multiple.value
        ? initTagList(tagList)
        : initSingleIptValue(cascaderItemNeedProps.inputValueCache)
      // 输出确认的选中值
      cascaderItemNeedProps.value = reactive(cloneDeep(cascaderItemNeedProps.valueCache))
      menuShow.value = false
      // 点击确定过后禁止再次选中
      updateStopDefaultType()
      // 更新值
      updateCascaderValue(cascaderItemNeedProps.value, cascaderOptions[0], 0)
      inputValue.value = cascaderItemNeedProps.inputValueCache.value
      // 因为初始化了value，所以默认回显视图的选中态
      // 多选模式不默认视图打开状态，因为选中了太多个，无法确定展示哪一种选中态
      if (initIptValue && !multiple.value) {
        initActiveIndexs(props.value, cascaderOptions[0], 0, cascaderItemNeedProps.activeIndexs)
        initIptValue = false // 只需要初始化一次，之后不再执行
      }
    }, {
      immediate: true
    })

    return () => (
      <>
        <div class={rootClasses.value} onClick={openPopup} ref={origin} {...ctx.attrs}>
          { multiple.value
            ? <DMultipleBox placeholder={props.placeholder} activeOptions={tagList}></DMultipleBox>
            : <d-input
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={inputValue.value}
              ></d-input>
          }
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
