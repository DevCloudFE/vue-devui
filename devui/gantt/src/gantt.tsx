import { defineComponent } from 'vue'
import { ganttProps, GanttProps } from './gantt-types'
import './gantt.scss'

export default defineComponent({
  name: 'DGantt',
  props: ganttProps,
  emits: [],
  setup(props: GanttProps, ctx) {
    return (
      <div class="devui-gantt"></div>
    )
  }
})
