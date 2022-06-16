import { TreeData } from '../../';

export const checkableTreeData: TreeData = [
  {
    label: 'Parent node 1',
    children: [
      {
        label: 'Parent node 1-1',
        children: [{ label: 'Leaf node 1-1-1' }, { label: 'Leaf node 1-1-2' }],
      },
      { label: 'Leaf node 1-2' },
    ],
  },
  { label: 'Leaf node 2' },
];
