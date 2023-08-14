import type { ComputedRef, Directive, Ref } from 'vue';
import { DefaultRow } from '../../table-types';
import { Column } from '../column/column-types';

export interface CellClickArg {
  columnIndex: number;
  rowIndex: number;
  column: Column;
  row: DefaultRow;
}

export interface RowClickArg {
  row: DefaultRow;
}

export interface UseMergeCell {
  tableSpans: ComputedRef<Record<string, [number, number]>>;
  removeCells: ComputedRef<string[]>;
}

export interface UseBodyRender {
  getTableRowClass: (row: DefaultRow) => Record<string, unknown>;
}

export interface UseLazyLoad {
  lazy: boolean;
  lazyFlagRef: Ref;
}

export interface UseVirtualScroll {
  partRows: ComputedRef<DefaultRow[]> | Ref<DefaultRow[]>;
  scrollOffset: Ref<number>;
  vTrReady?: Directive;
}
