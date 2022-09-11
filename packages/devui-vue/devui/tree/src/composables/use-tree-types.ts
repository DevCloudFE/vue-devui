import type { ComputedRef, Ref } from 'vue';

// 外部数据结构先只考虑嵌套结构
export interface ITreeNode {
  label: string;
  id?: string;
  children?: ITreeNode[];

  selected?: boolean;
  checked?: boolean;
  expanded?: boolean;

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
  isLeaf?: boolean;
}

// 内部数据结构使用扁平结构
export interface IInnerTreeNode extends ITreeNode {
  id: string;
  level: number;
  idType?: 'random';
  parentId?: string;
  isLeaf?: boolean;
  parentChildNodeCount?: number;
  currentIndex?: number;
  loading?: boolean; // 节点是否显示加载中
  childNodeCount?: number; // 该节点的子节点的数量
  isMatched?: boolean; // 搜索过滤时是否匹配该节点
  childrenMatched?: boolean; // 搜索过滤时是否有子节点存在匹配
  isHide?: boolean; // 过滤后是否不显示该节点
  matchedText?: string; // 节点匹配的文字（需要高亮显示）
}

export type valueof<T> = T[keyof T];

export interface IUseCore {
  getLevel: (node: IInnerTreeNode) => number;
  getChildren: (
    node: IInnerTreeNode,
    config?: {
      expanded?: boolean;
      recursive?: boolean;
    }
  ) => IInnerTreeNode[];
  clearNodeMap: () => void;
  getParent: (node: IInnerTreeNode) => IInnerTreeNode;
  getExpendedTree: () => ComputedRef<IInnerTreeNode[]>;
  getIndex: (node: IInnerTreeNode) => number;
  getNode: (node: IInnerTreeNode) => IInnerTreeNode;
  setNodeValue: (node: IInnerTreeNode, key: keyof IInnerTreeNode, value: valueof<IInnerTreeNode>) => void;
  setTree: (newTree: IInnerTreeNode[]) => void;
  getTree: () => IInnerTreeNode[];
}

export interface IUseCheck {
  checkNode: (node: IInnerTreeNode) => void;
  uncheckNode: (node: IInnerTreeNode) => void;
  toggleCheckNode: (node: IInnerTreeNode) => void;
  getCheckedNodes: () => IInnerTreeNode[];
}

export interface IUseDisable {
  disableSelectNode: (node: IInnerTreeNode) => void;
  disableCheckNode: (node: IInnerTreeNode) => void;
  disableToggleNode: (node: IInnerTreeNode) => void;
  enableSelectNode: (node: IInnerTreeNode) => void;
  enableCheckNode: (node: IInnerTreeNode) => void;
  enableToggleNode: (node: IInnerTreeNode) => void;
}

export interface IUseOperate {
  insertBefore: (parentNode: ITreeNode, node: ITreeNode, referenceNode?: ITreeNode) => void;
  removeNode: (node: ITreeNode) => void;
  editNode: (node: ITreeNode, label: string) => void;
}

export interface IUseSelect {
  selectNode: (node: IInnerTreeNode) => void;
  deselectNode: (node: IInnerTreeNode) => void;
  toggleSelectNode: (node: IInnerTreeNode) => void;
  getSelectedNode: () => IInnerTreeNode;
}

export interface IUseToggle {
  expandNode: (node: IInnerTreeNode) => void;
  collapseNode: (node: IInnerTreeNode) => void;
  toggleNode: (node: IInnerTreeNode) => void;
  expandAllNodes: () => void;
}

export interface IUseMergeNodes {
  mergeTreeNodes: () => void;
}

export interface IUseLazyLoad {
  lazyLoadNodes: (node: IInnerTreeNode) => void;
}

export interface IUseInitSelectCollection {
  setInitSelectedNode: (node: IInnerTreeNode) => void;
  getInitSelectedNodes: () => IInnerTreeNode[];
  clearInitSelectedNodes: () => void;
}

export interface SearchFilterOption {
  isFilter: boolean; // 是否是过滤节点
  matchKey?: string; // node节点中匹配搜索过滤的字段名
  pattern?: RegExp; // 搜索过滤时匹配的正则表达式
}

export interface IUseSearchFilter {
  virtualListRef: Ref<HTMLElement | undefined>;
  searchTree: (target: string, option: SearchFilterOption) => void;
}

export interface IDropType {
  dropPrev?: boolean;
  dropNext?: boolean;
  dropInner?: boolean;
}

export type ICheckStrategy = 'upward' | 'downward' | 'both' | 'none';

export type ICheck = boolean | ICheckStrategy;

export type IDragdrop = boolean | IDropType;

export type IOperateItem = 'add' | 'delete' | 'edit';

export type IOperate = boolean | IOperateItem | Array<IOperateItem>;

export interface LazyNodeResult {
  treeItems: ITreeNode[];
  node: IInnerTreeNode;
}

export interface DragState {
  dropType?: keyof Required<IDropType>;
  draggingNode?: HTMLElement | null;
  draggingTreeNode?: IInnerTreeNode | null;
}

export interface IUseDraggable {
  onDragstart: (event: DragEvent, treeNode: IInnerTreeNode) => void;
  onDragover: (event: DragEvent) => void;
  onDragleave: (event: DragEvent) => void;
  onDrop: (event: DragEvent, dropNode: IInnerTreeNode) => void;
  onDragend: (event: DragEvent) => void;
}

export interface IDropNode {
  target: ITreeNode[];
  index: number;
  item: ITreeNode;
}

export type IUseTree = {
  treeData: Ref<IInnerTreeNode[]>;
} & IUseCore &
IUseToggle &
IUseSelect &
IUseCheck &
IUseDisable &
IUseOperate &
IUseMergeNodes &
IUseLazyLoad &
IUseSearchFilter &
IUseDraggable;
