import { GridStackOptions, GridStack } from 'gridstack';
import { onMounted } from 'vue';
import { DashboardProps } from '../dashboard-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export const ns = useNamespace('dashboard');

export const widgetClass = ns.e('widget');

const DEFAULT_OPTIONS: GridStackOptions = {
  class: ns.b(),
  auto: true,
  acceptWidgets: true,
  itemClass: widgetClass
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
    } as GridStackOptions,
    props.advancedOptions
  );

  let gridStack: GridStack = GridStack.init(gridStackOptions, uniqueName);

  onMounted(() => {
    gridStack = GridStack.init(gridStackOptions, uniqueName);
  });

  return {
    gridStack,
  };
}
