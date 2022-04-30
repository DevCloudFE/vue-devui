import SplitterPane from './components/splitter-pane';
import { reactive } from 'vue';

export interface Pane {
  getPaneSize: () => number;
}

export interface PaneState {
  index: number;
  initialSize: number;
  minSize: number;
  maxSize: number;
}

export interface DragState {
  prev: PaneState;
  next: PaneState;
}

export type SplitterPane = typeof SplitterPane & Pane;
export interface splitterState {
  panes: Array<SplitterPane>; // 所有 pane 对象的一些关键信息
  paneCount: number;
  splitterContainerSize: number;
}

export class SplitterStore {
  state: splitterState;
  constructor() {
    this.state = reactive({
      panes: [],
      splitterContainerSize: 0,
      paneCount: 0,
    });
  }
  // 配置 pane 信息，panes 列表，方便后续计算使用
  setPanes({ panes }: { panes: SplitterPane[]}): void {
    this.state.panes = panes.map((pane: SplitterPane, index: number) => {
      if (pane.component) {
        pane.component.exposed.order.value = index * 2;
      }
      pane.getPaneSize = pane?.component?.exposed.getPaneSize;
      return pane;
    });
    this.state.paneCount = panes.length;
  }
  setSplitter({ containerSize }: { containerSize: number }): void {
    this.state.splitterContainerSize = containerSize;
  }

  //  获取 pane，防止没有初始化的时候调用内部方法取值
  getPane(index: number): SplitterPane {
    if (!this.state.panes || index < 0 || index >= this.state.panes.length) {
      throw new Error('no pane can return.');
    }
    return this.state.panes[index];
  }

  // 按下的时候计算 pane 的 size 信息
  dragState(splitbarIndex: number): DragState {
    const prev = this.getPane(splitbarIndex);
    const next = this.getPane(splitbarIndex + 1);
    const total = prev.getPaneSize() + next.getPaneSize();
    return {
      prev: {
        index: splitbarIndex,
        initialSize: prev.getPaneSize(),
        // 设置有最小值，直接取值，如果没有设置就用两个 pane 总和减去相邻 pane 的最大值，都没设置（NaN）再取0
        minSize:
          this.toPixels(prev.component.props.minSize) ||
          total - this.toPixels(next.component.props.maxSize) ||
          0,
        // 设置最大值，直接取值，如果没有设置就用两个 pane 总和减去相邻 pane 的最小值，都没设置（NaN）再取两个 pane 总和
        maxSize:
          this.toPixels(prev.component.props.maxSize) ||
          total - this.toPixels(next.component.props.minSize) ||
          total,
      },
      next: {
        index: splitbarIndex + 1,
        initialSize: next.getPaneSize(),
        minSize:
          this.toPixels(next.component.props.minSize) ||
          total - this.toPixels(prev.component.props.maxSize) ||
          0,
        maxSize:
          this.toPixels(next.component.props.maxSize) ||
          total - this.toPixels(prev.component.props.minSize) ||
          total,
      },
    };
  }

  // 大小限制函数，（max）小于最小值时取最小值，（min）大于最大值时取最大值
  clamp(minSize: number, maxSize: number, initialSize: number): number {
    return Math.min(maxSize, Math.max(minSize, initialSize));
  }

  // resize pane的大小
  resize(paneState: PaneState, moveSize: number): void {
    const pane = this.getPane(paneState.index);
    const splitterSize = this.state.splitterContainerSize;
    const newSize = this.clamp(
      paneState.minSize,
      paneState.maxSize,
      paneState.initialSize + moveSize
    );
    let size = '';
    if (this.isPercent(pane.component.props.size)) {
      size = (newSize / splitterSize) * 100 + '%';
    } else {
      size = newSize + 'px';
    }
    pane.component.props.size = size;
    pane.component.emit('sizeChange', size);
  }

  // 判断 pane 是否可以调整大小，只要有一边设置了不可调整或者收起，相邻 pane 调整就失效
  isResizable(splitBarIndex: number): boolean {
    const prevPane = this.getPane(splitBarIndex);
    const nextPane = this.getPane(splitBarIndex + 1);
    const paneCollapsed =
      prevPane?.component?.props?.collapsed ||
      nextPane?.component?.props?.collapsed;
    return (
      prevPane?.component?.props?.resizable &&
      nextPane?.component?.props?.resizable &&
      !paneCollapsed
    );
  }

  // 判断分割条是否是固定的，只要有一边不能调整, 就是禁用状态固定 bar
  isStaticBar(splitBarIndex: number): boolean {
    const prevPane = this.getPane(splitBarIndex);
    const nextPane = this.getPane(splitBarIndex + 1);
    return !(
      prevPane?.component?.props?.resizable &&
      nextPane?.component?.props?.resizable
    );
  }

  // 判断是不是百分比设置宽度
  isPercent(size: string): boolean {
    return /%$/.test(size);
  }

  // 计算时把百分比转换为像素
  toPixels(size: string): number {
    // 值不满足转换时，result 为 NaN，方便计算最小、最大宽度判断
    let result = parseFloat(size);
    if (this.isPercent(size)) {
      result = (this.state.splitterContainerSize * result) / 100;
    }
    return result;
  }

  // 切换 pane 展开，收起
  tooglePane(
    paneIndex: number,
    nearPaneIndex: number,
    lockStatus?: boolean
  ): void {
    const pane = this.getPane(paneIndex);
    const nearPane = this.getPane(nearPaneIndex);
    if (pane?.component?.props?.collapsible) {
      pane.component.props.collapsed = lockStatus
        ? pane?.component?.props?.collapsed
        : !pane?.component?.props?.collapsed;
      nearPane?.component?.exposed?.toggleNearPaneFlexGrow(
        pane?.component?.props?.collapsed
      );
      pane?.component?.emit(
        'collapsedChange',
        pane?.component?.props?.collapsed
      );
    }
  }

  // 设置 pane 大小
  setSize(state: DragState, distance: number): void {
    const prev = this.getPane(state.prev.index);
    const next = this.getPane(state.next.index);
    if (prev.component.props.size && next.component.props.size) {
      // 相邻的两个 pane 都指定了 size，需要同时修改 size
      this.resize(state.prev, distance);
      this.resize(state.next, -distance);
    } else if (next.component.props.size) {
      // 只有 next pane指定了 size，直接修改 next pane
      this.resize(state.next, -distance);
    } else {
      // 最后都没有指定 size，直接修改 pre pane
      this.resize(state.prev, distance);
    }
  }
}
