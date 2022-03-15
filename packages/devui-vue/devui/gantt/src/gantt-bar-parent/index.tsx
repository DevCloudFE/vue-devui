import {defineComponent , ref , toRefs } from 'vue';
import {GanttService} from '../gantt-service';
import { Subscription } from 'rxjs';
// import { GanttProps } from '../gantt-types'
import './gantt-bar-parent.scss';
const ganttService = new GanttService();
export default defineComponent({
  name:'DGanttBarParent',
  props:{
    // 开始时间
    startDate:{
      type:Date,
    },
    // 结束时间
    endDate:{
      type:Date
    },
    // 进度
    progressRate:{
      type:Number,
      default:0
    },
    data:{},
    id:{
      type:String,
    },
    tip:{
      type:String,
    },
    ganttScaleStatusHandler:{
      type:Subscription
    }
  },
  setup(props){
    const {startDate,endDate,data,id,tip  } = toRefs(props);
    let { progressRate, ganttScaleStatusHandler } = toRefs(props);
    // const ganttScaleStatusHandler:Subscription = ref<Subscription>()
    const tipHovered = ref(false);
    const percentage = ref(0);
    let left = ref(0);
    let width = ref(0);
    const max = 100;
    const min = 0;
    let duration = ref('');

    const setValue = (value: number | null): void => {
      if (progressRate !== value) {
        progressRate = value;
        updateTrackAndHandle();
      }
    };
    const ensureValueInRange = (value: number | null): number => {
      let safeValue;
      if (!valueMustBeValid(value)) {
        safeValue = min;
      } else {
        safeValue = clamp(min, value as number, max);
      }
      return safeValue;
    };
    const valueMustBeValid = (value: number): boolean  => {
      return !isNaN(typeof value !== 'number' ? parseFloat(value) : value);
    };
    const clamp = (min: number, n: number, max: number) =>  {
      return Math.max(min, Math.min(n, max));
    };
    const updateTrackAndHandle = (): void => {
      const value = progressRate;
      const offset = valueToOffset(value);
      updateStyle(offset / 100);
      this.cdr.markForCheck();
    };
    const valueToOffset = (value: number): number => {
      return ((value - min.value) / (max.value - min.value)) * 100;
    };
    const updateStyle = (percentage) => {
      percentage = Math.min(1, Math.max(0, percentage));
      if (this.ganttBarTrack && this.ganttBarTrack.nativeElement) {
        this.ganttBarTrack.nativeElement.style.width = `${percentage * 100}%`;
      }

      if (this.ganttBarProgress && this.ganttBarProgress.nativeElement) {
        this.ganttBarProgress.nativeElement.style.left = `${percentage * 100}%`;
      }
    };
    const onInit = () => {
      if (progressRate === null) {
        this.setValue(this.ensureValueInRange(null));
      }

      duration = ganttService.getDuration(startDate, endDate) + 'd';

      ganttScaleStatusHandler = ganttService.ganttScaleConfigChange.subscribe((config) => {
        if (config.startDate) {
          left = ganttService.getDatePostionOffset(startDate);
        }
        if (config.unit) {
          left = ganttService.getDatePostionOffset(startDate);
          width = ganttService.getDurationWidth(startDate, endDate);
        }
      }) as Subscription;
    };

    const ngOnChanges = (changes) => {
      if (changes['progressRate'] && progressRate > 0) {
        updateTrackAndHandle();
      }

      if (changes['startDate']) {
        left = ganttService.getDatePostionOffset(startDate);
        width = ganttService.getDurationWidth(startDate, endDate);
      }

      if (changes['endDate']) {
        width = ganttService.getDurationWidth(startDate, endDate);
      }
    };

    const AfterViewInit = () => {
      if (progressRate && progressRate > 0) {
        updateTrackAndHandle();
      }
    };

    const OnDestroy= (): void =>  {
      if (ganttScaleStatusHandler.value) {
        ganttScaleStatusHandler.value.unsubscribe();
        ganttScaleStatusHandler = null;
      }
    };

    return {
      left,
      width
    };
  },
  render() {
    const {
      left,
      width
    } = this;
    const style = {
      position:'',
      left:left,
      width:width
    };
    return (
      <div class="devui-gantt-bar-parent">
        <div class="devui-gantt-bar-rail"></div>
        <div class="devui-gantt-bar-track"></div>
      </div>
    );
  },
});
