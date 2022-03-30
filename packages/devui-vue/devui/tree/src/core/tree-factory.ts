import { randomId } from '../../../anchor/src/util';
import { omit } from '../util';
import { ITreeFactory } from './tree-factory-interface';
import type { ITree, ITreeNode, IInnerTree, IInnerTreeNode, valueof } from './tree-factory-types';

export default class TreeFactory {
  private _innerTree: IInnerTree = [];

  constructor(tree: ITree) {
    console.log('tree:', tree);
    this._innerTree = traverseTree(tree);
  }

  getTree() {
    return convertInnerTree(this._innerTree);
  }

  setTree(tree: ITree) {
    this._innerTree = traverseTree(tree);
  }

  getNodes(value: valueof<ITreeNode>, key: keyof ITreeNode = 'id', inclusive: boolean = false): ITree {
    return convertInnerTree(this._innerTree.filter(item => item[key].indexOf(value) > -1));
  }

  getChildren(treeNode: ITreeNode): ITree {
    return [];
  }

  selectNode() {}

  checkNode() {}

  expandNode() {}

  collapseNode() {}

  toggleNode() {}

  disableSelectNode() {}

  disableCheckNode() {}

  disableToggleNode() {}

  insertBefore(parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode, cut: boolean = false) {

  }

  removeNode(node: ITreeNode) {}

  editNode(node: ITreeNode) {}
}

function traverseTree(tree: ITree, key = 'children', level: number = 0, path: ITree = []): IInnerTree {
  level++;

  return tree.reduce((acc: ITree, item: ITreeNode) => {
    if (item.id === undefined) {
      item.id = randomId();
      item.idType = 'random';
    }

    item.level = level;

    if (path.length > 0 && path[path.length - 1]?.level >= level) {
      while (path[path.length - 1]?.level >= level) {
        path.pop();
      }
    }

    path.push(item);
    
    const parentNode = path[path.length - 2];
    if (parentNode) {
      item.parentId = parentNode.id;
    }
    
    if (!item[key]) {
      return acc.concat(item);
    } else {
      return acc.concat(omit<ITreeNode>(item, 'children'), traverseTree(item[key], key, level, path));
    }
  }, []);
}

function omit<T>(obj: T, ...keys: Array<keyof T>) {
  return Object.entries(obj)
    .filter(item => !keys.includes(item[0]))
    .reduce((acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }), {});
};

function convertInnerTree(innerTree: IInnerTree) {
  return innerTree.map(item => {
    const omitKeys = ['level', 'parentId', 'idType'];
    if (item.idType === 'random') {
      omitKeys.push('id')
    }
    return omit<IInnerTreeNode>(item, ...omitKeys)
  });
}
