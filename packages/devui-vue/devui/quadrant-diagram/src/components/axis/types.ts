import type { ExtractPropTypes, PropType } from 'vue';
import { IViewConfigs, IAxisConfigs } from '../../../type';

export const quadrantDiagramAxisProps = {
  diagramId: {
    type: String,
  },
  axisConfigs: {
    type: Object as PropType<IAxisConfigs>,
  },
  view: {
    type: Object as PropType<IViewConfigs>,
  },
} as const;

export type QuadrantDiagramAxisProps = ExtractPropTypes<typeof quadrantDiagramAxisProps>;
