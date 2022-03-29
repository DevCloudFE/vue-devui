import type { TreeData } from '../..';

export const basicTreeData: TreeData = [
  {
    label: 'Parent node 1',
    open: true,
    disabled: true,
    children: [
      {
        label: 'Parent node 1-1',
        disableToggle: true,
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
