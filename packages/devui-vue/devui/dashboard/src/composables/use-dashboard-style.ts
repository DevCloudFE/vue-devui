/**
 * 仪表盘样式处理
 */

import { Ref, onMounted, watch } from 'vue';
import { GridStack, Utils } from 'gridstack';

export function useDashboardWidgetBg(showWidgetBg: Ref<boolean>, gridStack: Ref<GridStack | undefined>) {
  // BUG:如果使用ref导出className在tsx绑定的化，在toggle时存在问题，gridstack的基础样式和gridstack特性会被移除？？未找到具体原因是什么
  //     所以这里暂时只能通过手动操作DOM来实现block背景切换
  onMounted(() => showWidgetBg.value && gridStack.value?.el.classList.add('dashboard-show-widget-bg'));
  watch(
    () => showWidgetBg.value,
    () =>
      showWidgetBg.value
        ? gridStack.value?.el.classList.add('dashboard-show-widget-bg')
        : gridStack.value?.el.classList.remove('dashboard-show-widget-bg')
  );
}

export function useGridBlock(
  showGridBlock: Ref<boolean>,
  cellHeightProp: Ref<number | string>,
  marginProp: Ref<number | string>,
  columnProp: Ref<number | string>,
  gridStack: Ref<GridStack | undefined>
) {
  const styleId = `dashboard-style-${Date.now()}`;
  let styleSheet: CSSStyleSheet | null;

  // BUG:这里与上面useDashboardWidgetBg同理，只能手动操作DOM
  onMounted(() => showGridBlock.value && gridStack.value?.el.classList.add('dashboard-show-grid-block'));
  watch(
    () => showGridBlock.value,
    () =>
      showGridBlock.value
        ? gridStack.value?.el.classList.add('dashboard-show-grid-block')
        : gridStack.value?.el.classList.remove('dashboard-show-grid-block')
  );

  const updateGridBlockStyle = () => {
    if (!gridStack.value) {
      return;
    }

    // 存在时先移除
    if (styleSheet) {
      Utils.removeStylesheet(styleId);
      styleSheet = null;
    }

    styleSheet = Utils.createStylesheet(styleId, gridStack.value.el || undefined);

    const column = gridStack.value.opts.column as any;
    const margin = gridStack.value.opts.margin as number;
    const marginUnit = gridStack.value.opts.marginUnit;
    const cellHeight = gridStack.value.opts.cellHeight as number;
    const cellHeightUnit = gridStack.value.opts.cellHeightUnit;

    Utils.addCSSRule(
      styleSheet,
      `.grid-stack.dashboard-show-grid-block::before`,
      `
    background-image:
      linear-gradient(#fff 0, #fff ${margin * 2}${marginUnit},
        transparent ${margin * 2}${marginUnit}, transparent 100%),
      linear-gradient(90deg, #fff 0, #fff ${margin * 2}${marginUnit},
        transparent ${margin * 2}${marginUnit}, transparent 100%),
      linear-gradient(#f8f8f8 0 , #f8f8f8 100%);
    background-image:
      linear-gradient(var(--devui-base-bg, #fff) 0, var(--devui-base-bg, #fff) ${margin * 2}${marginUnit},
        transparent ${margin * 2}${marginUnit}, transparent 100%),
      linear-gradient(90deg, var(--devui-base-bg, #fff) 0, var(--devui-base-bg, #fff) ${margin * 2}${marginUnit},
        transparent ${margin * 2}${marginUnit}, transparent 100%),
      linear-gradient(var(--devui-area, #f8f8f8) 0 , var(--devui-area, #f8f8f8) 100%);
    background-size: ${100 / column}% ${cellHeight}${cellHeightUnit};
    background-position: -${margin}${marginUnit} -${margin}${marginUnit};
    `
    );
  };

  onMounted(updateGridBlockStyle);
  watch([cellHeightProp, marginProp, columnProp], updateGridBlockStyle, {
    flush: 'post',
  });
}
