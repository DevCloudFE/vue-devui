import type { ComputedRef, ExtractPropTypes, PropType, Ref, TdHTMLAttributes } from 'vue';
import { Column } from '../column/column-types';

export const bodyTdProps = {
  column: {
    type: Object as PropType<Column>,
    default: (): unknown => ({}),
  },
  row: {
    type: Object as PropType<Record<string, unknown>>,
    default: (): Record<string, unknown> => ({}),
  },
  rowspan: {
    type: Number,
  },
  colspan: {
    type: Number,
  },
  index: {
    type: Number,
    default: 0,
  },
};

export type BodyTdProps = ExtractPropTypes<typeof bodyTdProps> & TdHTMLAttributes;

export interface UseBodyTd {
  isShowTooltip: Ref<boolean>;
  tooltipContent: Ref<string>;
  tdRef: Ref<HTMLElement | undefined>;
  cellMode: ComputedRef<string>;
  onCellClick: () => void;
}
