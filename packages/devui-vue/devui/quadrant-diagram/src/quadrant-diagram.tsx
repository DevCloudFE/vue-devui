import { defineComponent, toRefs, reactive, watch } from 'vue';
import type { ExtractPropTypes } from 'vue';
import { quadrantDiagramProps, QuadrantDiagramProps } from './quadrant-diagram-types';
import type { ICalAxisConfig } from '../type';
import DQuadrantDiagramAxis from './components/axis';
import { DEFAULT_AXIS_CONFIGS } from '../config';

type IDefaultAxisConfigs = ExtractPropTypes<typeof DEFAULT_AXIS_CONFIGS>;
export default defineComponent({
  name: 'DQuadrantDiagram',
  props: quadrantDiagramProps,
  setup(props: QuadrantDiagramProps) {
    const { diagramId, axisConfigs, view } = toRefs(props);

    const calAxisConfig = reactive<Partial<ICalAxisConfig & IDefaultAxisConfigs>>({
      axisOrigin: { x: null, y: null },
      axisTop: null,
      axisRight: null,
      axisWidth: null,
      axisHeight: null,
      yAxisTicksNum: null,
      xAxisTicksNum: null,
      xTickSpacing: null,
      yTickSpacing: null,
    });

    const initAxisData = () => {
      const axisConfigKeys = Object.keys(DEFAULT_AXIS_CONFIGS) as (keyof IDefaultAxisConfigs)[];
      for (let i = 0; i < axisConfigKeys.length; i++) {
        const curKey = axisConfigKeys[i];
        if (calAxisConfig[curKey] === undefined) {
          calAxisConfig[curKey] = DEFAULT_AXIS_CONFIGS[curKey] as never;
        }
      }
      calAxisConfig.axisOrigin = {
        x: axisConfigs.value.originPosition?.left,
        y: view.value.height - (axisConfigs.value?.originPosition?.bottom || 0)
      };
      calAxisConfig.axisTop = axisConfigs.value.axisMargin;
      calAxisConfig.axisRight = view.value.width - (axisConfigs.value.axisMargin || 0);
      calAxisConfig.axisWidth = calAxisConfig.axisRight - (calAxisConfig.axisOrigin.x || 0);
      calAxisConfig.axisHeight = (calAxisConfig.axisOrigin.y || 0) - (calAxisConfig.axisTop || 0);
      calAxisConfig.yAxisTicksNum = (axisConfigs.value.yAxisRange?.max || 0) - (axisConfigs.value.yAxisRange?.min || 0);
      calAxisConfig.xAxisTicksNum = (axisConfigs.value.xAxisRange?.max || 0) - (axisConfigs.value.xAxisRange?.min || 0);
      calAxisConfig.xTickSpacing = calAxisConfig.axisWidth / calAxisConfig.xAxisTicksNum;
      calAxisConfig.yTickSpacing = calAxisConfig.axisHeight / calAxisConfig.yAxisTicksNum;
    };

    initAxisData();

    watch(view.value, () => {
      initAxisData();
    });

    return { diagramId, calAxisConfig, };
  },
  render() {
    const { diagramId, calAxisConfig, view } = this;

    return (
      <div class="devui-quadrant-diagram" id={diagramId}>
        <DQuadrantDiagramAxis diagramId={diagramId} axisConfigs={calAxisConfig} view={view} />
      </div>
    );
  }
});
