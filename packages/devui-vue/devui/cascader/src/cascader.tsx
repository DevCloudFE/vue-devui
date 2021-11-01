import { defineComponent, ref, reactive, watch, toRef, Ref } from 'vue'
import { cascaderProps, CascaderItem, CascaderProps, CascaderValueType } from './cascader-types'
import { getRootClass } from '../hooks/use-cascader-class'
import { popupHandles } from '../hooks/use-cascader-popup'
import DCascaderList from '../components/cascader-list'
// import { optionsHandles } from '../hooks/use-cascader-options'
import { useCascaderItem } from '../hooks/use-cascader-item'
import { DMultipleBox } from '../components/cascader-multiple/index' 
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
    const multipleActiveArr = reactive<CascaderItem[]>([]) // 多选模式下选中的值数组，用于生成tag
    // let initIptValue = props.value.length > 0 ? true : false // 有value默认值时，初始化输出内容
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
      // getInputValue(current.label, children)
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
        getInputValue(current.label, children)
        if (children?.length > 0) {
          updateCascaderValue(value, children, index + 1)
        }
      } else {
        // 多选模式
        value.forEach(singleValues => {
          getMultipleCascaderItem(currentOption, singleValues, index)
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
     * 下拉框中输出内容
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

    /**
     * 多选模式下
     * 添加选中项
     * @param arr 当前选中的数组集合
     * @param singleItem 当前选中项
     * 
     */
    const addMultipleIptValue = (arr: CascaderItem[], singleItem: CascaderItem) => {
      arr.push(singleItem)
    }
    /**
     * 多选模式下
     * 初始化选中项，将选中的数组集合置为空
     * @param arr 当前选中的数组集合
     */
    const initMultipleIptValue = (arr: CascaderItem[]) => {
      arr.splice(0, arr.length)
    }
    /**
     * 单选模式初始化
     */
    const initSingleIptValue = (inputValueCache: Ref<string>) => {
      inputValueCache.value = ''
    }
    /**
     * @param currentOption 选中的某项
     * @param cascaderUlValues 多选集合中的某一个集合
     * @param index cascaderUlValues数组的起始项，最开始为0
     */
    const getMultipleCascaderItem = (currentOption: CascaderItem[], cascaderUlValues: number[], index: number) => {
      let nextOption = null
      // 根据value筛选出当前children中被选中的项
      for (let i = 0; i < currentOption.length; i++) {
        if (currentOption[i]?.value === cascaderUlValues[index]) {
          nextOption = currentOption[i]
          break
        }
      }
      if (nextOption?.children?.length > 0) {
        // 递归获取选中节点
        index += 1
        getMultipleCascaderItem(nextOption.children, cascaderUlValues, index)
      } else {
        // 没有子节点了则说明已经是最终节点
        addMultipleIptValue(multipleActiveArr, nextOption)
      }
    }
    /**
     * 触发input内容输出监听
     */
    // const triggerUpdateIptValue = () => {
    //   cascaderItemNeedProps.confirmInputValueFlg.value = !cascaderItemNeedProps.confirmInputValueFlg.value
    // }
    /**
     * 监听点击最终的节点输出内容
     */
     watch(() => cascaderItemNeedProps.confirmInputValueFlg.value, () => {
      // 单选和多选模式初始化
      multiple.value
        ? initMultipleIptValue(multipleActiveArr)
        : initSingleIptValue(cascaderItemNeedProps.inputValueCache)
      // 输出确认的选中值
      cascaderItemNeedProps.value = reactive(cloneDeep(cascaderItemNeedProps.valueCache))
      menuShow.value = false
      // 点击确定过后禁止再次选中
      updateStopDefaultType()
       // 更新值
      updateCascaderValue(cascaderItemNeedProps.value, props?.options, 0)
      inputValue.value = cascaderItemNeedProps.inputValueCache.value
    }, {
      immediate: true
    })
    /**
     * 监听视图更新
     */
    watch(cascaderItemNeedProps.activeIndexs, val => {
      updateCascaderView(val, props?.options, 0)
    })
    /**
     * 监听value值的改变
     * 改变cascaderOptions弹出层内容
     * 改变展示值
     */
    // watch(cascaderItemNeedProps.value, (val) => {
    //   // cascaderItemNeedProps.inputValueCache.value = ''
    //   // if (initIptValue) { // 因为初始化了value，所以默认输出值
    //   //   triggerUpdateIptValue()
    //   //   initIptValue = false // 只需要初始化一次，之后不再执行
    //   // }
    // }, {
    //   immediate: true
    // })

    return () => (
      <>
        <div class={rootClasses.value} onClick={openPopup} ref={origin} {...ctx.attrs}>
          { multiple.value
            ? <DMultipleBox placeholder={props.placeholder} activeOptions={multipleActiveArr}></DMultipleBox>
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
