import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { ArrType } from '../../time-picker/src/types';

export const formatDayjsToStr = (date: Dayjs | undefined, format: string): string | null => {
  if (!date) {
    return null;
  }
  return date.format(format);
};

export const isDateEquals = (pre: Date | any, cur: Date | any): boolean => {
  const preDate = pre instanceof Date;
  const curDate = cur instanceof Date;
  return preDate && curDate ? pre.getTime() === cur.getTime() : pre === cur;
};

export const parserDate = (date: Date | string): Dayjs | undefined => {
  const day = dayjs(date).locale('zh-cn');
  return day.isValid() ? day : undefined;
};

export const resetActiveTimeData = (list: ArrType[]): void => {
  list.forEach((item) => {
    item.isActive = false;
  });
};
