interface IBaseTreeNode {
  label: string;
  id?: string;

  selected?: boolean;
  checked?: boolean;
  expanded?: boolean;

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
}

interface IFlatTreeNode extends IBaseTreeNode {
  parentId?: string;
}

interface INestedTreeNode extends IBaseTreeNode {
  children?: INestedTreeNode[];
}

// 外部数据结构先只考虑嵌套结构
export type ITreeNode = INestedTreeNode;

type IFlatTree = IFlatTreeNode[];

type INestedTree = INestedTreeNode[];

export type ITree = INestedTree;

// 内部树节点使用扁平结构
export interface IInnerTreeNode extends IFlatTreeNode {
  level: number;
  idType: 'random';
}

export type IInnerTree = IInnerTreeNode[];

export type valueof<T> = T[keyof T];
