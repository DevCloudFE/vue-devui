import { ToRefs, ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { GridHTMLElement, GridItemHTMLElement } from 'gridstack';
import { DashboardWidget, DashboardWidgetProps, WidgetEmitEvent } from '../components/dashboard-widget/dashboard-widget-types';
import useAttrsObserver, { dealBoolean, dealNumber } from './use-attrs-observer';

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

const isAttrEqual = (oldValue: string | null, newValue: any, nullBeOne = false) => {
  const type = typeof newValue;

  if (type === 'boolean') {
    return dealBoolean(oldValue) === newValue;
  } else if (type === 'number') {
    return dealNumber(oldValue, nullBeOne) === newValue;
  }

  return oldValue === newValue;
};

export default function useWidget(
  { autoPosition, x, y, w, h, minW, maxW, minH, maxH, noResize, noMove, locked, id, data }: ToRefs<DashboardWidgetProps>,
  emit: WidgetEmitEvent
) {
  const widgetRef = ref<GridItemHTMLElement>();

  // 获取当前 widget 所在的 dashboard(gridstack)
  const gridStack = computed(() => (widgetRef.value?.parentElement as GridHTMLElement).gridstack);

  // 获取当前 widgetNode
  const widgetNode = computed(() => widgetRef.value?.gridstackNode as DashboardWidget);

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

  const setWidgetData = () => {
    if (widgetNode.value) {
      widgetNode.value.data = data?.value;
    }
  };

  // props响应式部分参数处理
  {
    watch([x, y, w, h, minW, minH, maxW, maxH], ([newX, newY, newW, newH, newMinW, newMinH, newMaxW, newMaxH]) => {
      if (!widgetRef.value) {
        return;
      }

      // 更新布局
      gridStack.value?.update(widgetRef.value, {
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
      if (!widgetRef.value) {
        return;
      }
      gridStack.value?.resizable(widgetRef.value, !noResize.value);
    });

    watch(noMove, () => {
      if (!widgetRef.value) {
        return;
      }
      gridStack.value?.movable(widgetRef.value, !noMove.value);
    });

    watch(locked, () => {
      if (!widgetRef.value) {
        return;
      }
      gridStack.value?.update(widgetRef.value, { locked: locked.value });
    });

    watch(() => data?.value, setWidgetData);
  }

  // 侦听用户操作/gridstack内部计算导致的 widget 参数变化，同步到外部
  {
    const { observerAttributesChange } = useAttrsObserver<keyof DashboardWidgetProps, Parameters<WidgetEmitEvent>[0]>(
      ATTRS_PROPS_MAP,
      emit
    );

    onMounted(() => {
      if (!widgetRef.value) {
        return;
      }
      observerAttributesChange(widgetRef.value, (mutation, newValue) => {
        const { attributeName, oldValue } = mutation;
        const isEqual = isAttrEqual(oldValue, newValue, attributeName === 'gs-w' || attributeName === 'gs-h');

        if (isEqual) {
          return;
        }

        // 根据修改的属性，触发对应事件
        switch (attributeName) {
        case 'gs-x':
          emit('xChange', newValue);
          break;
        case 'gs-y':
          emit('yChange', newValue);
          break;
        case 'gs-w':
          emit('widthChange', newValue);
          emit('widgetResize', { w: widgetNode.value?.w, h: widgetNode.value?.h });
          break;
        case 'gs-h':
          emit('heightChange', newValue);
          emit('widgetResize', { w: widgetNode.value?.w, h: widgetNode.value?.h });
          break;
        }
      });
    });
  }

  // widgetNode 需要等待父级 gridstack 准备好才会真正的被初始化，所以不能简单认为 onMounted === widgetInit
  const stopWatchWidgetInit = watch(
    () => widgetNode.value,
    () => {
      if (widgetNode.value) {
        emit('widgetInit');
        setWidgetData();
        stopWatchWidgetInit(); // 初始化完毕后取消watch
      }
    }
  );

  onUnmounted(() => emit('widgetDestroy'));

  return {
    widgetAttrs,
    widgetRef,
  };
}
