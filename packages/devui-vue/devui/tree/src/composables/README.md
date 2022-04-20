# useTree

Tree 组件最核心的部分，是 UI 无关的，用于树形结构的处理。

- 获取 / 设置整棵树
- 获取子节点
- 搜索节点
- 插入 / 移除 / 编辑节点
- 点击选择 / 勾选 / 展开收起节点
- 点击选择 / 勾选 / 展开收起节点功能的禁用

## 快速开始

```ts
const data = [
  {
    label: 'Parent node 1',
    children: [
      { label: 'Leaf node 1-1' }
    ]
  },
  { label: 'Leaf node 2' }
];

const { getExpendedTree } = useTree(data, [useSelect(), useCheck()]);
```

## API

`useTree`支持插件化，每个功能都是一个插件，内置`useCore`/`useToggle`两个插件，其他插件可以手动引入，未引入的插件代码不会执行，也不会包含在构建产物里。

插件：
- useCore 核心插件（内置）
- useToggle 展开收起（内置）
- useSelect 点击选择
- useCheck 勾选
- useDisable 禁用
- useOperate 节点操作

### useCore

| 名称 | 描述 |
| -- | -- |
| setTree(tree: ITreeNode[]) => void | 设置整棵树 |
| getLevel(node: ITreeNode) => number | 获取节点层级 |
| getChildren(node: ITreeNode) => ITreeNode[] | 获取子节点 |
| getExpendedTree() => ComputedRef<IInnerTreeNode[]> | 获取展开的树 |
| getIndex(node: ITreeNode) => number | 获取节点的 index |
| getNode(node: ITreeNode) => IInnerTreeNode | 获取节点数据 |
| setNodeValue(node: IInnerTreeNode, key: keyof IInnerTreeNode, value: valueof<IInnerTreeNode>) => void | 设置节点属性 |

### useSelect

| 名称 | 描述 |
| -- | -- |
| selectNode(node: ITreeNode) => void | 点击选择 |

### useCheck

| 名称 | 描述 |
| -- | -- |
| checkNode(node: ITreeNode) => void | 勾选 |
| uncheckNode(node: ITreeNode) => void | 取消勾选 |
| toggleCheckNode(node: ITreeNode) => void | 取消勾选状态 |

### useToggle

| 名称 | 描述 |
| -- | -- |
| expandNode(node: ITreeNode) => void | 展开 |
| collapseNode(node: ITreeNode) => void | 收起 |
| toggleNode(node: ITreeNode) => void | 切换展开/收起状态 |

### useDisable

| 名称 | 描述 |
| -- | -- |
| disableSelectNode(node: ITreeNode) => void | 禁用点击选择 |
| disableCheckNode(node: ITreeNode) => void | 禁用勾选 |
| disableToggleNode(node: ITreeNode) => void | 禁用展开/收起 |
| enableSelectNode(node: ITreeNode) => void | 取消禁用点击选择 |
| enableCheckNode(node: ITreeNode) => void | 取消禁用勾选 |
| enableToggleNode(node: ITreeNode) => void | 取消禁用展开/收起 |

### useOperate

| insertBefore(parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode, cut: boolean = false) => void | 插入节点 |
| removeNode(node: ITreeNode) => void | 移除节点 |
| editNode(node: ITreeNode, label: string) => void | 编辑节点内容 |

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
