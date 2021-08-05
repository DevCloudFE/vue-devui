import { defineComponent } from 'vue'
import './datepicker.css'

const DataPickerInputIcon = defineComponent({
  name: 'DDatepickerInputIcon',
  props: {
    marginLeft: { type: Number, default: 0 },
    marginRight: { type: Number, default: 0 },
  },
  setup(props, ctx) {
    const { marginLeft = 0, marginRight = 0 } = props || {}
    return () => <i class="datepicker-input-icon" style={{
      marginLeft: `${marginLeft}px`,
      marginRight: `${marginRight}px`,
    }}></i>
  }
})

const DataPickerInput = defineComponent({
  name: 'DDatepickerInput',
  props: {
    width: { type: Number, default: 160 }
  },
  setup(props, ctx) {
    const { width = 160 } = props || {}
    return () => {
      return (
        <div class="datapicker-input-border" style={{ width: `${width}px` }}>
          <input class="datapicker-input" type="text" />
          <DataPickerInputIcon marginLeft={3} />
        </div>
      )
    }
  }
})

export default defineComponent({
  name: 'DDatepicker',
  props: {
  },
  setup(props, ctx) {
    return () => {
      return (
        <div class="datapicker-container">
          <DataPickerInput width={140} />
        </div>
      )
    }
  }
})