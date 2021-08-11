import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DDatepickerDemo',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return (
        <div>
          Hello DatePicker
        </div>
      )
    }
  }
})