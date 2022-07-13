import type { TreeData } from '../..';

export const searchFilterData: TreeData = [
  {
    label: 'parent node 1',
    customSearchValue: 'a',
  },
  {
    label: 'parent node 2',
    customSearchValue: 'b',
    children: [
      {
        label: 'child node 2-1',
        customSearchValue: 'c',
        children: [
          {
            label: 'child node 2-1-1',
            customSearchValue: 'd',
          },
          {
            label: 'child node 2-1-2',
            customSearchValue: 'e',
          },
        ],
      },
      {
        label: 'child node 2-2',
        customSearchValue: 'f',
        children: [
          {
            label: 'child node 2-2-1',
            customSearchValue: 'g',
          },
          {
            label: 'child node 2-2-2',
            customSearchValue: 'h',
          },
        ],
      },
    ],
  },
  {
    label: 'parent node 3',
    customSearchValue: 'i',
    children: [
      {
        label: 'child node 3-1',
        customSearchValue: 'j',
      },
      {
        label: 'child node 3-2',
        customSearchValue: 'k',
      },
    ],
  },
  {
    label: 'parent node 4',
    customSearchValue: 'l',
    children: [
      {
        label: 'child node 4-1',
        customSearchValue: 'm',
      },
      {
        label: 'child node 4-2',
        customSearchValue: 'n',
      },
    ],
  },
  {
    label: 'parent node 5',
    customSearchValue: 'o',
    children: [
      {
        label: 'child node 5-1',
        customSearchValue: 'p',
      },
      {
        label: 'child node 5-2',
        customSearchValue: 'q',
      },
    ],
  },
];
