import { defineComponent, Ref, ref, watch } from 'vue'
import DSelect from '../src/select'

export default defineComponent({
  name: 'DSelectDemo',
  setup() {
    function log (bool: boolean) {
      console.log('toggleChange', bool)
    }

    const value = ref<string | number>(9)
    watch(value, () => {
      console.log('值改变了！', value.value)
    })

    const doUpdate = (valueRef: Ref<string | number>, newVal: string | number) => {
      valueRef.value = newVal
    }
    const updateProps = {
      'onUpdate:value': (newVal: string | number) => doUpdate(value, newVal)
    }
    return () => {
      return (
        <>
          <DSelect
            value={ value.value }
            onToggleChange = { log }
            options={ [1,2,3,'www',9,6,4,5,1,54654,546,'wybhjbxhjabxhjbsajhvbashjcbsahjcbjahbchjasbcsjahbchj'] }
            { ...updateProps }
          />
        </>
      )
    }
  }
})