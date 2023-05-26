/**
 * 定义了一个可以被拖入仪表盘的外部挂件
 */

import { DirectiveBinding, computed } from 'vue';
import { GridStack, GridItemHTMLElement, DDDragInOpt } from 'gridstack';
import { widgetClass, acceptWidgetClass } from '../composables/use-dashboard';

const defaultDraginOpts: DDDragInOpt = {
  helper: 'clone',
  appendTo: 'body',
};

type DashboardDraginValue = DirectiveBinding<DDDragInOpt>;

export default {
  name: 'dashboard-dragin-widget',
  mounted: (el: HTMLElement, binding: DashboardDraginValue) => {
    const opts = computed(() => Object.assign({}, defaultDraginOpts, binding.value || {}));

    // 增加默认dashboard可接受拖入类名
    el.classList.add(acceptWidgetClass);

    // 检查content
    GridStack.setupDragIn([el], opts.value);
  }
};
