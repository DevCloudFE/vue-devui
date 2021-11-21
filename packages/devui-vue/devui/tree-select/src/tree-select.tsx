import './tree-select.scss'

import { defineComponent, ref, Transition } from 'vue'
import type { SetupContext } from 'vue'
import { treeSelectProps, TreeSelectProps, TreeItem } from './tree-select-types'
import { attributeExtension, className } from './utils'
import useToggle from '../hooks/use-toggle'
import useSelect from '../hooks/use-select'
import useClear from '../hooks/use-clear'
import IconOpen from '../assets/open.svg'
import IconClose from '../assets/close.svg'
import Checkbox from '../../checkbox/src/checkbox'

export default defineComponent({
  name: 'DTreeSelect',
  props: treeSelectProps,
  emits: ['toggleChange', 'valueChange', 'update:modelValue'],
  setup(props: TreeSelectProps, ctx: SetupContext) {
    const { treeData, placeholder, disabled, multiple, leafOnly } = props
    const { visible, selectToggle, treeToggle} = useToggle(props)
    const { inputValue, selectValue } = useSelect(props)
    const { isClearable, handleClear} = useClear(props, ctx, inputValue)

    const clickNode = (item: TreeItem)=> {
      if(!leafOnly) {
        selectValue(item)
        !multiple && selectToggle(item)
      } else {
        if(!item.children) {
          selectValue(item)
          !multiple && selectToggle(item)
        }
      }
    }

    const treeSelectCls = className('devui-tree-select', {
      'devui-tree-select-open': visible.value,
      'devui-tree-select-disabled': disabled,
    })

    const renderNode = (item) => (
      <div 
        class="devui-tree-select-item" 
        style={{ paddingLeft: `${20 * (item.level - 1)}px` }}
        onClick={() => clickNode(item)}
        >
        { item.children
          ? item.opened 
          ? <IconOpen class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)}/> 
          : <IconClose class="mr-xs" onClick={(e: MouseEvent) => treeToggle(e, item)} /> 
          :<span>{'\u00A0\u00A0\u00A0'}</span>
        }
        { multiple
        ? item.halfchecked 
          ? <Checkbox label={item.label} halfchecked={item.halfchecked} />
          : <Checkbox label={item.label} checked={item.checked} />
        : (item.label)}
      </div>
    )

    const renderTree = (treeData) => {
      return treeData.map(item => {
        if (item.children) {
          return (
            <>
              { renderNode(item) }
              { item.opened && renderTree(item.children) }
            </>
          )
        }
        return renderNode(item)
      })
    }

    return () => {
      return (
        <div class={treeSelectCls}>
          <div 
            class={isClearable.value ? 'devui-tree-select-clearable' : 'devui-tree-select-notclearable'}
            onClick={() => selectToggle()}>
            <input
              value={inputValue.value}
              type="text"
              class="devui-tree-select-input"
              placeholder={placeholder}
              readonly
              disabled={disabled}
            />
            <span onClick={(e: MouseEvent) => handleClear(e)} class="devui-tree-select-clear">
              <d-icon name="close" />
            </span>
            <span class="devui-tree-select-arrow">
              <d-icon name="select-arrow" />
            </span>
          </div>
          <Transition name="fade" ref="dropdownRef">
            <div v-show={visible.value} class="devui-tree-select-dropdown">
              <ul class="devui-tree-select-dropdown-list">{renderTree(attributeExtension(treeData))}</ul>
            </div>
          </Transition>
        </div>
      )
    }
  },
})
