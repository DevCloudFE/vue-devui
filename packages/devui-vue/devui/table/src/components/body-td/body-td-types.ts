import type { ExtractPropTypes, PropType, VNode, RendererNode, RendererElement, Ref } from 'vue';
import { Column } from '../column/column-types';

export const bodyTdProps = {
  column: {
    type: Object as PropType<Column>,
    default: () => ({}),
  },
  row: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
};

export type BodyTdProps = ExtractPropTypes<typeof bodyTdProps>;

export interface UseBodyTd {
  isShowTooltip: Ref<boolean>;
  tooltipContent: Ref<string>;
  tdRef: Ref<HTMLElement | undefined>;
}
