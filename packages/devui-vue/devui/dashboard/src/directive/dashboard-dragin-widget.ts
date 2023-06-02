/**
 * 定义了一个可以被拖入仪表盘的外部挂件
 *
 * - 1. 增加默认acceptWidget类名
 * - 2. 注册拖拽新增挂件，赋予能力
 */

import { DirectiveBinding, computed } from 'vue';
import { GridStack, DDDragInOpt, DDGridStack } from 'gridstack';
import { acceptWidgetClass } from '../composables/use-dashboard';

type DashboardDraginValue = DirectiveBinding<DDDragInOpt>;

type DDElementHost = Parameters<DDGridStack['isDraggable']>[0];

const defaultDraginOpts: DDDragInOpt = {
  // dropping的DOM展示控制
  helper: (e) => {
    const parentNode = (e?.target as Node).parentElement?.cloneNode(true) as HTMLElement;

    return parentNode;
  },
  appendTo: 'body',
};

export default {
  name: 'dashboard-dragin-widget',
  mounted: (el: HTMLElement, binding: DashboardDraginValue): void => {
    const opts = computed(() => Object.assign({}, defaultDraginOpts, binding.value || {}));

    // 增加默认dashboard可接受拖入类名
    el.classList.add(acceptWidgetClass); // 拖拽新增默认的类名 --> 默认情况，dashboard只接受 acceptWidgetClass 的widget
    el.classList.add('grid-stack-item'); // 当设置acceptWidgets为true时，dashboard会接受所有带有grid-stack-item类名的widget

    // 注册拖拽加入widget
    GridStack.setupDragIn([el], opts.value);

    const ddDragable = (el as DDElementHost)?.ddElement?.ddDraggable;

    // 注册拖拽事件
    if (ddDragable) {
      ddDragable.on('dragstart', (e: MouseEvent) => {
        const dragstartEvent = new CustomEvent('dragstart', {
          detail: e,
          bubbles: true,
        });
        el.dispatchEvent(dragstartEvent);
      });

      ddDragable.on('dragstop', (e: MouseEvent) => {
        const dragstopEvent = new CustomEvent('dragstop', {
          detail: e,
          bubbles: true,
        });
        el.dispatchEvent(dragstopEvent);
      });
    }
  },
  unmounted: (el: HTMLElement): void => {
    const gridStackDD = GridStack.getDD();

    gridStackDD.draggable(el, 'destroy');
  },
};
