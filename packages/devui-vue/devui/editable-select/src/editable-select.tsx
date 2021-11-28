import {
  defineComponent,
  Transition,
  ref,
  computed,
  reactive,
  toRefs,
  provide,
  renderSlot
} from 'vue'
import {
  OptionItem,
  editableSelectProps,
  EditableSelectProps,
  ConnectionPosition
} from './editable-select-types'
import SelectDropdown from './components/dropdown'
import './editable-select.scss'
import ClickOutside from '../../shared/devui-directive/clickoutside'
import { debounce } from 'lodash'
import { className } from './utils'
export default defineComponent({
  name: 'DEditableSelect',
  directives: { ClickOutside },
  props: editableSelectProps,
  emits: ['update:modelValue'],
  setup(props: EditableSelectProps, ctx) {
    const renderDropdown = (condition: boolean, type: number) => {
      if (!condition && type === 0) {
        return (
          <Transition name='fade'>
            <SelectDropdown options={filteredOptions.value}></SelectDropdown>
          </Transition>
        )
      } else if (condition && type === 1) {
        return (
          <d-flexible-overlay
            hasBackdrop={false}
            origin={origin}
            position={position}
            v-model:visible={visible.value}
          >
            <div
              class='devui-dropdown'
              style={{
                width: props.width + 'px'
              }}
            >
              <SelectDropdown options={filteredOptions.value}></SelectDropdown>
            </div>
          </d-flexible-overlay>
        )
      }
    }

    const renderDefaultSlots = (item) => {
      return ctx.slots.default ? renderSlot(ctx.slots, 'default', { item }) : item.name
    }

    const renderEmptySlots = () => {
      return ctx.slots.empty ? renderSlot(ctx.slots, 'empty') : emptyText.value
    }

    const origin = ref()
    const dropdownRef = ref()
    const visible = ref(false)
    const inputValue = ref('')
    const selectedIndex = ref(0)
    const query = ref(props.modelValue)
    const position = reactive<ConnectionPosition>({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top'
    })
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
    const findIndex = (o: OptionItem) => {
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
        selectedIndex.value = findIndex(item)
        inputValue.value = ''
        ctx.emit('update:modelValue', item.name)
      }
    }

    const loadMore = () => {
      if (!props.enableLazyLoad) return
      const dropdownVal = dropdownRef.value
      if (dropdownVal.clientHeight + dropdownVal.scrollTop >= dropdownVal.scrollHeight) {
        props.loadMore()
      }
    }
    provide('InjectionKey', {
      dropdownRef,
      props: reactive({
        ...toRefs(props)
      }),
      visible,
      emptyText,
      selectedIndex,
      loadMore,
      selectOptionClick,
      renderDefaultSlots,
      renderEmptySlots
    })
    return () => {
      const selectCls = className('devui-editable-select devui-form-group devui-has-feedback', {
        'devui-select-open': visible.value
      })
      const inputCls = className(
        'devui-form-control devui-dropdown-origin devui-dropdown-origin-open',
        {
          disabled: props.disabled
        }
      )

      return (
        <>
          <div class={selectCls} v-click-outside={handleClose} onClick={toggleMenu} ref={origin}>
            <input class={inputCls} type='text' onInput={handleInput} value={query.value} />
            <span class='devui-form-control-feedback'>
              <span class='devui-select-chevron-icon'>
                <d-icon name='select-arrow' />
              </span>
            </span>
            {renderDropdown(props.appendToBody, 0)}
          </div>
          {renderDropdown(props.appendToBody, 1)}
        </>
      )
    }
  }
})
