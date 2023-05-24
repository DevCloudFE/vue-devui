import { GridStackOptions, GridStack, Utils, GridItemHTMLElement } from 'gridstack';
import { onMounted, ref, watch } from 'vue';
import { DashboardProps } from '../dashboard-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { isMobile } from '../../../shared/utils';

export const ns = useNamespace('dashboard');

export const widgetClass = ns.e('widget');

const DEFAULT_OPTIONS: GridStackOptions = {
  class: ns.b(),
  auto: true,
  acceptWidgets: true, // default .grid-stack-item
  itemClass: widgetClass,
  resizable: {
    autoHide: isMobile,
    handles: 'se',
  },
  alwaysShowResizeHandle: isMobile,
};

export default function useDashboard(props: DashboardProps, uniqueName: string) {
  // 初始化仪表盘配置
  const gridStackOptions: GridStackOptions = Object.assign(
    {},
    DEFAULT_OPTIONS,
    {
      column: props.column,
      minRow: props.minRow,
      maxRow: props.maxRow,
      cellHeight: props.cellHeight,
      margin: props.margin,
      float: props.float,
      animate: props.animate,
      staticGrid: props.static,
      disableDrag: props.disableDrag,
      disableResize: props.disableResize,
      removable: props.trashSelector || false,
    },
    props.advancedOptions
  );
  const gridStack = ref<GridStack>();

  onMounted(() => {
    gridStack.value = GridStack.init(gridStackOptions, uniqueName);
  });

  // Props响应式实现
  const propsReactiveHandle = () => {
    watch(
      () => props.static,
      () => {
        gridStack.value?.setStatic(props.static);
      }
    );
    watch(
      () => props.float,
      () => {
        gridStack.value?.float(props.float);
      }
    );
    watch(
      () => props.animate,
      () => {
        gridStack.value?.setAnimation(props.animate);
      }
    );
    watch(
      () => props.disableDrag,
      () => {
        gridStack.value?.enableMove(!props.disableDrag);
      }
    );
    watch(
      () => props.disableResize,
      () => {
        gridStack.value?.enableResize(!props.disableResize);
      }
    );
    watch(
      () => props.column,
      () => {
        gridStack.value?.column(props.column);
      }
    );
    watch(
      () => props.minRow,
      () => {
        if (gridStack.value) {
          gridStack.value.opts.minRow = props.minRow;
        }
      }
    );
    watch(
      () => props.maxRow,
      () => {
        if (gridStack.value) {
          gridStack.value.engine.maxRow = props.maxRow;
        }
      }
    );
    watch(
      () => props.margin,
      () => {
        gridStack.value?.margin(props.margin);
      }
    );
    watch(
      () => props.cellHeight,
      () => {
        gridStack.value?.cellHeight(props.cellHeight);
      }
    );
  };
  propsReactiveHandle();

  return {
    gridStack,
  };
}
