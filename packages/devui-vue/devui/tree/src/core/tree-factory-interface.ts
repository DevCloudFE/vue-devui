import type { valueof } from './tree-factory-types';

export interface ITreeFactory<T> {
  /**
   * 1. 点选
   * 2. 勾选
   * 3. 展开/收起
   * 4. 插入节点
   * 5. 编辑节点
   * 6. 删除节点
   * 7. 改变节点顺序
   * 8. 禁用
   */

  getTree(): T[];

  setTree(tree: T[]): void;

  getTreeNode(value: valueof<T>, key: keyof T): T[];
};
