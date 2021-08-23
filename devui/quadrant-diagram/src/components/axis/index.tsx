import { defineComponent, toRefs, onMounted, ExtractPropTypes, reactive, ref } from 'vue'
import { IViewConfigs, IAxisConfigs } from '../../../type';
import { AXIS_TITLE_SPACE } from '../../../config';
import { quadrantDiagramAxisProps } from './types'
import { debounce } from 'lodash';

import './index.scss'

const Axis = defineComponent({
  name: 'DQuadrantDiagramAxis',
  props: quadrantDiagramAxisProps,
  setup(props: ExtractPropTypes<typeof quadrantDiagramAxisProps>) {

    const { diagramId, view, axisConfigs } = toRefs(props);
    const AXIS_COLOR = ref('#0000ff');
    const AXIS_LABEL_COLOR = ref('#ff0000');

    const quadrantAxis = ref();
    const context = ref();
    const axisInnerAttr = reactive({
      axisOrigin: {
        x: 0,
        y: 0,
      },
      axisTop: 0,
      axisRight: 0,
      axisWidth: 0,
      axisHeight: 0,
      yAxisTicksNum: 0,
      xAxisTicksNum: 0,
      xTickSpacing: 0,
      yTickSpacing: 0,
    })

    const axisConfigsVal: IAxisConfigs = axisConfigs.value;
    const viewVal: IViewConfigs = view.value;
    let contextVal: any = context.value;


    onMounted(() => {
      resetAxis();
    });

    const resetAxis = debounce(() => {
      initAxisData();
      setAxisData();
      drawAxis();
      drawAxisLabels();
    }, 200);

    /**
     * 获取 canvas 并赋值宽高
     */
    const initAxisData = () => {
      quadrantAxis.value = document.querySelector('#devui-quadrant-axis-' + diagramId.value);
      quadrantAxis.value.width = viewVal.width;
      quadrantAxis.value.height = viewVal.height;
    }

    const setAxisData = () => {
      contextVal = quadrantAxis.value.getContext('2d');
      axisInnerAttr.axisOrigin = axisConfigsVal.axisOrigin;
      axisInnerAttr.axisTop = axisConfigsVal.axisTop;
      axisInnerAttr.axisRight = axisConfigsVal.axisRight;
      axisInnerAttr.axisWidth = axisConfigsVal.axisWidth;
      axisInnerAttr.axisHeight = axisConfigsVal.axisHeight;
      axisInnerAttr.yAxisTicksNum = axisConfigsVal.yAxisTicksNum;
      axisInnerAttr.xAxisTicksNum = axisConfigsVal.xAxisTicksNum;
      axisInnerAttr.xTickSpacing = axisConfigsVal.xTickSpacing;
      axisInnerAttr.yTickSpacing = axisConfigsVal.yTickSpacing;
    }

    /** 
     * 执行绘制 
     */
    const drawAxis = () => {
      contextVal.save();
      contextVal.fillStyle = AXIS_COLOR.value;
      contextVal.strokeStyle = AXIS_COLOR.value;
      drawXAxis();
      drawYAxis();
      contextVal.lineWidth = 0.5;
      drawXAxisTicks();
      drawYAxisTicks();
      contextVal.restore();
    }

    /**
     * 绘制 XY 轴
     */
    const drawYAxis = () => {
      contextVal.beginPath();
      contextVal.moveTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisOrigin.y);
      contextVal.lineTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisTop - axisConfigsVal.axisMargin);
      contextVal.stroke();
      contextVal.moveTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisTop - axisConfigsVal.axisMargin);
      contextVal.lineTo(axisInnerAttr.axisOrigin.x + 5, axisInnerAttr.axisTop - axisConfigsVal.axisMargin + 10);
      contextVal.lineTo(axisInnerAttr.axisOrigin.x - 5, axisInnerAttr.axisTop - axisConfigsVal.axisMargin + 10);
      contextVal.fill();

    }
    const drawXAxis = () => {
      contextVal.beginPath();
      contextVal.moveTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisOrigin.y);
      contextVal.lineTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin - 10, axisInnerAttr.axisOrigin.y);
      contextVal.stroke();
      // 绘制坐标轴三角形
      contextVal.moveTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin, axisInnerAttr.axisOrigin.y);
      contextVal.lineTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin - 10, axisInnerAttr.axisOrigin.y + 5);
      contextVal.lineTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin - 10, axisInnerAttr.axisOrigin.y - 5);
      contextVal.fill();
    }

    /**
     * 绘制轴线刻度
     */
    const drawXAxisTicks = () => {
      let deltaY;
      for (let i = 1; i < axisInnerAttr.xAxisTicksNum; i++) {
        contextVal.beginPath();
        // 判断显示长刻度还是短刻度
        if (i % axisConfigsVal.xAxisRange.step === 0) {
          deltaY = axisConfigsVal.tickWidth;
        } else {
          deltaY = axisConfigsVal.tickWidth / 2;
        }
        contextVal.moveTo(axisInnerAttr.axisOrigin.x + i * axisInnerAttr.xTickSpacing,
          axisInnerAttr.axisOrigin.y - deltaY);
        contextVal.lineTo(axisInnerAttr.axisOrigin.x + i * axisInnerAttr.xTickSpacing,
          axisInnerAttr.axisOrigin.y + deltaY);
        contextVal.stroke();
      }

    }
    const drawYAxisTicks = () => {
      let deltaX;
      for (let i = 1; i < axisInnerAttr.yAxisTicksNum; i++) {
        contextVal.beginPath();
        if (i % axisConfigsVal.yAxisRange.step === 0) {
          deltaX = axisConfigsVal.tickWidth;
        } else {
          deltaX = axisConfigsVal.tickWidth / 2;
        }
        contextVal.moveTo(axisInnerAttr.axisOrigin.x - deltaX,
          axisInnerAttr.axisOrigin.y - i * axisInnerAttr.yTickSpacing);
        contextVal.lineTo(axisInnerAttr.axisOrigin.x + deltaX,
          axisInnerAttr.axisOrigin.y - i * axisInnerAttr.yTickSpacing);
        contextVal.stroke();
      }
    }

    const drawAxisLabels = () => {
      contextVal.save();
      contextVal.fillStyle = AXIS_LABEL_COLOR.value;
      drawXTicksLabels();
      drawYTicksLabels();
      contextVal.restore();
      drawAxisTitle();
    }

    const drawXTicksLabels = () => {
      contextVal.textAlign = 'center';
      contextVal.textBaseline = 'top';
      for (let i = 0; i <= axisInnerAttr.xAxisTicksNum; i++) {
        if (i % axisConfigsVal.xAxisRange.step === 0) {
          contextVal.fillText(i, axisInnerAttr.axisOrigin.x + i * axisInnerAttr.xTickSpacing,
            axisInnerAttr.axisOrigin.y + axisConfigsVal.spaceBetweenLabelsAxis);
        }
      }
    };
    const drawYTicksLabels = () => {
      contextVal.textAlign = 'center';
      contextVal.textBaseline = 'middle';
      for (let i = 0; i <= axisInnerAttr.yAxisTicksNum; i++) {
        if (i % axisConfigsVal.yAxisRange.step === 0) {
          contextVal.fillText(i, axisInnerAttr.axisOrigin.x - axisConfigsVal.spaceBetweenLabelsAxis,
            axisInnerAttr.axisOrigin.y - i * axisInnerAttr.yTickSpacing);
        }
      }
    };
    const drawAxisTitle = () => {
      contextVal.font = '12px Microsoft YaHei';
      contextVal.textAlign = 'left';
      contextVal.fillStyle = AXIS_LABEL_COLOR.value;
      const xLabelWidth = contextVal.measureText(axisConfigsVal.xAxisLabel).width;
      rotateLabel(axisConfigsVal.xAxisLabel, axisInnerAttr.axisRight + axisConfigsVal.axisMargin / 2,
        axisInnerAttr.axisOrigin.y - xLabelWidth - AXIS_TITLE_SPACE);
      contextVal.fillText(axisConfigsVal.yAxisLabel,
        axisInnerAttr.axisOrigin.x + AXIS_TITLE_SPACE, axisInnerAttr.axisTop - axisConfigsVal.axisMargin / 2);
    };

    const rotateLabel = (name: string, x: number, y: number) => {
      for (let i = 0; i < name.length; i++) {
        const str = name.slice(i, i + 1).toString();
        if (str.match(/[A-Za-z0-9]/)) {
          contextVal.save();
          contextVal.translate(x, y);
          contextVal.rotate(Math.PI / 180 * 90);
          contextVal.textBaseline = 'bottom';
          contextVal.fillText(str, 0, 0);
          contextVal.restore();
          y += contextVal.measureText(str).width;
        } else if (str.match(/[\u4E00-\u9FA5]/)) {
          contextVal.save();
          contextVal.textBaseline = 'top';
          contextVal.fillText(str, x, y);
          contextVal.restore();
          y += contextVal.measureText(str).width;
        }
      }
    }


  },
  render() {
    const { diagramId } = this;
    return (
      <div>
        <canvas id={'devui-quadrant-axis-' + diagramId}></canvas>
      </div>
    );
  }
})

export default Axis;