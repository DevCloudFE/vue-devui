import { defineComponent, toRefs, onMounted, ExtractPropTypes, reactive, ref, watch } from 'vue';
import { IViewConfigs, IAxisConfigs } from '../../../type';
import { AXIS_TITLE_SPACE } from '../../../config';
import { quadrantDiagramAxisProps, QuadrantDiagramAxisProps } from './types';
import { debounce } from 'lodash';

import './index.scss';

export default defineComponent({
  name: 'DQuadrantDiagramAxis',
  props: quadrantDiagramAxisProps,
  setup(props: QuadrantDiagramAxisProps) {

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
    });

    const axisConfigsVal: IAxisConfigs = axisConfigs.value;

    onMounted(() => {
      resetAxis();
    });

    watch(view.value, () => {
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
    };

    const setAxisData = () => {
      context.value = quadrantAxis.value.getContext('2d');
      axisInnerAttr.axisOrigin = axisConfigsVal.axisOrigin;
      axisInnerAttr.axisTop = axisConfigsVal.axisTop;
      axisInnerAttr.axisRight = axisConfigsVal.axisRight;
      axisInnerAttr.axisWidth = axisConfigsVal.axisWidth;
      axisInnerAttr.axisHeight = axisConfigsVal.axisHeight;
      axisInnerAttr.yAxisTicksNum = axisConfigsVal.yAxisTicksNum;
      axisInnerAttr.xAxisTicksNum = axisConfigsVal.xAxisTicksNum;
      axisInnerAttr.xTickSpacing = axisConfigsVal.xTickSpacing;
      axisInnerAttr.yTickSpacing = axisConfigsVal.yTickSpacing;
    };

    /**
     * 执行绘制
     */
    const drawAxis = () => {
      context.value.save();
      context.value.fillStyle = AXIS_COLOR.value;
      context.value.strokeStyle = AXIS_COLOR.value;
      drawXAxis();
      drawYAxis();
      context.value.lineWidth = 0.5;
      drawXAxisTicks();
      drawYAxisTicks();
      context.value.restore();
    };

    /**
     * 绘制 XY 轴
     */
    const drawYAxis = () => {
      context.value.beginPath();
      context.value.moveTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisOrigin.y);
      context.value.lineTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisTop - axisConfigsVal.axisMargin);
      context.value.stroke();
      context.value.moveTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisTop - axisConfigsVal.axisMargin);
      context.value.lineTo(axisInnerAttr.axisOrigin.x + 5, axisInnerAttr.axisTop - axisConfigsVal.axisMargin + 10);
      context.value.lineTo(axisInnerAttr.axisOrigin.x - 5, axisInnerAttr.axisTop - axisConfigsVal.axisMargin + 10);
      context.value.fill();

    };
    const drawXAxis = () => {
      context.value.beginPath();
      context.value.moveTo(axisInnerAttr.axisOrigin.x, axisInnerAttr.axisOrigin.y);
      context.value.lineTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin - 10, axisInnerAttr.axisOrigin.y);
      context.value.stroke();
      // 绘制坐标轴三角形
      context.value.moveTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin, axisInnerAttr.axisOrigin.y);
      context.value.lineTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin - 10, axisInnerAttr.axisOrigin.y + 5);
      context.value.lineTo(axisInnerAttr.axisRight + axisConfigsVal.axisMargin - 10, axisInnerAttr.axisOrigin.y - 5);
      context.value.fill();
    };

    /**
     * 绘制轴线刻度
     */
    const drawXAxisTicks = () => {
      let deltaY: number;
      for (let i = 1; i < axisInnerAttr.xAxisTicksNum; i++) {
        context.value.beginPath();
        // 判断显示长刻度还是短刻度
        if (i % axisConfigsVal.xAxisRange.step === 0) {
          deltaY = axisConfigsVal.tickWidth;
        } else {
          deltaY = axisConfigsVal.tickWidth / 2;
        }
        context.value.moveTo(axisInnerAttr.axisOrigin.x + i * axisInnerAttr.xTickSpacing,
          axisInnerAttr.axisOrigin.y - deltaY);
        context.value.lineTo(axisInnerAttr.axisOrigin.x + i * axisInnerAttr.xTickSpacing,
          axisInnerAttr.axisOrigin.y + deltaY);
        context.value.stroke();
      }

    };
    const drawYAxisTicks = () => {
      let deltaX: number;
      for (let i = 1; i < axisInnerAttr.yAxisTicksNum; i++) {
        context.value.beginPath();
        if (i % axisConfigsVal.yAxisRange.step === 0) {
          deltaX = axisConfigsVal.tickWidth;
        } else {
          deltaX = axisConfigsVal.tickWidth / 2;
        }
        context.value.moveTo(axisInnerAttr.axisOrigin.x - deltaX,
          axisInnerAttr.axisOrigin.y - i * axisInnerAttr.yTickSpacing);
        context.value.lineTo(axisInnerAttr.axisOrigin.x + deltaX,
          axisInnerAttr.axisOrigin.y - i * axisInnerAttr.yTickSpacing);
        context.value.stroke();
      }
    };
    /**
     * 绘制轴线标签
     */
    const drawAxisLabels = () => {
      context.value.save();
      context.value.fillStyle = AXIS_LABEL_COLOR.value;
      drawXTicksLabels();
      drawYTicksLabels();
      context.value.restore();
      drawAxisTitle();
    };

    const drawXTicksLabels = () => {
      context.value.textAlign = 'center';
      context.value.textBaseline = 'top';
      for (let i = 0; i <= axisInnerAttr.xAxisTicksNum; i++) {
        if (i % axisConfigsVal.xAxisRange.step === 0) {
          context.value.fillText(i, axisInnerAttr.axisOrigin.x + i * axisInnerAttr.xTickSpacing,
            axisInnerAttr.axisOrigin.y + axisConfigsVal.spaceBetweenLabelsAxis);
        }
      }
    };
    const drawYTicksLabels = () => {
      context.value.textAlign = 'center';
      context.value.textBaseline = 'middle';
      for (let i = 0; i <= axisInnerAttr.yAxisTicksNum; i++) {
        if (i % axisConfigsVal.yAxisRange.step === 0) {
          context.value.fillText(i, axisInnerAttr.axisOrigin.x - axisConfigsVal.spaceBetweenLabelsAxis,
            axisInnerAttr.axisOrigin.y - i * axisInnerAttr.yTickSpacing);
        }
      }
    };
    const drawAxisTitle = () => {
      context.value.font = '12px Microsoft YaHei';
      context.value.textAlign = 'left';
      context.value.fillStyle = AXIS_LABEL_COLOR.value;
      const xLabelWidth = context.value.measureText(axisConfigsVal.xAxisLabel).width;
      rotateLabel(axisConfigsVal.xAxisLabel, axisInnerAttr.axisRight + axisConfigsVal.axisMargin / 2,
        axisInnerAttr.axisOrigin.y - xLabelWidth - AXIS_TITLE_SPACE);
      context.value.fillText(axisConfigsVal.yAxisLabel,
        axisInnerAttr.axisOrigin.x + AXIS_TITLE_SPACE, axisInnerAttr.axisTop - axisConfigsVal.axisMargin / 2);
    };

    const rotateLabel = (name: string, x: number, y: number) => {
      for (let i = 0; i < name.length; i++) {
        const str = name.slice(i, i + 1).toString();
        if (str.match(/[A-Za-z0-9]/)) {
          context.value.save();
          context.value.translate(x, y);
          context.value.rotate(Math.PI / 180 * 90);
          context.value.textBaseline = 'bottom';
          context.value.fillText(str, 0, 0);
          context.value.restore();
          y += context.value.measureText(str).width;
        } else if (str.match(/[\u4E00-\u9FA5]/)) {
          context.value.save();
          context.value.textBaseline = 'top';
          context.value.fillText(str, x, y);
          context.value.restore();
          y += context.value.measureText(str).width;
        }
      }
    };


  },
  render() {
    const { diagramId, view } = this;
    return (
      <div>
        <canvas id={'devui-quadrant-axis-' + diagramId} height={view.height} width={view.width}></canvas>
      </div>
    );
  }
});
