import {defineComponent, nextTick, onMounted, ref} from 'vue'
import { timeAxisProps, TimeAxisProps } from './time-axis-types'
import TimeAxisItem from './components/time-axis-item'
import './time-axis.scss'

export default defineComponent({
  name: 'DTimeAxis',
  components: { TimeAxisItem },
  props: timeAxisProps,
  emits: [],
  setup(props: TimeAxisProps, ctx) {

    const timeAxis = ref<null | HTMLElement>();
    let marginLeft = 35;
    onMounted(() => {
      nextTick(() => {
        const el = timeAxis.value;
        if(props.direction==='horizontal'){
          marginLeft = (el?.firstElementChild?.clientWidth||0)/2
        }
      });
    });


    return () => {
      return (
        <div class={`devui-time-axis-${props.direction}`} ref={timeAxis} style={{marginLeft:marginLeft+'px'}}>
          {
            props.data.map(item=> <TimeAxisItem {...item}/>)
          }
        </div>
      )
    }
  }
})
