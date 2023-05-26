import { defineComponent, toRefs } from 'vue';
import { dashboardWidgetProps, DashboardWidgetProps, WidgetEmitEvent, widgetEmitEvents } from './dashboard-widget-types';
import { widgetClass } from '../../composables/use-dashboard';
import useWidget from '../../composables/use-widget';

export default defineComponent({
  name: 'DDashboardWidget',
  props: dashboardWidgetProps,
  emits: widgetEmitEvents as unknown as (typeof widgetEmitEvents)[number][],
  setup(props: DashboardWidgetProps, ctx) {
    const { widgetAttrs, widgetRef } = useWidget(toRefs(props), ctx.emit);

    return () => {
      return (
        <div ref={widgetRef} class={[widgetClass, 'grid-stack-item']} {...widgetAttrs.value}>
          <div class="grid-stack-item-content">{ctx.slots.default?.(widgetRef.value?.gridstackNode)}</div>
        </div>
      );
    };
  },
});
