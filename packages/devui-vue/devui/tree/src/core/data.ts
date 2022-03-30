import { ITree } from "./tree-factory-types";

export const treeData: ITree = [
  {
    label: 'Parent node 1',
    expanded: true,
    children: [
      {
        label: 'Parent node 1-1',
        children: [
          {
            label: 'Leaf node 1-1-1',
          }
        ]
      },
      {
        label: 'Leaf node 1-2',
      },
      {
        label: 'Leaf node 1-3',
      },
    ]
  },
  {
    label: 'Leaf node 2',
  }
];

export const treeDataId: ITree = [
  {
    label: 'Parent node 1',
    id: 'node-1',
    expanded: true,
    children: [
      {
        label: 'Parent node 1-1',
        id: 'node-1-1',
        children: [
          {
            label: 'Leaf node 1-1-1',
            id: 'node-1-1-1',
          }
        ]
      },
      {
        label: 'Leaf node 1-2',
        id: 'node-1-2',
      },
      {
        label: 'Leaf node 1-3',
        id: 'node-1-3',
      },
    ]
  },
  {
    label: 'Leaf node 2',
    id: 'node-2',
  },
  {
    label: 'Leaf node 3',
  }
];
