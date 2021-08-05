import { defineComponent } from 'vue'
import DatePicker from '../datepicker'

export default defineComponent({
  name: 'DDatepickerDemo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return <DatePicker />
    }
  }
})