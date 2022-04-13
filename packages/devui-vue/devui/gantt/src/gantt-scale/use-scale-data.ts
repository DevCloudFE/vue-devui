import { Ref } from 'vue';
import { GanttMilestone, GanttScaleDateInfo } from '../gantt-model';
import { isSameDate } from '../utils';

export const useScaleData = (
  milestoneList: Ref<GanttMilestone[]>
): {
    generateScaleData: (startDate: Date, endDate: Date) => GanttScaleDateInfo[];
  } => {
  const SCALE_START_LABLE_OFFSET = 7;

  const generateDateInfo = (date: Date, index: number): GanttScaleDateInfo => {
    const dateInfo: GanttScaleDateInfo = {
      dayOfMonthLabel: '',
      dayOfWeekLabel: '',
      monthLabel: '',
      yearLabel: '',
      date: date,
      monthStart: false,
      weekend: false,
      today: false,
      milestone: '',
      highlightStart: false,
      scaleStartVisable: true,
      index,
    };
    const dayOfMonth = date.getDate();
    dateInfo.dayOfMonthLabel = dayOfMonth + '';
    if (dayOfMonth === 1) {
      dateInfo.monthStart = true;
    }

    const dayOfWeek = date.getDay();
    dateInfo.dayOfWeekLabel = dayOfWeek + '';
    if (dayOfWeek === 6) {
      dateInfo.weekend = true;
    }
    const month = date.getMonth() + 1;
    dateInfo.monthLabel = month + '';
    const year = date.getFullYear();
    dateInfo.yearLabel = year + '';
    if (isSameDate(date, new Date())) {
      dateInfo.today = true;
    }

    if (
      new Date(
        year,
        month - 1,
        dayOfMonth + SCALE_START_LABLE_OFFSET
      ).getMonth() >
      month - 1
    ) {
      dateInfo.scaleStartVisable = false;
    }
    if (milestoneList.value) {
      milestoneList.value.forEach((milestone) => {
        if (milestone.date) {
          if (isSameDate(milestone.date, dateInfo.date)) {
            dateInfo.milestone = milestone.lable;
          }
        }
      });
    }

    return dateInfo;
  };

  const getNextDay = (date: Date) => {
    const nextDayDate = date.setDate(date.getDate() + 1);
    return new Date(nextDayDate);
  };
  const generateScaleData = (
    startDate: Date,
    endDate: Date
  ): GanttScaleDateInfo[] => {
    const scaleData = [];
    let handleDate = startDate;
    let index = 0;
    while (!isSameDate(handleDate, endDate)) {
      const dateInfo = generateDateInfo(handleDate, index);
      scaleData.push(dateInfo);
      handleDate = getNextDay(new Date(handleDate));
      index++;
    }
    return scaleData;
  };

  return {
    generateScaleData,
  };
};
