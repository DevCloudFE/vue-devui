import type { IInnerTreeNode, ITreeNode } from './tree-factory-types';
import { flatToNested, generateInnerTree } from './utils';

export default class TreeFactory {
  private _innerTree: IInnerTreeNode[] = [];

  private _getIndex(node: ITreeNode): number {
    return this._innerTree.findIndex((item) => item.id === node.id);
  }

  private _setNodeValue(node, key, value): void {
    this._innerTree[this._getIndex(node)][key] = value;
  }

  constructor(tree: ITreeNode[]) {
    this.setTree(tree);
  }

  getTree(flat?: boolean = true): IInnerTreeNode[] {
    if (flat) {
      return this._innerTree;
    } else {
      // TODO: 移除内部属性(level / parentId / idType) / 内部生成的id / 空children
      return flatToNested(this._innerTree);
    }
  }

  setTree(tree: ITreeNode[]) {
    this._innerTree = generateInnerTree(tree);
  }

  getLevel(node: ITreeNode): number {
    return this._innerTree.find((item) => item.id === node.id).level;
  }

  getChildren(node: ITreeNode): IInnerTreeNode[] {
    let result = [];
    const startIndex = this._innerTree.findIndex((item) => item.id === node.id);

    for (let i = startIndex + 1; i < this._innerTree.length && this.getLevel(node) < this._innerTree[i].level; i++) {
      result.push(this._innerTree[i]);
    }
    return result;
  }

  selectNode(node: ITreeNode): void {
    this._setNodeValue(node, 'selected', true);
  }

  checkNode(node: ITreeNode): void {
    this._setNodeValue(node, 'checked', true);
  }

  uncheckNode(node: ITreeNode): void {
    this._setNodeValue(node, 'checked', false);
  }

  expandNode(node: ITreeNode): void {
    this._setNodeValue(node, 'expanded', true);
  }

  collapseNode(node: ITreeNode): void {
    this._setNodeValue(node, 'expanded', false);
  }

  toggleNode(node: ITreeNode): void {
    if (node.expanded) {
      this._setNodeValue(node, 'expanded', false);
    } else {
      this._setNodeValue(node, 'expanded', true);
    }
  }

  disableSelectNode(node: ITreeNode): void {
    this._setNodeValue(node, 'disableSelect', true);
  }

  disableCheckNode(node: ITreeNode): void {
    this._setNodeValue(node, 'disableCheck', true);
  }

  disableToggleNode(node: ITreeNode): void {
    this._setNodeValue(node, 'disableToggle', true);
  }

  insertBefore(parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode, cut: boolean = false): void {
    // TODO
  }

  removeNode(node: ITreeNode): void {
    this._innerTree = this._innerTree.filter(item => {
      return item.id !== node.id && !this.getChildren(node).map(nodeItem => nodeItem.id).includes(item.id);
    })
  }

  editNode(node: ITreeNode, label: string): void {
    this._setNodeValue(node, 'label', label);
  }
}
