import type { ITreeNode } from '../../';

export const checkableTreeData: ITreeNode[] = [
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

export const disabledCheckableTreeData: ITreeNode[] = [
  {
    label: 'Parent node 1',
    expanded: true,
    children: [
      {
        label: 'Parent node 1-1',
        disableToggle: true,
        disableSelect: true,
        disableCheck: true,
        children: [{ label: 'Leaf node 1-1-1' }],
      },
      {
        label: 'Leaf node 1-2',
        disableCheck: true,
      },
    ],
  },
  {
    label: 'Leaf node 2',
    disableSelect: true,
  },
];
