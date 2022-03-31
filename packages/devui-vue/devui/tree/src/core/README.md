# Tree Factory

Tree 组件最核心的部分，是 UI 无关的，用于树形结构的处理。

- 获取 / 设置整棵树
- 获取子节点
- 搜索节点
- 插入 / 移除 / 编辑节点
- 点选 / 勾选 / 展开收起节点
- 点选 / 勾选 / 展开收起节点功能的禁用

## 快速开始

```ts
const treeData = [
  {
    label: 'Parent node 1',
    children: [
      { label: 'Leaf node 1-1' }
    ]
  },
  { label: 'Leaf node 2' }
];

const treeFactory = new TreeFactory(treeData);
treeFactory.getTree();
```

## API

| 名称 | 描述 |
| -- | -- |
| getTree() => ITreeNode[] | 获取整棵树 |
| setTree(tree: ITreeNode[]) => void | 设置整棵树 |
| getLevel(node: ITreeNode) => number | 获取节点层级 |
| getChildren(node: ITreeNode): ITreeNode[] | 获取子节点 |
| selectNode(node: ITreeNode): void | 点击选择 |
| checkNode(node: ITreeNode): void | 勾选 |
| uncheckNode(node: ITreeNode): void | 取消勾选 |
| expandNode(node: ITreeNode): void | 展开 |
| collapseNode(node: ITreeNode): void | 收起 |
| toggleNode(node: ITreeNode): void | 切换展开/收起状态 |
| disableSelectNode(node: ITreeNode): void | 禁用点击选择 |
| disableCheckNode(node: ITreeNode): void | 禁用勾选 |
| disableToggleNode(node: ITreeNode): void | 禁用展开/收起 |
| insertBefore(parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode, cut: boolean = false): void | 插入节点 |
| removeNode(node: ITreeNode): void | 移除节点 |
| editNode(node: ITreeNode, label: string): void | 编辑节点内容 |

## ITreeNode

```ts
interface ITreeNode {
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
```
