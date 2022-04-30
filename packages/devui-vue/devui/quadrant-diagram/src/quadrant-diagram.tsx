import { defineComponent, toRefs, reactive, watch } from 'vue';
import { quadrantDiagramProps, QuadrantDiagramProps } from './quadrant-diagram-types';
import DQuadrantDiagramAxis from './components/axis';
import { DEFAULT_AXIS_CONFIGS } from '../config';

export default defineComponent({
  name: 'DQuadrantDiagram',
  props: quadrantDiagramProps,
  setup(props: QuadrantDiagramProps) {
    const { diagramId, axisConfigs, view } = toRefs(props);

    const calAxisConfig = reactive({
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
      const axisConfigKeys = Object.keys(DEFAULT_AXIS_CONFIGS);
      for (let i = 0; i < axisConfigKeys.length; i++) {
        if (calAxisConfig[axisConfigKeys[i]] === undefined) {
          calAxisConfig[axisConfigKeys[i]] = DEFAULT_AXIS_CONFIGS[axisConfigKeys[i]];
        }
      }
      calAxisConfig.axisOrigin = {
        x: axisConfigs.value.originPosition.left,
        y: view.value.height - axisConfigs.value.originPosition.bottom
      };
      calAxisConfig.axisTop = axisConfigs.value.axisMargin;
      calAxisConfig.axisRight = view.value.width - axisConfigs.value.axisMargin;
      calAxisConfig.axisWidth = calAxisConfig.axisRight - calAxisConfig.axisOrigin.x;
      calAxisConfig.axisHeight = calAxisConfig.axisOrigin.y - calAxisConfig.axisTop;
      calAxisConfig.yAxisTicksNum = axisConfigs.value.yAxisRange.max - axisConfigs.value.yAxisRange.min;
      calAxisConfig.xAxisTicksNum = axisConfigs.value.xAxisRange.max - axisConfigs.value.xAxisRange.min;
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
