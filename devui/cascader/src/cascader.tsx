import './cascader.scss'

import { defineComponent, ref, reactive } from 'vue'
import { cascaderProps, CascaderProps } from './cascader-types'
import { getRootClass } from '../hooks/use-cascader-class'
import { popupHandles } from '../hooks/use-cascader-popup'
import DCascaderList from '../components/cascader-list'
import { optionsHandles } from '../hooks/use-cascader-options'


export default defineComponent({
  name: 'DCascader',
  props: cascaderProps,
  emits: [],
  setup(props: CascaderProps, ctx) {
    const origin = ref(null)
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
    // 级联菜单操作，变换ul、li等
    const { cascaderOptions } = optionsHandles(props.options)
    return () => (
      <>
        <div class={rootClasses.value} onClick={openPopup} ref={origin}  {...ctx.attrs}>
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
                return <DCascaderList cascaderlis={item} ul-index={index}></DCascaderList>
              })}
            </div>
          </div>
        </d-flexible-overlay>
      </>
    )
  },
})
