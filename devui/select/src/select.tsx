
import './select.scss'
import { defineComponent, ref, Transition, computed } from 'vue'
import { selectProps, SelectProps, OptionItem } from './use-select'

export default defineComponent({
  name: 'DSelect',
  props: selectProps,
  emits: ['toggleChange', 'valueChange', 'update:value'],
  setup (props: SelectProps, ctx) {
    const isOpen = ref<boolean>(false)
    function toggleChange (bool: boolean) {
      isOpen.value = bool
      ctx.emit('toggleChange', bool)
    }

    const inputValue = computed(() => {
      return props.value + ''
    })
    function valueChange (item: OptionItem, index: number) {
      const value = typeof item === 'object' ? item.value : item
      ctx.emit('update:value', value)
      ctx.emit('valueChange', item, index)
      toggleChange(false)
    }

    function getItemClassName (item: OptionItem) {
      let classname = 'devui-select-item'
      const value = typeof item === 'object' ? item.value : item
      if (value === props.value) {
        classname = 'devui-select-item active'
      }
      return classname
    }

    return {
      isOpen,
      inputValue,
      valueChange,
      toggleChange,
      getItemClassName,
      ...props
    }
  },
  render () {
    const {
      options,
      isOpen,
      inputValue,
      valueChange,
      toggleChange,
      getItemClassName
    } = this

    return (
      <div class="devui-select">
        <div class="devui-select-selection">
          <input
            {...{dtextinput: true}}
            value={ inputValue }
            type="text"
            class="devui-select-input"
            readonly
            onClick={ () => toggleChange(true) }
          />
        </div>
        <Transition name="fade">
          <div v-show={ isOpen } class="devui-select-dropdown">
            <ul class="devui-select-dropdown-list devui-scrollbar">
              {
                options.map((item, i) => (
                  <li
                    onClick={ () => { valueChange(item, i) } }
                    class={ getItemClassName(item) }
                    key={ i }
                  >
                    { typeof item === 'object' ? item.name : item }
                  </li>
                ))
              }
            </ul>
          </div>
        </Transition>
      </div>
    )
  }
})