import { defineComponent } from 'vue'
import { autoCompleteProps, AutoCompleteProps } from './auto-complete-types'
import './auto-complete.scss'

export default defineComponent({
  name: 'DAutoComplete',
  props: autoCompleteProps,
  emits: [],
  setup(props: AutoCompleteProps, ctx) {
    return () => {
      return (<div class="devui-auto-complete"></div>)
    }
  }
})
