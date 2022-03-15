import type { ExtractPropTypes, PropType } from 'vue';
import { DEFAULT_AXIS_CONFIGS, DEFAULT_VIEW_CONFIGS } from '../config';
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
    default: DEFAULT_VIEW_CONFIGS,
  },
} as const;

export type QuadrantDiagramProps = ExtractPropTypes<typeof quadrantDiagramProps>;
