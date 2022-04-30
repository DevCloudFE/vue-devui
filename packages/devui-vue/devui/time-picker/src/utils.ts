import { Ref , reactive} from 'vue';
import { ArrType } from './types';

/**
 * 动态调整弹窗位置
 * @param element
 * @returns { top , left }
 */
export function getPositionFun(el: Element,left: Ref,top: Ref): any{
  const inputDom = el.getBoundingClientRect();
  const button = window.innerHeight - (inputDom.top + 20);
  if(button > inputDom.top + 20){
    left.value = inputDom.x;
    top.value = inputDom.top + 20 + 10;
  }else{
    left.value = inputDom.x;
    top.value = inputDom.top - 316;
  }
}

/**
 * 初始化数据
 * @param type 类型（ 时，分，秒 ）
 * @returns Array<time>
 */

export function initializeTimeData(type: string): any{
  const timeArr = reactive([]);
  let arrLenght = 0;
  if(type == 'hour'){
    arrLenght = 24;
  }else{
    arrLenght = 60;
  }
  for (let i = 0; i < arrLenght; i++) {
    timeArr.push({
      time:i<10?'0'+i:i+'',
      isActive:false,
      flag:type,
      isDisabled:false
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
  format: string): void=>{

  const maxTimeHour = maxTime.split(':')[0];
  const maxTimeMinute = maxTime.split(':')[1];
  const minTimeHour = minTime.split(':')[0];
  const minTimeMinute = minTime.split(':')[1];
  const minTimeSecond = minTime.split(':')[2];

  hourList.map((item,index)=>{
    if(item.time < minTimeHour || item.time > maxTimeHour){
      item.isDisabled = true;
    }
  });

  // 如果为mm:ss格式，限制小时的选择范围
  if(format == 'mm:ss'){
    minuteList.map((item,index)=>{
      if(item.time < minTimeMinute || item.time > maxTimeMinute){
        item.isDisabled = true;
      }
    });
  }else{
    minuteList.map((item,index)=>{
      if(item.time < minTimeMinute){
        item.isDisabled = true;
      }
    });
  }
  secondList.map((item,index)=>{
    if(item.time < minTimeSecond){
      item.isDisabled = true;
    }
  });
};


