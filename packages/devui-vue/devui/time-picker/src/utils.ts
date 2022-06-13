import { reactive } from 'vue';
import { ArrType, timeDataType } from './types';

/**
 * 初始化数据
 * @param type 类型（ 时，分，秒 ）
 * @returns Array<time>
 */

export function initializeTimeData(type: timeDataType): ArrType[] {
  const timeArr: ArrType[] = reactive([]);
  let arrLength = 0;
  if (type === 'hour') {
    arrLength = 24;
  } else {
    arrLength = 60;
  }
  for (let i = 0; i < arrLength; i++) {
    timeArr.push({
      time: i < 10 ? '0' + i : i + '',
      isActive: false,
      flag: type,
      isDisabled: false,
      type,
    });
  }
  return timeArr;
}

/**
 * 初始化 最小值 最大值
 * @param hourList
 * @param minuteList
 * @param maxTime
 * @param minTime
 * @param farmat
 */
export const setTimeAstrict = (
  hourList: Array<ArrType>,
  minuteList: Array<ArrType>,
  secondList: Array<ArrType>,
  minTime: string,
  maxTime: string,
  format: string
): void => {
  const maxTimeHour = maxTime.split(':')[0];
  const maxTimeMinute = maxTime.split(':')[1];
  const minTimeHour = minTime.split(':')[0];
  const minTimeMinute = minTime.split(':')[1];
  const minTimeSecond = minTime.split(':')[2];

  hourList.map((item) => {
    if (item.time < minTimeHour || item.time > maxTimeHour) {
      item.isDisabled = true;
    }
  });

  // 如果为mm:ss格式，限制小时的选择范围
  if (format === 'mm:ss') {
    minuteList.map((item) => {
      if (item.time < minTimeMinute || item.time > maxTimeMinute) {
        item.isDisabled = true;
      }
    });
  } else {
    minuteList.map((item) => {
      if (item.time < minTimeMinute) {
        item.isDisabled = true;
      }
    });
  }
  secondList.map((item) => {
    if (item.time < minTimeSecond) {
      item.isDisabled = true;
    }
  });
};
