import type { ExtractPropTypes, PropType } from 'vue'
import { DEFAULT_AXIS_CONFIGS } from '../config';
import { IViewConfigs, IAxisConfigs } from '../type';

export const quadrantDiagramProps = {
  diagramId: {
    type: String,
    default: '1',
  },
  axisConfigs: {
    type: Object as PropType<IAxisConfigs>,
    default: DEFAULT_AXIS_CONFIGS,
  },
  view: {
    type: Object as PropType<IViewConfigs>,
    default: { height: 720, width: 720 },
  },
} as const

export type QuadrantDiagramProps = ExtractPropTypes<typeof quadrantDiagramProps>
