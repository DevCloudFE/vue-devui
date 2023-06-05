import { defineComponent, toRefs } from 'vue';
import { dashboardEmitEvents, dashboardProps, DashboardProps } from './dashboard-types';
import useDashboard, { ns } from './composables/use-dashboard';
import { useDashboardWidgetBg, useGridBlock } from './composables/use-dashboard-style';
import './dashboard.scss';

export default defineComponent({
  name: 'DDashboard',
  props: dashboardProps,
  emits: dashboardEmitEvents as unknown as (typeof dashboardEmitEvents)[number][],
  setup(props: DashboardProps, ctx) {
    const {
      column,
      cellHeight,
      margin,
      showGridBlock,
      showWidgetBg,
    } = toRefs(props);

    const uniqueName = ns.m(`${Date.now()}`);

    const { gridStack } = useDashboard(props, uniqueName, ctx.emit);

    useDashboardWidgetBg(showWidgetBg, gridStack);

    useGridBlock(showGridBlock, cellHeight, margin, column, gridStack);

    return () => {
      return <div class={[ns.b(), uniqueName]}>{ctx.slots.default?.()}</div>;
    };
  },
});
