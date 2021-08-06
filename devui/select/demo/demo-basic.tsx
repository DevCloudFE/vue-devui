import { defineComponent } from 'vue'
import DSelect from '../select'

export default defineComponent({
  name: 'DSelectDemo',
  setup() {
    return () => {
      return (
        <>
          <DSelect />
        </>
      )
    }
  }
})