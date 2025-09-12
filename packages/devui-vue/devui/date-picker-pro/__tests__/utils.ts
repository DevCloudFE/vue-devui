import dayjs from 'dayjs';
import { DATE_FORMAT } from './const';

export const getDateIndex = (date: Date): number => {
  return dayjs(date).subtract(date.getDate() - 1, 'day').day() + date.getDate() - 1;
};

export const getSelectedIndex = (todayIndex: number, intervalDay = 1): number => {
  return todayIndex > 20 ? todayIndex : todayIndex + intervalDay;
};

export const getSelectedDate = (todayIndex: number, date: Date, intervalDay = 1): string => {
  return todayIndex > 20 ? dayjs(date).format(DATE_FORMAT) : dayjs(date).add(intervalDay, 'day').format(DATE_FORMAT);
};
