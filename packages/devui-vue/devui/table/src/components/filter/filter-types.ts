import type { ExtractPropTypes, PropType, Ref } from 'vue';
import { FilterConfig } from '../column/column-types';

export const filterProps = {
  filterList: {
    type: Array as PropType<FilterConfig[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: true,
  },
};

export interface UseFilterRender {
  showMenu: Ref<boolean>;
  filterMenuRef: Ref<HTMLElement | null>;
  filterIconRef: Ref<HTMLElement | null>;
  iconClasses: Ref<{ [x: string]: boolean }>;
  handleIconClick: () => void;
  handleConfirm: (val: FilterConfig[]) => void;
  handleSelect: (val: FilterConfig) => void;
}

export interface UseFilterMultiple {
  _checkList: Ref<FilterConfig[]>;
  _checkAll: Ref<boolean>;
  _halfChecked: Ref<boolean>;
  handleConfirm: () => void;
}

export interface UseFilterSingle {
  selectedItem: Ref<FilterConfig | null>;
  handleSelect: (val: FilterConfig) => void;
}

export type FilterProps = ExtractPropTypes<typeof filterProps>;
