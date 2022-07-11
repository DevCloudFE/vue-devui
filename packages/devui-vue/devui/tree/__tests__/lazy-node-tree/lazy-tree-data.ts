import type { TreeData } from '../..';

export const lazyTreeData: TreeData = [
  {
    label: 'Parent node 1',
    children: [
      {
        label: 'Parent node 1-1',
        children: [
          {
            label: 'Parent node 1-1 - dynamic loading',
            isLeaf: false,
          },
        ],
      },
      { label: 'Leaf node 1-2' },
    ],
  },
  { label: 'Leaf node 2 - dynamic loading', isLeaf: false },
];

export const LoadingTreeData: TreeData = [
  {
    label: 'child node 1',
    expanded: true,
    children: [
      {
        label: 'child node 1-1',
      },
      {
        label: 'child node 1-2',
      },
    ],
  },
  { label: 'child node 2' },
];
