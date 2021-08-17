import Style from './input-number'

import { defineComponent } from 'vue'
import { inputNumberProps, InputNumberProps } from './input-number-types'

export default defineComponent({
  name: 'DInputNumber',
  props: inputNumberProps,
  emits: [],
  setup(props: InputNumberProps, ctx) {
    return {}
  },
  render() {
    const {
      placeholder
    } = this;
    return (
      <div className={Style.dInputNumber}>
        <input type="number" className={Style.dInputStyle} placeholder={placeholder} />
      </div>
    )
  }
})
