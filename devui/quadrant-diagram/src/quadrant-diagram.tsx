import { defineComponent, toRefs, reactive, watch } from 'vue'
import { quadrantDiagramProps, QuadrantDiagramProps } from './quadrant-diagram-types'
import DQuadrantDiagramAxis from './components/axis'
import { DEFAULT_AXIS_CONFIGS } from '../config'

export default defineComponent({
  name: 'DQuadrantDiagram',
  props: quadrantDiagramProps,
  emits: [],
  setup(props: QuadrantDiagramProps) {
    const { diagramId, axisConfigs, view } = toRefs(props)

    const axisConfigsVal = axisConfigs.value
    const viewVal = view.value

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
    })

    const initAxisData = () => {
      const axisConfigKeys = Object.keys(DEFAULT_AXIS_CONFIGS)
      for (let i = 0; i < axisConfigKeys.length; i++) {
        if (calAxisConfig[axisConfigKeys[i]] === undefined) {
          calAxisConfig[axisConfigKeys[i]] = DEFAULT_AXIS_CONFIGS[axisConfigKeys[i]]
        }
      }
      calAxisConfig.axisOrigin = {
        x: axisConfigsVal.originPosition.left,
        y: viewVal.height - axisConfigsVal.originPosition.bottom
      }
      calAxisConfig.axisTop = axisConfigsVal.axisMargin
      calAxisConfig.axisRight = viewVal.width - axisConfigsVal.axisMargin
      calAxisConfig.axisWidth = calAxisConfig.axisRight - calAxisConfig.axisOrigin.x
      calAxisConfig.axisHeight = calAxisConfig.axisOrigin.y - calAxisConfig.axisTop
      calAxisConfig.yAxisTicksNum = axisConfigsVal.yAxisRange.max - axisConfigsVal.yAxisRange.min
      calAxisConfig.xAxisTicksNum = axisConfigsVal.xAxisRange.max - axisConfigsVal.xAxisRange.min
      calAxisConfig.xTickSpacing = calAxisConfig.axisWidth / calAxisConfig.xAxisTicksNum
      calAxisConfig.yTickSpacing = calAxisConfig.axisHeight / calAxisConfig.yAxisTicksNum
    }

    initAxisData()

    watch(viewVal, () => {
      initAxisData()
    })

    return { diagramId, calAxisConfig, }
  },
  render() {
    const { diagramId, calAxisConfig, view } = this

    return (
      <div class="devui-quadrant-diagram" id={diagramId}>
        <DQuadrantDiagramAxis diagramId={diagramId} axisConfigs={calAxisConfig} view={view} />
      </div>
    )
  }
})
