import { defineComponent } from 'vue'
import DSelect from '../src/select'

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