import type { TreeData } from '../..';

export const basicTreeData: TreeData = [
  {
    label: 'Parent node 1',
    disableSelect: true,
    children: [
      {
        label: 'Parent node 1-1',
        children: [{ label: 'Leaf node 1-1-1' }],
      },
      { label: 'Leaf node 1-2' },
    ],
  },
  { label: 'Leaf node 2' },
];
