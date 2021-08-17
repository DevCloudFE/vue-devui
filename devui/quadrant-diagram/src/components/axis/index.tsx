import { defineComponent, PropType, toRefs, onMounted } from 'vue'
import { IViewConfigs, IAxisConfigs } from '../../../type';
import { AXIS_TITLE_SPACE } from '../../../config';

import './index.scss'

const Axis = defineComponent({
  props: {
    view: {
      type: Object as PropType<IViewConfigs>,
    },
    axisConfigs: {
      type: Object as PropType<IAxisConfigs>,
    },
    diagramId: {
      type: String,
    },
  },
  setup(props) {

    const { diagramId, view, axisConfigs } = toRefs(props);

    const axisConfigsVal: IAxisConfigs = axisConfigs.value;
    const viewVal: IViewConfigs = view.value;
    const AXIS_COLOR = '#0000ff';
    const AXIS_LABEL_COLOR = '#ff0000';

    let quadrantAxis: any;
    let context: any;
    let axisOrigin: any;
    let axisTop: number;
    let axisRight: number;
    let axisWidth: number;
    let axisHeight: number;
    let yAxisTicksNum: number;
    let xAxisTicksNum: number;
    let xTickSpacing: number;
    let yTickSpacing: number;


    onMounted(() => {
      resetAxis();
    });

    const resetAxis = () => {
      initAxisData();
      setAxisData();
      drawAxis();
      drawAxisLabels();
    }
    /**
     * 获取 canvas 并赋值宽高
     */
    const initAxisData = () => {
      quadrantAxis = document.querySelector('#devui-quadrant-axis-' + diagramId.value );
      quadrantAxis.width = viewVal.width;
      quadrantAxis.height = viewVal.height;
    }

    const setAxisData = () => {
      context = quadrantAxis.getContext('2d');
      axisOrigin = axisConfigsVal.axisOrigin;
      axisTop = axisConfigsVal.axisTop;
      axisRight = axisConfigsVal.axisRight;
      axisWidth = axisConfigsVal.axisWidth;
      axisHeight = axisConfigsVal.axisHeight;
      yAxisTicksNum = axisConfigsVal.yAxisTicksNum;
      xAxisTicksNum = axisConfigsVal.xAxisTicksNum;
      xTickSpacing = axisConfigsVal.xTickSpacing;
      yTickSpacing = axisConfigsVal.yTickSpacing;
    }

    /** 
     * 执行绘制 
     */
    const drawAxis = ()  => {
      context.save();
      context.fillStyle = AXIS_COLOR;
      context.strokeStyle = AXIS_COLOR;
      drawXAxis();
      drawYAxis();
      context.lineWidth = 0.5;
      drawXAxisTicks();
      drawYAxisTicks();
      context.restore();
    }
    
    /**
     * 绘制 XY 轴
     */
    const drawYAxis = () => {
      context.beginPath();
      context.moveTo(axisOrigin.x, axisOrigin.y);
      context.lineTo(axisOrigin.x, axisTop - axisConfigsVal.axisMargin);
      context.stroke();
      context.moveTo(axisOrigin.x, axisTop - axisConfigsVal.axisMargin);
      context.lineTo(axisOrigin.x + 5, axisTop - axisConfigsVal.axisMargin + 10);
      context.lineTo(axisOrigin.x - 5, axisTop - axisConfigsVal.axisMargin + 10);
      context.fill();

    }
    const drawXAxis = () => {
      context.beginPath();
      context.moveTo(axisOrigin.x, axisOrigin.y);
      context.lineTo(axisRight + axisConfigsVal.axisMargin - 10, axisOrigin.y);
      context.stroke();
      // 绘制坐标轴三角形
      context.moveTo(axisRight + axisConfigsVal.axisMargin, axisOrigin.y);
      context.lineTo(axisRight + axisConfigsVal.axisMargin - 10, axisOrigin.y + 5);
      context.lineTo(axisRight + axisConfigsVal.axisMargin - 10, axisOrigin.y - 5);
      context.fill();
    }

    /**
     * 绘制轴线刻度
     */
    const drawXAxisTicks = () => {
      let deltaY;
      for (let i = 1; i < xAxisTicksNum; i++) {
        context.beginPath();
        // 判断显示长刻度还是短刻度
        if (i % axisConfigsVal.xAxisRange.step === 0) {
          deltaY = axisConfigsVal.tickWidth;
        } else {
          deltaY = axisConfigsVal.tickWidth / 2;
        }
        context.moveTo(axisOrigin.x + i * xTickSpacing,
          axisOrigin.y - deltaY);
        context.lineTo(axisOrigin.x + i * xTickSpacing,
          axisOrigin.y + deltaY);
        context.stroke();
      }

    }
    const drawYAxisTicks = () => {
      let deltaX;
      for (let i = 1; i < yAxisTicksNum; i++) {
        context.beginPath();
        if (i % axisConfigsVal.yAxisRange.step === 0) {
          deltaX = axisConfigsVal.tickWidth;
        } else {
          deltaX = axisConfigsVal.tickWidth / 2;
        }
        context.moveTo(axisOrigin.x - deltaX,
          axisOrigin.y - i * yTickSpacing);
        context.lineTo(axisOrigin.x + deltaX,
          axisOrigin.y - i * yTickSpacing);
        context.stroke();
      }
    }

    const drawAxisLabels = () => {
      context.save();
      context.fillStyle = AXIS_LABEL_COLOR;
      drawXTicksLabels();
      drawYTicksLabels();
      context.restore();
      drawAxisTitle();
    }

    const drawXTicksLabels = () => {
      context.textAlign = 'center';
      context.textBaseline = 'top';
      for (let i = 0; i <= xAxisTicksNum; i++) {
        if (i % axisConfigsVal.xAxisRange.step === 0) {
          context.fillText(i,
            axisOrigin.x + i * xTickSpacing,
            axisOrigin.y + axisConfigsVal.spaceBetweenLabelsAxis);
        }
      }
     };
    const drawYTicksLabels = () => {
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      for (let i = 0; i <= yAxisTicksNum; i++) {
        if (i % axisConfigsVal.yAxisRange.step === 0) {
          context.fillText(i,
            axisOrigin.x - axisConfigsVal.spaceBetweenLabelsAxis,
            axisOrigin.y - i * yTickSpacing);
        }
      }
     };
    const drawAxisTitle = () => {
      context.font = '12px Microsoft YaHei';
      context.textAlign = 'left';
      context.fillStyle = AXIS_LABEL_COLOR;
      const xLabelWidth = context.measureText(axisConfigsVal.xAxisLabel).width;
      rotateLabel(axisConfigsVal.xAxisLabel, axisRight + axisConfigsVal.axisMargin / 2,
        axisOrigin.y - xLabelWidth - AXIS_TITLE_SPACE);
      context.fillText(axisConfigsVal.yAxisLabel,
        axisOrigin.x + AXIS_TITLE_SPACE, axisTop - axisConfigsVal.axisMargin / 2);
    };
    
    const rotateLabel = (name, x, y) => {
      for (let i = 0; i < name.length; i++) {
        const str = name.slice(i, i + 1).toString();
        if (str.match(/[A-Za-z0-9]/)) {
          context.save();
          context.translate(x, y);
          context.rotate(Math.PI / 180 * 90);
          context.textBaseline = 'bottom';
          context.fillText(str, 0, 0);
          context.restore();
          y += context.measureText(str).width;
        } else if (str.match(/[\u4E00-\u9FA5]/)) {
          context.save();
          context.textBaseline = 'top';
          context.fillText(str, x, y);
          context.restore();
          y += context.measureText(str).width;
        }
      }
    }


  },
  render() {
    const { diagramId } = this;
    return (
      <div>
        <canvas id={'devui-quadrant-axis-' + diagramId }></canvas>
      </div>
      
    );
  }
})

export default Axis;