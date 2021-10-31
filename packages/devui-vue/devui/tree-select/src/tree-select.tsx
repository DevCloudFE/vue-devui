import './tree-select.scss'

import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { treeSelectProps, TreeSelectProps } from './tree-select-types'
import { className } from './utils'

export default defineComponent({
  name: 'DTreeSelect',
  props: treeSelectProps,
  emits: ['toggleChange', 'valueChange', 'update:modelValue'],
  setup(props: TreeSelectProps, ctx) {
    
    const visible = ref<boolean>(false)
    const origin = ref()
    const position = reactive({
      originX: 'left', 
      originY: 'bottom', 
      overlayX: 'left', 
      overlayY: 'top'
    })
    const inputValue = ref<string>('')

    const { treeData } = toRefs(props)

    const mergeClearable = computed<boolean>(() => {
      return !props.disabled && props.allowClear && inputValue.value.length > 0;
    })

    function toggleChange() {
      if (props.disabled) return
      visible.value = !visible.value
      ctx.emit('toggleChange', visible.value)
    }

    function valueChange(data) {
      if (data.isOpen !== undefined) {
        data.isOpen = !data.isOpen
      } else {
        inputValue.value = data.label
        visible.value = false
        ctx.emit('update:modelValue', data.label)
        ctx.emit('toggleChange', visible.value)
      }
    }

    function handleClear(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      if (props.multiple) {
        ctx.emit('update:modelValue', [])
      } else {
        ctx.emit('update:modelValue', '')
        inputValue.value = ''
      }
    }

    return {
      visible,
      origin,
      position,
      inputValue,
      mergeClearable,
      treeData,
      handleClear,
      toggleChange,
      valueChange,
    }
  },
  render() {
    const {
      origin,
      position,
      inputValue,
      mergeClearable,
      treeData,
      placeholder,
      disabled,
      handleClear,
      toggleChange,
      valueChange
    } = this

    const treeSelectCls = className('devui-tree-select', {
      'devui-tree-select-open': this.visible,
      'devui-tree-select-disabled': disabled,
    })

    const renderNode = (item) => (
      <div 
        class="devui-tree-select-item" 
        style={{ paddingLeft: `${20 * (item.level - 1)}px` }}
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          valueChange(item)
        }}>
        { item.children ? 
        <span class={['devui-tree-select-arrow-expand', item.isOpen ? 'devui-tree-select-arrow-open' : '']}>
          <d-icon name="select-arrow" />
        </span> : <span>{'\u00A0\u00A0\u00A0'}</span>}
        {item.label}
      </div>
    )

    const renderTree = (treeData) => {
      return treeData.map(item => {
        if (item.children) {
          return (
            <>
              { renderNode(item) }
              { item.isOpen && renderTree(item.children) }
            </>
          )
        }
        return renderNode(item)
      })
    }

    return (
      <div class={treeSelectCls}>
        <div class={mergeClearable ? 'devui-tree-select-clearable' : ''} ref="origin" onClick={toggleChange}>
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
            <ul class="devui-tree-select-dropdown-list">{renderTree(treeData)}</ul>
          </div>
        </d-flexible-overlay>
      </div>
    )
  }
})
