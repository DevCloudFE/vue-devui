import type { ComputedRef, Ref, ExtractPropTypes, PropType } from 'vue';
import type { FilterConfig, SortDirection, Column } from '../column/column-types';

export interface UseSort {
  direction: Ref<SortDirection>;
  sortClass: ComputedRef<Record<string, boolean>>;
  handleSort: (val: SortDirection) => void;
  clearSortOrder: () => void;
}

export interface UseFilter {
  filterClass: ComputedRef<Record<string, boolean>>;
  handleFilter: (val: FilterConfig | FilterConfig[]) => void;
}

export interface UseBaseRender {
  baseClass: ComputedRef<Record<string, boolean>>;
}

export interface UseDragColumnWidth {
  resizing: Ref<boolean>;
  dragClass: Ref<string>;
  onMousedown: (e: MouseEvent) => void;
}

export const headerThProps = {
  column: {
    type: Object as PropType<Column>,
    required: true,
  },
  colspan: {
    type: Number,
  },
  rowspan: {
    type: Number,
  }
} as const;

export type HeaderThProps = ExtractPropTypes<typeof headerThProps>;
