import { Ref, ref, SetupContext } from 'vue';
import { ArrType, UsePopupLineFn } from '../../../types';

const usePopupLine = (
  hourListRef: Array<ArrType>,
  minuteListRef: Array<ArrType>,
  secondListRef: Array<ArrType>,
  minTime: string,
  maxTime: string,
  format: string,
  itemHeight: number,
  timeListDom: Ref,
  ctx: SetupContext
): UsePopupLineFn => {
  const activeTime = ref('00:00:00');
  const activeHour = ref('00');
  const activeMinute = ref('00');
  const activeSecond = ref('00');

  // 设置最大值  最小值
  const setItemAstrict = (timeArr: Array<ArrType>, min: string, max: string) => {
    timeArr.map((item) => {
      if (min !== '00' && item.time < min) {
        item.isDisabled = true;
      } else if (max !== '00' && item.time > max) {
        item.isDisabled = true;
      } else {
        item.isDisabled = false;
      }
    });
  };

  // 获取最大值 最小值
  const getItemAstrict = (item: ArrType): void => {
    let min = '00';
    let max = '00';

    const minTimeHour = minTime.split(':')[0];
    const minTimeMinute = minTime.split(':')[1];
    const minTimeSecond = minTime.split(':')[2];

    const maxTimeHour = maxTime.split(':')[0];
    const maxTimeMinute = maxTime.split(':')[1];
    const maxTimeSecond = maxTime.split(':')[2];

    if (item.flag === 'hour') {
      if (item.time === minTimeHour) {
        min = minTimeMinute;
        setItemAstrict(minuteListRef, min, max);
        activeMinute.value < minTimeMinute && setItemAstrict(secondListRef, minTimeSecond, max);
      } else if (item.time === maxTimeHour) {
        max = maxTimeMinute;
        setItemAstrict(minuteListRef, min, max);
        setItemAstrict(secondListRef, min, maxTimeSecond);
      } else {
        setItemAstrict(minuteListRef, min, max);
        setItemAstrict(secondListRef, min, max);
      }
    }
    if (item.flag === 'minute' && format === 'mm:ss') {
      if (item.time === minTimeMinute) {
        min = minTimeSecond;
        setItemAstrict(secondListRef, min, max);
      } else if (item.time === maxTimeMinute) {
        max = maxTimeSecond;
        setItemAstrict(secondListRef, min, max);
      } else {
        setItemAstrict(secondListRef, min, max);
      }
    } else if (item.flag === 'minute') {
      if (activeHour.value === minTimeHour && item.time === minTimeMinute) {
        min = minTimeSecond;
        setItemAstrict(secondListRef, min, max);
      } else if (activeHour.value === maxTimeHour && item.time === maxTimeMinute) {
        max = maxTimeSecond;
        setItemAstrict(secondListRef, min, max);
      } else {
        setItemAstrict(secondListRef, min, max);
      }
    }
  };

  // 指定选中
  const resetTimeActive = (timeArr: Array<ArrType>, itemValue: string) => {
    timeArr.map((item) => {
      item.isActive = item.time === itemValue;
    });
  };

  // 解决清空之后，再次打开 最大值最小值限制范围失效
  const resetTimeAstrict = (timeArr: Array<ArrType>, time: string) => {
    timeArr.map((item) => {
      if (item.time === time) {
        getItemAstrict(item);
      }
    });
  };

  // 指定时间
  const resetTimeValue = (time: string) => {
    const timeValueArr = time.split(':');

    let hh = 0;
    let mm = 0;
    let ss = 0;

    if (format === 'hh:mm:ss') {
      hh = parseInt(timeValueArr[0]);
      mm = parseInt(timeValueArr[1]);
      ss = parseInt(timeValueArr[2]);
      timeListDom.value.children[0].lastElementChild.children[0].scrollTop = hh * itemHeight;
      timeListDom.value.children[1].lastElementChild.children[0].scrollTop = mm * itemHeight;
      timeListDom.value.children[2].lastElementChild.children[0].scrollTop = ss * itemHeight;

      activeHour.value = timeValueArr[0];
      activeMinute.value = timeValueArr[1];
      activeSecond.value = timeValueArr[2];

      resetTimeActive(hourListRef, timeValueArr[0]);
      resetTimeActive(minuteListRef, timeValueArr[1]);
      resetTimeActive(secondListRef, timeValueArr[2]);

      resetTimeAstrict(hourListRef, activeHour.value);
      resetTimeAstrict(minuteListRef, activeMinute.value);
    } else if (format === 'mm:hh:ss') {
      hh = parseInt(timeValueArr[0]);
      mm = parseInt(timeValueArr[1]);
      ss = parseInt(timeValueArr[2]);

      timeListDom.value.children[0].lastElementChild.children[0].scrollTop = mm * itemHeight;
      timeListDom.value.children[1].lastElementChild.children[0].scrollTop = hh * itemHeight;
      timeListDom.value.children[2].lastElementChild.children[0].scrollTop = ss * itemHeight;

      activeHour.value = timeValueArr[0];
      activeMinute.value = timeValueArr[1];
      activeSecond.value = timeValueArr[2];

      resetTimeActive(hourListRef, timeValueArr[0]);
      resetTimeActive(minuteListRef, timeValueArr[1]);
      resetTimeActive(secondListRef, timeValueArr[2]);

      resetTimeAstrict(hourListRef, activeHour.value);
      resetTimeAstrict(minuteListRef, activeMinute.value);
    } else if (format === 'hh:mm') {
      hh = parseInt(timeValueArr[0]);
      mm = parseInt(timeValueArr[1]);

      timeListDom.value.children[0].lastElementChild.children[0].scrollTop = hh * itemHeight;
      timeListDom.value.children[1].lastElementChild.children[0].scrollTop = mm * itemHeight;

      activeHour.value = timeValueArr[0];
      activeMinute.value = timeValueArr[1];
      activeSecond.value = timeValueArr[2];

      resetTimeActive(hourListRef, timeValueArr[0]);
      resetTimeActive(minuteListRef, timeValueArr[1]);

      resetTimeAstrict(hourListRef, activeHour.value);
    } else if (format === 'mm:ss') {
      mm = parseInt(timeValueArr[1]);
      ss = parseInt(timeValueArr[2]);

      timeListDom.value.children[0].lastElementChild.children[0].scrollTop = mm * itemHeight;
      timeListDom.value.children[1].lastElementChild.children[0].scrollTop = ss * itemHeight;

      activeHour.value = timeValueArr[0];
      activeMinute.value = timeValueArr[1];
      activeSecond.value = timeValueArr[2];

      resetTimeActive(minuteListRef, timeValueArr[1]);
      resetTimeActive(secondListRef, timeValueArr[2]);

      resetTimeAstrict(minuteListRef, activeMinute.value);
    }
  };

  const setTimeActive = (item: ArrType, index: number) => {
    let activeTimeList: ArrType[] = [];
    let activeTimeValue = ref('');
    if (item.flag === 'hour') {
      activeTimeList = hourListRef;
      activeTimeValue = activeHour;
      getItemAstrict(item);
    } else if (item.flag === 'minute') {
      activeTimeList = minuteListRef;
      activeTimeValue = activeMinute;
      getItemAstrict(item);
    } else if (item.flag === 'second') {
      activeTimeList = secondListRef;
      activeTimeValue = activeSecond;
    }

    activeTimeList.map((timeItem, timeIndex) => {
      timeItem.isActive = index === timeIndex;
    });
    activeTimeValue.value = activeTimeList[index].time;

    activeTime.value = `${activeHour.value}:${activeMinute.value}:${activeSecond.value}`;

    if (activeTime.value < minTime) {
      activeTime.value = minTime;
      resetTimeValue(minTime);
    } else if (format === 'mm:ss' && `${activeMinute.value}:${activeSecond.value}` > maxTime.slice(3)) {
      const newMinTime = minTime.slice(0, 3) + maxTime.slice(3);
      resetTimeValue(newMinTime);
    } else if (activeTime.value > maxTime) {
      activeTime.value = maxTime;
      resetTimeValue(maxTime);
    }
  };

  const activeTimeFun = (e: MouseEvent, item: ArrType, index: number) => {
    if (item.isDisabled) {
      return false;
    } else {
      setTimeActive(item, index);
      if ((e?.target as HTMLElement)?.parentElement) {
        const pdom =  (e?.target as HTMLElement)?.parentElement;
        pdom && pdom.parentElement && (pdom.parentElement.scrollTop = index * itemHeight);
      }
    }
    ctx.emit('change', { activeHour, activeMinute, activeSecond });
  };

  // 暂时返回选中  时 分 秒
  const getNewTime = () => {
    return { activeTime, activeHour, activeMinute, activeSecond };
  };

  // 回到顶部
  const resetScrollTop = () => {
    for (let i = 0; i < timeListDom.value.children.length; i++) {
      timeListDom.value.children[i].lastElementChild.children[0].scrollTop = 0;
    }
  };

  return {
    activeTime,
    activeHour,
    activeMinute,
    activeSecond,
    activeTimeFun,
    resetTimeValue,
    getNewTime,
    resetScrollTop,
  };
};

export { usePopupLine };
