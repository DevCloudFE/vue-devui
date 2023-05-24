import { Ref, computed, onMounted, watch } from 'vue';
import { GridStack, Utils } from 'gridstack';

export function useDashboardWidgetBg(showWidgetBg: Ref<boolean>) {
  const dashboardWidgetBgClass = computed(() => (showWidgetBg.value ? 'dashboard-show-widget-bg' : ''));

  return {
    dashboardWidgetBgClass,
  };
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

  const dashboardGridBlockClass = computed(() => (showGridBlock.value ? 'dashboard-show-grid-block' : ''));

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

  return {
    dashboardGridBlockClass,
  };
}
