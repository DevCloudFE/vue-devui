import { Ref } from 'vue';

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
}

// 内部数据结构使用扁平结构
export interface IInnerTreeNode extends ITreeNode {
  level: number;
  idType?: 'random';
  parentId?: string;
  isLeaf?: boolean;
}

export type valueof<T> = T[keyof T];

export interface IUseCore {
  getLevel: (node: ITreeNode) => number;
  getChildren: (node: ITreeNode) => IInnerTreeNode[];
  getIndex: (node: ITreeNode) => number;
  getNode: (node: ITreeNode) => IInnerTreeNode;
  setNodeValue: (node: IInnerTreeNode, key: keyof IInnerTreeNode, value: valueof<IInnerTreeNode>) => void;
  setTree: (newTree: ITreeNode[]) => void;
};

export interface IUseCheck {
  checkNode: (node: IInnerTreeNode) => void;
  uncheckNode: (node: IInnerTreeNode) => void;
}

export interface IUseDisable {
  disableSelectNode: (node: IInnerTreeNode) => void;
  disableCheckNode: (node: IInnerTreeNode) => void;
  disableToggleNode: (node: IInnerTreeNode) => void;
}

export interface IUseOperate {
  insertBefore: (parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode, cut: boolean) => void;
  removeNode: (node: ITreeNode) => void;
  editNode: (node: ITreeNode, label: string) => void;
}

export interface IUseSelect {
  selectNode: (node: IInnerTreeNode) => void;
}

export interface IUseToggle {
  expandNode: (node: ITreeNode) => void;
  collapseNode: (node: ITreeNode) => void;
  toggleNode: (node: ITreeNode) => void;
}

export type IUseTree = {
  treeData: Ref<IInnerTreeNode[]>
} & IUseCore & IUseCheck & IUseDisable & IUseOperate & IUseSelect & IUseToggle;
