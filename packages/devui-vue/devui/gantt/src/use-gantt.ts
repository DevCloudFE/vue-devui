import { GanttScaleUnit } from './gantt-model';
export const useGantt = (scaleUnit = GanttScaleUnit.day) => {
  const DAY_DURATION = 24 * 60 * 60 * 1000;

  const getScaleUnitPixel = () => {
    switch (scaleUnit) {
    case GanttScaleUnit.day:
      return 40;
    case GanttScaleUnit.week:
      return 30;
    case GanttScaleUnit.month:
      return 20;
    default:
      break;
    }
  };

  const getDuration = (startDate: Date, endDate: Date): number => {
    if (startDate && endDate) {
      const timeOffset = endDate.getTime() - startDate.getTime();
      const duration = timeOffset / DAY_DURATION + 1;

      return Math.round(duration);
    }
  };
  const getDurationWidth = (startDate: Date, endDate: Date): number => {
    if (startDate && endDate) {
      const duration = getDuration(startDate, endDate);
      return duration * getScaleUnitPixel();
    }
  };
  return {
    getDurationWidth,
  };
};
