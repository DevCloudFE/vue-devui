import { defineComponent, ref, renderSlot, computed, Transition } from "vue"
import {
  OptionItem,
  editableSelectProps,
  EditableSelectProps,
} from "./editable-select-types"
import "./editable-select.scss"
import { Icon } from "../../icon"
import ClickOutside from "../../shared/devui-directive/clickoutside"
import { className } from "./utils"
import { debounce } from "lodash"
export default defineComponent({
  name: "DEditableSelect",
  directives: { ClickOutside },
  props: editableSelectProps,
  emits: ["update:modelValue"],
  setup(props: EditableSelectProps, ctx) {
    const inputCls = className(
      "devui-form-control devui-dropdown-origin devui-dropdown-origin-open",
      {
        disabled: props.disabled,
      }
    )

    const getLiCls = (item) => {
      const { disabledKey } = props
      return className("devui-dropdown-item", {
        disabled: disabledKey ? !!item[disabledKey] : false,
      })
    }

    const visible = ref(false)
    const inputValue = ref("")
    const query = ref(props.modelValue)

    const wait = computed(() => (props.remote ? 300 : 0))

    const emptyText = computed(() => {
      const options = filteredOptions.value
      if (!props.remote && inputValue.value && options.length === 0) {
        return "没有相关记录"
      }
      if (options.length === 0) {
        return "没有数据"
      }
      return null
    })
    const normalizeOptions = computed(() => {
      let options: OptionItem
      const { disabledKey } = props
      disabledKey ? disabledKey : "disabled"
      return props.options.map((item) => {
        if (typeof item !== "object") {
          options = {
            name: item,
          }
          return options
        }
        return item
      })
    })

    const filteredOptions = computed(() => {
      const isValidOption = (o: OptionItem): boolean => {
        const query = inputValue.value
        const containsQueryString = query ? o.name.includes(query) : true
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

    const handleClose = () => {
      visible.value = false
    }
    const toggleMenu = () => {
      if (!props.disabled) {
        visible.value = !visible.value
      }
    }
    const onInputChange = () => {
      if (props.filterMethod) {
        props.filterMethod(inputValue.value)
      } else if (props.remote) {
        props.remoteMethod(inputValue.value)
      }
    }

    const debouncedOnInputChange = debounce(onInputChange, wait.value)

    const handleInput = (event) => {
      const value = event.target.value
      inputValue.value = value
      query.value = value
      if (props.remote) {
        debouncedOnInputChange()
      } else {
        onInputChange()
      }
    }
    const selectOptionClick = (e, item) => {
      const { disabledKey } = props
      if (disabledKey && item[disabledKey]) {
        e.stopPropagation()
      } else {
        query.value = item.name
        ctx.emit("update:modelValue", item.name)
      }
    }
    return () => {
      return (
        <div
          class="devui-form-group devui-has-feedback devui-select-open"
          v-click-outside={handleClose}
          onClick={toggleMenu}
        >
          <input
            class={inputCls}
            type="text"
            onInput={handleInput}
            value={query.value}
          />
          <span class="devui-form-control-feedback">
            <span class="devui-select-chevron-icon">
              <Icon name="select-arrow" />
            </span>
          </span>
          <div class="devui-editable-select">
            <Transition name="fade">
              <div class="devui-dropdown-menu" v-show={visible.value}>
                <ul
                  class="devui-list-unstyled scroll-height"
                  style={{
                    maxHeight: props.maxHeight + "px",
                  }}
                >
                  {filteredOptions.value.map((item) => {
                    return (
                      <li
                        class={getLiCls(item)}
                        onClick={($evnet) => selectOptionClick($evnet, item)}
                        key={item.name}
                      >
                        {ctx.slots.default
                          ? renderSlot(ctx.slots, "default", { item })
                          : item.name}
                      </li>
                    )
                  })}
                  <li
                    class="devui-no-result-template"
                    v-show={filteredOptions.value.length === 0}
                  >
                    <div class="devui-no-data-tip">{emptyText.value}</div>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      )
    }
  },
})
