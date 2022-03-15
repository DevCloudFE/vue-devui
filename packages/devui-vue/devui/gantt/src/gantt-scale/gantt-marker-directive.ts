import { GanttScaleUnit } from '../gantt-model';
interface BindingType {
  value: {
    ganttBarContainerElement: HTMLElement;
    ganttScaleContainerOffsetLeft: number;
    monthMark: boolean;
    weekend: boolean;
    today: boolean;
    milestone: string;
    unit: GanttScaleUnit;
    date: Date;
    last: boolean;
  };
}
const ganttMarkerDirective = {
  ganttBarContainerElement: null,
  monthMarkElement: null,
  weekendElement: null,
  todayElement: null,
  milestoneElement: null,
  monthMark: '',
  mounted(el: HTMLElement, binding: BindingType): void {
    const { ganttBarContainerElement, monthMark } = binding.value;
    if (ganttBarContainerElement) {
      this.ganttBarContainerElement = ganttBarContainerElement;
    }
    if (monthMark) {
      this.monthMark = this.monthMark;
    }
  },
  updated(el: HTMLElement, binding: BindingType): void {
    // todo
    const { monthMark, weekend, today, milestone, unit } = binding.value;
    if (monthMark) {
      this.initMarkElement();
    }
  },
  initMarkElement(): void {
    if (this.ganttBarContainerElement) {
      if (this.monthMark && !this.monthMarkElement) {
        // todo
      }
    }
  },
};

export default ganttMarkerDirective;
