import { defineComponent, toRefs } from 'vue';
import { dashboardProps, DashboardProps } from './dashboard-types';
import useDashboard, { ns } from './composables/use-dashboard';
import { useDashboardWidgetBg, useGridBlock } from './composables/use-dashboard-style';
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
      showWidgetBg,
    } = toRefs(props);

    const uniqueName = ns.m(`${Date.now()}`);
    const { gridStack } = useDashboard(props, uniqueName);

    const { dashboardWidgetBgClass } = useDashboardWidgetBg(showWidgetBg);

    // TODO:toggle时存在问题，gridstack的基础样式会被移除？？
    const { dashboardGridBlockClass } = useGridBlock(showGridBlock, cellHeight, margin, column, gridStack);

    return () => {
      return <div class={[ns.b(), uniqueName, dashboardGridBlockClass.value, dashboardWidgetBgClass.value]}>{ctx.slots.default?.()}</div>;
    };
  },
});
