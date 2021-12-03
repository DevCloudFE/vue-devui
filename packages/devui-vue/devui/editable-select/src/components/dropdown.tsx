import { defineComponent, inject } from 'vue'
import { OptionItem, selectDropdownProps } from '../editable-select-types'
import { className } from '../utils'
export default defineComponent({
  name: 'DSelectDropdown',
  props: selectDropdownProps,
  setup(props) {
    const select = inject('InjectionKey') as any
    const {
      props: selectProps,
      dropdownRef,
      visible,
      selectOptionClick,
      renderDefaultSlots,
      renderEmptySlots,
      selectedIndex,
      loadMore
    } = select
    const { maxHeight } = selectProps
    return () => {
      const getLiCls = (item: OptionItem, index: number) => {
        const { disabledKey } = selectProps
        return className('devui-dropdown-item', {
          disabled: disabledKey ? !!item[disabledKey] : false,
          selected: selectedIndex.value === index
        })
      }
      return (
        <div class='devui-dropdown-menu' v-show={visible}>
          <ul
            ref={dropdownRef}
            class='devui-list-unstyled scroll-height'
            style={{
              maxHeight: maxHeight + 'px'
            }}
            onScroll={loadMore}
          >
            {props.options.map((o, index) => {
              return (
                <li class={getLiCls(o, index)} onClick={($evnet) => selectOptionClick($evnet, o)}>
                  {renderDefaultSlots(o)}
                </li>
              )
            })}
            <li class='devui-no-result-template' v-show={props.options.length === 0}>
              <div class='devui-no-data-tip'>{renderEmptySlots()}</div>
            </li>
          </ul>
        </div>
      )
    }
  }
})
