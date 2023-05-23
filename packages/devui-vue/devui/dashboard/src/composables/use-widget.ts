import { ToRefs, ref, onMounted, watch, computed } from 'vue';
import { Utils, GridHTMLElement, GridItemHTMLElement, GridStack } from 'gridstack';
import { DashboardWidgetProps, EmitEvent } from '../components/dashboard-widget/dashboard-widget-types';
import useAttrsObserver from './use-attrs-observer';

const ATTRS_PROPS_MAP = new Map<string, { prop: keyof DashboardWidgetProps; type: 'string' | 'number' | 'boolean' }>([
  ['gs-x', { prop: 'x', type: 'number' }],
  ['gs-y', { prop: 'y', type: 'number' }],
  ['gs-w', { prop: 'w', type: 'number' }],
  ['gs-h', { prop: 'h', type: 'number' }],
  ['gs-min-w', { prop: 'minW', type: 'number' }],
  ['gs-max-w', { prop: 'maxW', type: 'number' }],
  ['gs-min-h', { prop: 'minH', type: 'number' }],
  ['gs-max-h', { prop: 'maxH', type: 'number' }],
  ['gs-no-resize', { prop: 'noResize', type: 'boolean' }],
  ['gs-no-move', { prop: 'noMove', type: 'boolean' }],
  ['gs-locked', { prop: 'locked', type: 'boolean' }],
  ['gs-id', { prop: 'id', type: 'string' }],
]);

export default function useWidget(
  { autoPosition, x, y, w, h, minW, maxW, minH, maxH, noResize, noMove, locked, id, data }: ToRefs<DashboardWidgetProps>,
  emit: EmitEvent
) {
  let gridStack: GridStack | undefined;
  const widgetRef = ref<HTMLElement>();

  // 获取当前 widget 所在的 dashboard（PS:由于父子组件时序问题，所以得写成函数来获取）
  const getCacheGridStack = () => gridStack || (gridStack = (widgetRef.value?.parentElement as GridHTMLElement).gridstack);

  // 获取当前 widget
  const getWidgetElement = () => Utils.getElement(widgetRef.value as GridItemHTMLElement) as GridItemHTMLElement;

  const widgetAttrs = computed(() => ({
    'gs-x': x.value,
    'gs-y': y.value,
    'gs-w': w.value,
    'gs-h': h.value,
    'gs-min-w': minW.value,
    'gs-max-w': maxW.value,
    'gs-min-h': minH.value,
    'gs-max-h': maxH.value,
    'gs-no-resize': noResize.value,
    'gs-no-move': noMove.value,
    'gs-auto-position': autoPosition.value,
    'gs-locked': locked.value,
    'gs-id': id?.value,
  }));

  // props响应式
  onMounted(() => {
    // props响应式部分参数处理
    watch([x, y, w, h, minW, minH, maxW, maxH], ([newX, newY, newW, newH, newMinW, newMinH, newMaxW, newMaxH]) => {
      getCacheGridStack();

      // 更新布局
      gridStack?.update(getWidgetElement(), {
        x: newX,
        y: newY,
        w: newW,
        h: newH,
        minW: newMinW,
        minH: newMinH,
        maxW: newMaxW,
        maxH: newMaxH,
      });
    });

    watch(noResize, () => {
      getCacheGridStack();
      gridStack?.resizable(getWidgetElement(), !noResize.value);
    });

    watch(noMove, () => {
      getCacheGridStack();
      gridStack?.movable(getWidgetElement(), !noMove.value);
    });

    watch(locked, () => {
      getCacheGridStack();
      gridStack?.update(getWidgetElement(), { locked: locked.value });
    });
  });

  // 侦听用户操作/gridstack内部计算导致的 widget 参数变化，同步到外部
  {
    const { observerAttributesChange } = useAttrsObserver(ATTRS_PROPS_MAP, emit);

    onMounted(() => {
      observerAttributesChange(getWidgetElement());
    });
  }

  return {
    widgetAttrs,
    widgetRef,
  };
}
