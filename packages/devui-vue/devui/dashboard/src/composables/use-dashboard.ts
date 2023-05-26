import { GridStackOptions, GridStack, Utils, GridItemHTMLElement } from 'gridstack';
import { onMounted, ref, watch, Ref } from 'vue';
import { DashboardProps } from '../dashboard-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { isMobile } from '../../../shared/utils';

export const ns = useNamespace('dashboard');

// widget类名
export const widgetClass = ns.e('widget');

// 可被拖拽新增加入的widget类名
export const acceptWidgetClass = ns.em('widget', 'new');

const DEFAULT_OPTIONS: GridStackOptions = {
  class: ns.b(),
  auto: true,
  acceptWidgets: `.${acceptWidgetClass}`,
  itemClass: widgetClass,
  resizable: {
    autoHide: isMobile,
    handles: 'se',
  },
  alwaysShowResizeHandle: isMobile,
};

// 回收站handler注册（gridStack对于removeable的注册是全局的，这里我们需要手动进行管理，没有removeable匹配不上grid不做删除）
const setupRemoveDropArea = (options: GridStackOptions) => {
  const { removable, removableOptions } = options;
  if (removable && typeof removable === 'string') {
    const gridStackDD = GridStack.getDD();
    const trashEl = Utils.getElement(removable);
    gridStackDD
      .droppable(trashEl, {
        ...removableOptions,
        accept: (el: GridItemHTMLElement) => {
          // match 对应的grid下的widget
          return el.gridstackNode?.grid?.opts.removable === removable;
        },
      })
      .on(trashEl, 'dropover', (event, el) => {
        const node = el ? el.gridstackNode : undefined;
        if (!node || !node.grid) {return;}
        (node as any)._isAboutToRemove = true;
        el.classList.add('grid-stack-item-removing');
      })
      .on(trashEl, 'dropout', (event, el) => {
        const node = el ? el.gridstackNode : undefined;
        if (!node || !node.grid) {return;}
        delete (node as any)._isAboutToRemove;
        el.classList.remove('grid-stack-item-removing');
      });
  }
};

const propsChangeHandle = (props: DashboardProps, gridStack: Ref<GridStack>) => {
  watch(
    () => props.static,
    () => {
      gridStack.value.setStatic(props.static);
    }
  );
  watch(
    () => props.float,
    () => {
      gridStack.value.float(props.float);
    }
  );
  watch(
    () => props.animate,
    () => {
      gridStack.value.setAnimation(props.animate);
    }
  );
  watch(
    () => props.disableDrag,
    () => {
      gridStack.value.enableMove(!props.disableDrag);
    }
  );
  watch(
    () => props.disableResize,
    () => {
      gridStack.value.enableResize(!props.disableResize);
    }
  );
  watch(
    () => props.column,
    () => {
      gridStack.value.column(props.column);
    }
  );
  watch(
    () => props.minRow,
    () => {
      gridStack.value.opts.minRow = props.minRow;
    }
  );
  watch(
    () => props.maxRow,
    () => {
      gridStack.value.engine.maxRow = props.maxRow;
    }
  );
  watch(
    () => props.margin,
    () => {
      gridStack.value.margin(props.margin);
    }
  );
  watch(
    () => props.cellHeight,
    () => {
      gridStack.value.cellHeight(props.cellHeight);
    }
  );
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
      removable: props.trashSelector || false
    },
    props.advancedOptions
  );
  const gridStack = ref<GridStack>();

  onMounted(() => {
    gridStack.value = GridStack.init(gridStackOptions, uniqueName);

    if (gridStack.value) {
      setupRemoveDropArea(gridStackOptions);

      // Props变更处理(PS:这里居然无法自动缩紧类型，只好断言一下了)
      propsChangeHandle(props, gridStack as Ref<GridStack>);
    }
  });

  return {
    gridStack,
  };
}
