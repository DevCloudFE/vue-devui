import type { PropType, ExtractPropTypes } from 'vue';

type TableData = Array<{
  [key: string]: any;
}>;

export const tableProps = {
  data: {
    type: Array as PropType<TableData>,
    required: true,
  }
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;
