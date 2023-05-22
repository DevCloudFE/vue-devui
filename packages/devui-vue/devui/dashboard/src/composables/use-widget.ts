import { ToRefs, computed } from 'vue';
import { DashboardWidgetProps } from '../components/dashboard-widget/dashboard-widget-types';

export default function useWidget({
  autoPosition,
  x,
  y,
  w,
  h,
  minW,
  maxW,
  minH,
  maxH,
  noResize,
  noMove,
  locked,
  id,
  data,
}: ToRefs<DashboardWidgetProps>) {
  const widgetAttrs = computed(() => ({
    'gs-x': x?.value,
    'gs-y': y?.value,
    'gs-w': w.value,
    'gs-h': h.value
  }));

  return {
    widgetAttrs,
  };
}
