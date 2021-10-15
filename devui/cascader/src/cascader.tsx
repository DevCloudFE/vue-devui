import './cascader.scss'

import { defineComponent, ref, reactive } from 'vue'
import { cascaderProps, CascaderItem, CascaderProps } from './cascader-types'
import { getRootClass } from '../hooks/use-cascader-class'
import { popupHandles } from '../hooks/use-cascader-popup'
import DCascaderList from '../components/cascader-list'
// import { optionsHandles } from '../hooks/use-cascader-options'
import { userCascaderItem } from '../hooks/use-cascader-item'

export default defineComponent({
  name: 'DCascader',
  props: cascaderProps,
  setup(props: CascaderProps, ctx) {
    const origin = ref(null)
    const cascaderOptions = reactive<[CascaderItem[]]>([ props?.options ])
    // const value = props.value
    const position = reactive({
      originX: 'left', 
      originY: 'bottom', 
      overlayX: 'left', 
      overlayY: 'top'
    } as const)
    // popup弹出层
    const { menuShow, menuOpenClass, openPopup } = popupHandles()
    // 配置class
    const rootClasses = getRootClass(props, menuShow)
    // 传递给cascaderItem的props
    console.log(ctx.attrs)
    const { cascaderItemNeedProps } = userCascaderItem(props)
    return () => (
      <>
        <div class={rootClasses.value} onClick={openPopup} ref={origin} {...ctx.attrs}>
          <d-input
            disabled={props.disabled}
            placeholder={props.placeholder}
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
