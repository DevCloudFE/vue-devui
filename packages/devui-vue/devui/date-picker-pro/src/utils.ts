import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { ArrType } from '../../time-picker/src/types';
import { getCurrentInstance } from 'vue';
import { createI18nTranslate } from '../../locale/create';

const app = getCurrentInstance()
export const t = createI18nTranslate('DDatePickerPro', app)
export const formatDayjsToStr = (date: Dayjs | undefined, format: string, type: string, lang: string): string | null => {
  const monthEnArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  if (!date) {
    return null;
  }
  if (type === 'year') {
    return date.year().toString();
  } else if (type === 'month') {
    return lang === 'en-us' ? `${monthEnArr[date.month()]} ${date.year()}` : `${date.year()} ${t('year')} ${date.month() + 1} ${t('month')}`;
  } else {
    // 兼容非法格式(format)，如果是非法格式，则使用默认格式(YYYY/MM/DD)
    return dayjs(date.format(format)).isValid() ? date.format(format) : date.format(DEFAULT_DATE);
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

export const isInputDateValid = (
  inputVal: string,
  format: string,
  calendarRange: Array<number>,
  limitDateRange: Array<Date> | undefined,
  cb: (validDate: string) => void
) => {
  const inputDate = parserDate(inputVal);
  const formatedDate = inputDate?.format(format);
  const year = inputDate?.year();
  const [startYear, endYear] = calendarRange;
  const isInCalendarRange = year && startYear && endYear && year >= startYear && year <= endYear;
  const [startDate, endDate] = limitDateRange ?? [];
  const startDateTime = startDate?.valueOf();
  const endDateTime = endDate?.valueOf();
  const inputDateTime = inputDate?.valueOf();
  const isInLimitDateRange =
    inputDateTime && startDateTime && endDateTime && inputDateTime >= startDateTime && inputDateTime <= endDateTime;
  if (inputDate && formatedDate === inputVal) {
    if (limitDateRange?.length === 2) {
      isInLimitDateRange && cb(formatedDate)
    } else if (isInCalendarRange) {
      cb(formatedDate);
    }
  }
};
