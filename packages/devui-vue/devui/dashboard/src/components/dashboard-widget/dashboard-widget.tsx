import { defineComponent, toRefs } from 'vue';
import { dashboardWidgetProps, DashboardWidgetProps } from './dashboard-widget-types';
import { widgetClass } from '../../composables/use-dashboard';
import useWidget from '../../composables/use-widget';

export default defineComponent({
  name: 'DDashboardWidget',
  props: dashboardWidgetProps,
  emits: [],
  setup(props: DashboardWidgetProps, ctx) {
    const { widgetAttrs } = useWidget(toRefs(props));

    return () => {
      return (
        <div class={[widgetClass, 'grid-stack-item']} {...widgetAttrs.value}>
          <div class="grid-stack-item-content">{ctx.slots.default?.()}</div>
        </div>
      );
    };
  },
});
