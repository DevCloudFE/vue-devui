import { defineComponent, ref } from 'vue';
import './gantt-tools.scss';
import { GanttScaleUnit } from '../gantt-model';

export default defineComponent({
  name: 'DGanttTools',
  props: {
    unit: {
      type: String,
      default: null,
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['goToday', 'reduceUnit', 'increaseUnit', 'switchView'],
  setup(props, ctx) {
    const currentUnitLabel = ref(props.unit);
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
    ]);
    const actionHandle = (type: string) => {
      switch (type) {
      case 'today':
        ctx.emit('goToday');
        break;
      case 'reduce':
        ctx.emit('reduceUnit');
        break;
      case 'increase':
        ctx.emit('increaseUnit');
        break;
      }
    };
    const selectView = (selectItem: { name: string; value: string }) => {
      ctx.emit('switchView', selectItem.value);
    };
    return {
      actionHandle,
      currentUnitLabel,
      views,
      selectView,
    };
  },
  render() {
    const { isFullScreen, actionHandle, views, selectView, $slots } = this;

    return (
      <div
        class="tools-container"
        style={{ position: isFullScreen ? 'fixed' : 'absolute' }}
      >
        <d-button
          variant="common"
          onClick={() => actionHandle('today')}
          class="tool"
        >
          Today
        </d-button>
        <div class="tool">
          <d-select
            v-model={this.currentUnitLabel}
            options={views}
            onValueChange={selectView}
          ></d-select>
        </div>
        <d-button
          variant="common"
          class={[
            'tool',
            'minus',
            this.currentUnitLabel === GanttScaleUnit.day ? 'disabled' : '',
          ]}
          disabled={this.currentUnitLabel === GanttScaleUnit.day}
          onClick={() => actionHandle('reduce')}
        >
          <d-icon name="minus"></d-icon>
        </d-button>
        <d-button
          variant="common"
          class={[
            'tool',
            'add',
            this.currentUnitLabel === GanttScaleUnit.month ? 'disabled' : '',
          ]}
          disabled={this.currentUnitLabel === GanttScaleUnit.month}
          onClick={() => actionHandle('increase')}
        >
          <d-icon name="add"></d-icon>
        </d-button>
        {$slots.default && $slots.default()}
      </div>
    );
  },
});
