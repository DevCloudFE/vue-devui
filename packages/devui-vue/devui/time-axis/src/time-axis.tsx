import { defineComponent } from 'vue'
import { timeAxisProps, TimeAxisProps } from './time-axis-types'
import TimeAxisItem from './components/time-axis-item'
import './time-axis.scss'

export default defineComponent({
  name: 'DTimeAxis',
  components: { TimeAxisItem },
  props: timeAxisProps,
  emits: [],
  setup(props: TimeAxisProps, ctx) {
    return () => {
      return (
        <div class={`devui-time-axis-${props.direction}`}>
          {
            props.data.map(item=> <TimeAxisItem {...item}/>)
          }
        </div>
      )
    }
  }
})
