import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { ArrType } from '../../time-picker/src/types';

export const formatDayjsToStr = (date: Dayjs | undefined, format: string, type: string): string | null => {
  if (!date) {
    return null;
  }
  if (type === 'year') {
    return date.year().toString();
  } else if (type === 'month') {
    const month = date.month() + 1 < 10 ? '0' + (date.month() + 1) : date.month() + 1;
    return `${date.year()}-${month}`;
  } else {
    return date.format(format);
  }
};

export const isDateEquals = (pre: Date | unknown, cur: Date | unknown): boolean => {
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
