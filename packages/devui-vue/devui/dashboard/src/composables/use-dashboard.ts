import { GridStackOptions, GridStack, Utils, GridItemHTMLElement, GridStackNode } from 'gridstack';
import { onMounted, ref, watch, Ref } from 'vue';
import { DashboardEmitEvent, DashboardProps } from '../dashboard-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { isMobile, isUndefined } from '../../../shared/utils';
import useAttrsObserver from './use-attrs-observer';

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

const ATTRS_PROPS_MAP = new Map<string, { prop: keyof DashboardProps; type: 'string' | 'number' | 'boolean' }>([
  ['gs-column', { prop: 'column', type: 'number' }],
  ['gs-min-row', { prop: 'minRow', type: 'number' }],
  ['gs-max-row', { prop: 'maxRow', type: 'number' }],
  ['gs-static', { prop: 'static', type: 'boolean' }],
  ['gs-animate', { prop: 'animate', type: 'boolean' }],
]);

const gridStackDD = GridStack.getDD();

// 回收站handler注册（gridStack对于removeable的注册是全局的【共享垃圾桶】，这里我们手动进行管理，将共享改为独享）
// PS:这里没有将回收站也做成指令，是因为设计上想要将 [回收站 - 仪表盘] 做一个对应的映射，即可以控制某个回收站，专属于某个仪表盘（也就是trashSelector这个prop的意义）。
//    在这种设计下，我们的回收站注册就必须要能够接收到对应仪表盘的参数，而且最好能够做到方便，以免参数控制上造成混乱。
//    指令的话有点难做到上面这一点，如果是将 trashSelector 作为指令值，则可能需要维护两份一样的数据，增加心智负担，而如果是像直接连接把dashboardRef传入的话，又没办法简单得到dashboardRef的inited时间来初始化垃圾桶。
//    所以，这里直接将回收站作为一个prop传递，在dashboard内部来注册回收站。
const setupRemoveDropArea = (options: GridStackOptions) => {
  const { removable, removableOptions } = options;
  if (removable && typeof removable === 'string') {
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
        if (!node || !node.grid) {
          return;
        }
        (node as any)._isAboutToRemove = true;
        el.classList.add('grid-stack-item-removing');
      })
      .on(trashEl, 'dropout', (event, el) => {
        const node = el ? el.gridstackNode : undefined;
        if (!node || !node.grid) {
          return;
        }
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

const setupEventHandle = (gridStack: Ref<GridStack>, emit: DashboardEmitEvent) => {
  gridStack.value.on('added', (e: Event, items: GridStackNode[]) => emit('widgetAdded', gridStack, e, items));
  gridStack.value.on('change', (e: Event, items: GridStackNode[]) => emit('widgetChanged', gridStack, e, items));
  gridStack.value.on('removed', (e: Event, items: GridStackNode[]) => emit('widgetRemoved', gridStack, e, items));
};

export default function useDashboard(props: DashboardProps, uniqueName: string, emit: DashboardEmitEvent) {
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
      acceptWidgets: isUndefined(props.acceptWidgets) ? `.${acceptWidgetClass}` : props.acceptWidgets,
    },
    props.advancedOptions
  );
  const gridStack = ref<GridStack>();

  onMounted(() => {
    gridStack.value = GridStack.init(gridStackOptions, uniqueName);

    if (gridStack.value) {
      emit('dashboardInit', gridStack.value);

      const { observerAttributesChange } = useAttrsObserver<keyof DashboardProps, Parameters<DashboardEmitEvent>[0]>(ATTRS_PROPS_MAP, emit);

      observerAttributesChange(gridStack.value.el);

      setupRemoveDropArea(gridStackOptions);

      // Props变更处理(PS:这里居然无法自动缩紧类型，只好断言一下了)
      propsChangeHandle(props, gridStack as Ref<GridStack>);

      setupEventHandle(gridStack as Ref<GridStack>, emit);
    }
  });

  return {
    gridStack,
  };
}
