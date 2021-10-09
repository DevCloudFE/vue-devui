import './tree-select.scss'

import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { treeSelectProps, TreeSelectProps } from './tree-select-types'
import { className } from './utils'

export default defineComponent({
  name: 'DTreeSelect',
  props: treeSelectProps,
  emits: ['toggleChange', 'update:modelValue'],
  setup(props: TreeSelectProps, ctx) {
    
    const visible = ref<boolean>(false)
    const origin = ref()
    const position = reactive({
      originX: 'left', 
      originY: 'bottom', 
      overlayX: 'left', 
      overlayY: 'top'
    })

    const { treeData } = toRefs(props)

    const inputValue = computed(() => {
      return ''
    })

    function toggleChange() {
      if(props.disabled) return
      visible.value = !visible.value
      ctx.emit('toggleChange', visible.value)
    }

    function handleClear(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      if (props.multiple) {
        ctx.emit('update:modelValue', [])
      } else {
        ctx.emit('update:modelValue', '')
      }
    }

    return {
      visible,
      origin,
      position,
      treeData,
      inputValue,
      handleClear,
      toggleChange,
    }
  },
  render() {
    const {
      origin,
      position,
      treeData,
      inputValue,
      placeholder,
      disabled,
      handleClear,
      toggleChange,
    } = this

    const renderNode = (item) => (
      <div style={{ paddingLeft: `${20 * (item.level - 1)}px` }}>
        { item.children ? <d-icon name="select-arrow" /> : <span>{'\u00A0\u00A0\u00A0'}</span>}
        {item.label}
      </div>
    )

    const renderTree = (treeData) => {
      return treeData.map(item => {
        if (item.children) {
          return (
            <>
              { renderNode(item) }
              { renderTree(item.children) }
            </>
          )
        }
        return renderNode(item)
      })
    }

    const treeSelectCls = className('devui-tree-select', {
      'devui-tree-select-open': this.visible,
      'devui-tree-select-disabled': disabled,
    })

    return (
      <div class={treeSelectCls}>
        <div ref="origin" onClick={toggleChange}>
          <input
            value={inputValue}
            type="text"
            class="devui-tree-select-input"
            placeholder={placeholder}
            readonly
            disabled={disabled}
          />
          <span onClick={handleClear} class="devui-tree-select-clear">
            <d-icon name="close" />
          </span>
          <span class="devui-tree-select-arrow">
            <d-icon name="select-arrow" />
          </span>
        </div>
        <d-flexible-overlay origin={origin} v-model={[this.visible, 'visible']} position={position}>
          <div class="devui-tree-select-dropdown">
            <ul class="devui-tree-select-dropdown-list devui-scrollbar">{renderTree(treeData)}</ul>
          </div>
          {/* {renderTree(treeData)} */}
        </d-flexible-overlay>
      </div>
    )
  }
})
