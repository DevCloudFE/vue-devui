import { defineComponent, toRefs } from 'vue';
import { dashboardWidgetProps, DashboardWidgetProps, EmitEvent, emitEvents } from './dashboard-widget-types';
import { widgetClass } from '../../composables/use-dashboard';
import useWidget from '../../composables/use-widget';

export default defineComponent({
  name: 'DDashboardWidget',
  props: dashboardWidgetProps,
  emits: emitEvents as unknown as (typeof emitEvents)[number][],
  setup(props: DashboardWidgetProps, ctx) {
    const { widgetAttrs, widgetRef } = useWidget(toRefs(props), ctx.emit);

    return () => {
      return (
        <div ref={widgetRef} class={[widgetClass, 'grid-stack-item']} {...widgetAttrs.value}>
          <div class="grid-stack-item-content">{ctx.slots.default?.()}</div>
        </div>
      );
    };
  },
});
