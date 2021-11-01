import { defineComponent } from 'vue'
import { readTipProps, ReadTipProps } from './read-tip-types'
import './read-tip.scss'

export default defineComponent({
  name: 'DReadTip',
  props: readTipProps,
  emits: [],
  setup(props: ReadTipProps, ctx) {
    return () => {
      return (<div class="devui-read-tip"></div>)
    }
  }
})
