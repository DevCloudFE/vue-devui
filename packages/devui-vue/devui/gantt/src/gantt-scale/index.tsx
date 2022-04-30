import { defineComponent, ref, PropType, onMounted, toRefs, watch } from 'vue';
import './gantt-scale.scss';
import {
  GanttScaleUnit,
  GanttMilestone,
  GanttScaleDateInfo,
} from '../gantt-model';
import { useScaleData } from './use-scale-data';
import { i18nText } from '../i18n-gantt';
export default defineComponent({
  name: 'DGanttScale',
  props: {
    /** 视图单位 */
    unit: {
      type: String,
      default: GanttScaleUnit.day,
    },
    height: {
      type: Number,
    },
    /** 开始时间 */
    startDate: {
      type: Date,
    },
    /** 结束时间 */
    endDate: {
      type: Date,
    },
    /** 甘特图时间轴容器左偏移像素  */
    ganttScaleContainerOffsetLeft: {
      type: Number,
    },
    /** 版本里程碑列表 */
    milestoneList: {
      type: Array as PropType<GanttMilestone[]>,
    },
    scrollElement: {
      type: Object,
    },
    ganttBarContainerElement: {
      type: Object,
    },
  },
  emits: ['addMilestone'],
  setup(props, ctx) {
    const { startDate, endDate, milestoneList, scrollElement, unit } =
      toRefs(props);
    const scaleData = ref<GanttScaleDateInfo[]>([]);
    const viewSCaleData = ref<GanttScaleDateInfo[]>([]);
    const scaleWidth = ref({
      day: 40,
      week: 30,
      month: 20,
    });
    const highlight = ref(false);
    const highlightStartText = ref('');
    const highlightEndText = ref('');
    const { generateScaleData } = useScaleData(milestoneList);
    let viewScaleRange = [0, 0];
    const addMilestone = (info: GanttScaleDateInfo) => {
      ctx.emit('addMilestone', info);
    };
    const getViewScaleData = () => {
      if (scrollElement.value) {
        const containerWidth = scrollElement.value.clientWidth;
        const scrollLeft = scrollElement.value.scrollLeft;

        const start = Math.floor(scrollLeft / scaleWidth.value[unit.value]);
        const offset = Math.ceil(containerWidth / scaleWidth.value[unit.value]);
        viewScaleRange = [start - 2, start + offset + 2];
        viewSCaleData.value = scaleData.value.filter(
          (i: GanttScaleDateInfo) => {
            return i.index >= viewScaleRange[0] && i.index <= viewScaleRange[1];
          }
        );
      }
    };
    onMounted(() => {
      if (startDate.value && endDate.value) {
        scaleData.value = generateScaleData(startDate.value, endDate.value);
        getViewScaleData();
      }
    });

    watch(
      () => props.scrollElement,
      () => {
        getViewScaleData()
        ;(props.scrollElement as HTMLDivElement).addEventListener(
          'scroll',
          () => {
            getViewScaleData();
          }
        );
      }
    );

    return {
      viewSCaleData,
      scaleWidth,
      addMilestone,
      highlight,
      highlightStartText,
      highlightEndText,
    };
  },
  render() {
    const {
      unit,
      viewSCaleData,
      scaleWidth,
      addMilestone,
      highlight,
      highlightStartText,
      highlightEndText,
      ganttBarContainerElement,
    } = this;
    return (
      <div class="devui-gantt-scale-wrapper">
        {viewSCaleData.map((data, index) => (
          <div
            class={`devui-gantt-scale ${unit} ${data.today} ${data.milestone}`}
            style={{
              left: `${scaleWidth[unit] * data.index}px`,
              width: `${scaleWidth[unit]}px`,
            }}
            v-gantt-marker={{
              ganttBarContainerElement,
              monthMark: data.monthMark,
              weekend: data.weekend,
              milestone: data.milestone,
              today: data.today,
              date: data.date,
              unit: unit,
              last: index === viewSCaleData.length - 1,
            }}
          >
            <div class={`devui-scale-start ${data.milestone}`}>
              {data.milestone && unit === 'day' && <div>{data.milestone}</div>}
              {(!data.milestone || unit !== 'day') &&
              data.scaleStartVisable &&
              (index === 0 || data.monthStart)
                ? unit === 'month'
                  ? i18nText.zh.yearDisplay(data.yearLabel)
                  : i18nText.zh.yearAndMonthDisplay(
                    data.yearLabel,
                    data.monthLabel
                  )
                : ''}
            </div>
            <div class="devui-scale-unit">
              {highlight && data.highlightStart && (
                <div class="scale-highlight">
                  <div style="float: left">{highlightStartText}</div>
                  <div style="float: right">{highlightEndText}</div>
                  <div style="clear: both"></div>
                </div>
              )}
              {(!highlight || !data.highlightStart) && unit === 'day' && (
                <div class={`border-left ${data.today ? 'today' : ''}`}>
                  {data.today ? i18nText.zh.today : data.dayOfMonthLabel}
                </div>
              )}
              {(!highlight || !data.highlightStart) && unit === 'week' && (
                <div
                  class={`${data.weekend || index === 0 ? 'border-left' : ''}`}
                >
                  {index === 0 || data.weekend ? data.dayOfMonthLabel : ''}
                </div>
              )}
              {(!highlight || !data.highlightStart) && unit === 'month' && (
                <div
                  class={`${
                    data.monthStart || index === 0 ? 'border-left' : ''
                  }`}
                >
                  {index === 0 || data.monthStart
                    ? i18nText.zh.monthDisplay(data.monthLabel)
                    : ''}
                </div>
              )}
            </div>
            <div
              class={`milestone-new ${unit}`}
              title="milestone"
              onClick={() => addMilestone(data)}
            >
              <d-icon name="add" />
            </div>
          </div>
        ))}
      </div>
    );
  },
});
