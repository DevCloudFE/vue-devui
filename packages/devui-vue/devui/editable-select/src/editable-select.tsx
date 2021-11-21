import { defineComponent, ref, renderSlot, computed, Transition, watch } from 'vue'
import { OptionItem, editableSelectProps, EditableSelectProps } from './editable-select-types'
import './editable-select.scss'
import { Icon } from '../../icon'
import ClickOutside from '../../shared/devui-directive/clickoutside'
import { className } from './utils'
import { debounce } from 'lodash'
export default defineComponent({
  name: 'DEditableSelect',
  directives: { ClickOutside },
  props: editableSelectProps,
  emits: ['update:modelValue'],
  setup(props: EditableSelectProps, ctx) {
    const dropdownRef = ref(null)
    const visible = ref(false)
    const inputValue = ref('')
    const activeIndex = ref(0)
    const query = ref(props.modelValue)

    const wait = computed(() => (props.remote ? 300 : 0))

    const emptyText = computed(() => {
      const options = filteredOptions.value
      if (!props.remote && options.length === 0) {
        return '没有相关记录'
      }
      if (options.length === 0) {
        return '没有数据'
      }
      return null
    })

    const normalizeOptions = computed(() => {
      let options: OptionItem
      const { disabledKey } = props
      disabledKey ? disabledKey : 'disabled'
      return props.options.map((item) => {
        if (typeof item !== 'object') {
          options = {
            name: item
          }
          return options
        }
        return item
      })
    })

    const filteredOptions = computed(() => {
      const isValidOption = (o: OptionItem) => {
        const query = inputValue.value
        const containsQueryString = query
          ? o.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0
          : true
        return containsQueryString
      }
      return normalizeOptions.value
        .map((item) => {
          if (props.remote || isValidOption(item)) {
            return item
          }
          return null
        })
        .filter((item) => item !== null)
    })

    const findIndex = (o) => {
      return normalizeOptions.value.findIndex((item) => {
        return item.name === o.name
      })
    }

    const handleClose = () => {
      visible.value = false
    }
    const toggleMenu = () => {
      if (!props.disabled) {
        visible.value = !visible.value
      }
    }

    const onInputChange = (val: string) => {
      if (props.filterMethod) {
        props.filterMethod(val)
      } else if (props.remote) {
        props.remoteMethod(val)
      }
    }

    const debouncedOnInputChange = debounce(onInputChange, wait.value)

    const handleInput = (event) => {
      const value = event.target.value
      inputValue.value = value
      query.value = value
      if (props.remote) {
        debouncedOnInputChange(value)
      } else {
        onInputChange(value)
      }
    }

    const selectOptionClick = (e, item) => {
      const { disabledKey } = props
      if (disabledKey && item[disabledKey]) {
        e.stopPropagation()
      } else {
        query.value = item.name
        activeIndex.value = findIndex(item)
        inputValue.value = ''
        ctx.emit('update:modelValue', item.name)
      }
    }

    const loadMore = () => {
      if (!props.enableLazyLoad) return
      const dropdownVal = dropdownRef.value
      if (dropdownVal.clientHeight + dropdownVal.scrollTop >= dropdownVal.scrollHeight) {
        props.remoteMethod(inputValue.value)
      }
    }

    return () => {
      const selectCls = className('devui-form-group devui-has-feedback', {
        'devui-select-open': visible.value
      })
      const inputCls = className(
        'devui-form-control devui-dropdown-origin devui-dropdown-origin-open',
        {
          disabled: props.disabled
        }
      )

      const getLiCls = (item, index) => {
        const { disabledKey } = props
        return className('devui-dropdown-item', {
          disabled: disabledKey ? !!item[disabledKey] : false,
          selected: activeIndex.value === index
        })
      }

      return (
        <div class={selectCls} v-click-outside={handleClose} onClick={toggleMenu}>
          <input class={inputCls} type='text' onInput={handleInput} value={query.value} />
          <span class='devui-form-control-feedback'>
            <span class='devui-select-chevron-icon'>
              <Icon name='select-arrow' />
            </span>
          </span>
          <div class='devui-editable-select'>
            <Transition name='fade'>
              <div class='devui-dropdown-menu' v-show={visible.value}>
                <ul
                  class='devui-list-unstyled scroll-height'
                  ref={dropdownRef}
                  style={{
                    maxHeight: props.maxHeight + 'px'
                  }}
                  onScroll={loadMore}
                >
                  {filteredOptions.value.map((item, index) => {
                    return (
                      <li
                        class={getLiCls(item, index)}
                        onClick={($evnet) => selectOptionClick($evnet, item)}
                        key={item.name}
                      >
                        {ctx.slots.default ? renderSlot(ctx.slots, 'default', { item }) : item.name}
                      </li>
                    )
                  })}
                  <li class='devui-no-result-template' v-show={filteredOptions.value.length === 0}>
                    <div class='devui-no-data-tip'>{emptyText.value}</div>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      )
    }
  }
})
