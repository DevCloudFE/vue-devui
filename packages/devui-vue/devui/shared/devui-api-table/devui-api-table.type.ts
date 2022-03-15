import type { ExtractPropTypes, PropType } from 'vue';

export type ITableColumn = {
  key: string;
  title: string;
  type?: 'turn';
};

export type ITableDataRow = Record<string, any>;

export const apiTableProps = {
  columns: {
    type: Array as PropType<ITableColumn[]>,
    required: true,
    default: () => []
  },
  data: {
    type: Array as PropType<ITableDataRow[]>,
    default: () => []
  }
} as const;

export type ApiTableProps = ExtractPropTypes<typeof apiTableProps>;
