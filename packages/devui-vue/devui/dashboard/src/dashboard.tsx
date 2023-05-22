import { defineComponent, provide, toRefs } from 'vue';
import { dashboardProps, DashboardProps } from './dashboard-types';
import useDashboard, { ns } from './composables/use-dashboard';
import './dashboard.scss';

export default defineComponent({
  name: 'DDashboard',
  props: dashboardProps,
  emits: ['widgetAdded', 'widgetChanged', 'widgetRemoved', 'dashboardInit'],
  setup(props: DashboardProps, ctx) {
    const {
      advancedOptions,
      column,
      minRow,
      maxRow,
      cellHeight,
      margin,
      float,
      animate,
      static: StaticGrid,
      disableDrag,
      disableResize,
      showGridBlock,
      trashSelector,
    } = toRefs(props);

    const uniqueName = ns.m(`${Date.now()}`);
    const { gridStack } = useDashboard(props, uniqueName);

    {
      provide('rootDashboardEmit', ctx.emit);
    }

    return () => {
      return <div class={[ns.b(), uniqueName]}>{ctx.slots.default?.()}</div>;
    };
  },
});
