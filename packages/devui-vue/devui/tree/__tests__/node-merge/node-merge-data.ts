import type { TreeData } from '../../';

export const nodeMergeData: TreeData = [
  {
    label: 'Parent node 1',
    children: [
      {
        label: 'Parent node 1-1',
        open: true,
        children: [
          {
            label: 'Leaf node 1-1-1',
          }
        ]
      },
    ]
  }
];
