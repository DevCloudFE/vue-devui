import { TreeData } from '../../';

export const checkableTreeData: TreeData = [
  {
    label: 'Parent node 1',
    open: true,
    children: [
      {
        label: 'Parent node 1-1',
        open: true,
        disableCheck: true,
        children: [
          {
            label: 'Leaf node 1-1-1'
          }
        ]
      },
      {
        label: 'Parent node 1-2',
        open: true,
        checked: true,
        disableCheck: true,
        children: [
          {
            label: 'Leaf node 1-2-1'
          }
        ]
      },
      {
        label: 'Leaf node 1-3',
      },
      {
        label: 'Leaf node 1-4',
        checked: true,
      },
      {
        label: 'Leaf node 1-5',
        disableCheck: true,
      },
      {
        label: 'Leaf node 1-6',
        checked: true,
        disableCheck: true,
      },
    ]
  },
  {
    label: 'Parent node 2',
    children: [
      {
        label: 'Leaf node 2-1'
      }
    ]
  },
  {
    label: 'Leaf node 3',
  }
];
