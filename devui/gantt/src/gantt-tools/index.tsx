import { defineComponent, ref } from 'vue'
import './gantt-tools.scss'
import { UnitRole } from '../gantt-model'

export default defineComponent({
  name: 'DGanttTools',
  props: {
    // currentUnit: {
    //   type: String,
    //   default: null,
    // },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['goToday', 'reduceUnit', 'increaseUnit', 'switchView'],
  setup(props, ctx) {
    const currentUnitLabel = ref('')
    const views = ref([
      {
        name: 'Day',
        value: 'day',
      },
      {
        name: 'Week',
        value: 'week',
      },
      {
        name: 'Month',
        value: 'month',
      },
    ])
    const actionHandle = (type: string) => {
      switch (type) {
        case 'today':
          ctx.emit('goToday')
          break
        case 'reduce':
          ctx.emit('reduceUnit')
          break
        case 'increase':
          ctx.emit('increaseUnit')
          break
      }
    }
    const selectView = (value: string) => {
      ctx.emit('switchView', value)
    }
    return {
      actionHandle,
      currentUnitLabel,
      views,
      selectView,
    }
  },
  render() {
    const { isFullScreen, actionHandle, currentUnitLabel, views, selectView } =
      this
    return (
      <div
        class="tools-container"
        style={{ position: isFullScreen ? 'fixed' : 'absolute' }}
      >
        <d-button
          bsStyle="text-dark"
          onClick={() => actionHandle('today')}
          class="tool"
        >
          Today
        </d-button>
        <div class="tool">
          <d-select
            v-model={currentUnitLabel}
            options={views}
            onValueChange={selectView}
          ></d-select>
        </div>
        <d-button
          bsStyle="text-dark"
          class={['tool', currentUnitLabel === UnitRole.day ? 'disabled' : '']}
          disabled={currentUnitLabel === UnitRole.day}
        >
          <d-icon name="minus"></d-icon>
        </d-button>
        <d-button
          bsStyle="text-dark"
          class={['tool', currentUnitLabel === UnitRole.day ? 'disabled' : '']}
          disabled={currentUnitLabel === UnitRole.day}
        >
          <d-icon name="add"></d-icon>
        </d-button>
      </div>
    )
  },
})
