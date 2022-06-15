import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { isEmpty } from 'lodash';

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

export const getFormatterDate = (date: Dayjs | null, format: string): number | string | null => {
  if (!date) {
    return null;
  }
  if (format === 'x') {
    return +date;
  }
  return dayjs(date).locale('zh-cn').format(format);
};

export const parserDate = (date: string | number | Date, format: string): Dayjs | undefined => {
  const day = isEmpty(format) || format === 'x' ? dayjs(date).locale('zh-cn') : dayjs(date, format).locale('zh-cn');
  return day.isValid() ? day : undefined;
};
