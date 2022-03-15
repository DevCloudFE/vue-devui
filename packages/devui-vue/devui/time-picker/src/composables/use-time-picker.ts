import { Ref, ref } from 'vue';
import { TimeObj } from '../types';
import { getPositionFun } from '../utils';

export default function useTimePicker(
  hh: Ref,mm: Ref,ss: Ref,minTime: string,maxTime: string,format: string,
  autoOpen: boolean,disabled: boolean,value: string
): any{
  const isActive = ref(false);
  const showPopup = ref(false);
  const devuiTimePicker = ref();
  const inputDom = ref();
  const left = ref(-100);
  const top = ref(-100);
  const timePopupDom = ref();
  const timePickerValue = ref('');
  const showClearIcon = ref(false);
  const firsthandActiveTime = ref(`${hh.value}:${mm.value}:${ss.value}`);
  const vModeValue = ref(value);

  const getPopupPosition = ()=>{
    getPositionFun(devuiTimePicker.value,left,top);
  };

  const clickVerifyFun = (e: any) => {
    e.stopPropagation();
    isActive.value = false;
    showPopup.value = false;

    if(disabled) {return;}

    const path = (e.composedPath && e.composedPath()) || e.path;
    const inInputDom = path.includes(devuiTimePicker.value);
    inInputDom && mouseInIputFun();
  };

  const mouseInIputFun = ()=>{
    if(firsthandActiveTime.value == '00:00:00'){

      const vModelValueArr = value.split(':');
      const minTimeValueArr = minTime.split(':');
      const maxTimeValueArr = maxTime.split(':');

      vModeValue.value == ''
        ? vModeValue.value = '00:00:00'
        : '';

      if(value > minTime && value < maxTime){
        firsthandActiveTime.value = value;
        setInputValue(vModelValueArr[0],vModelValueArr[1],vModelValueArr[2]);
      }else if(value > maxTime){
        firsthandActiveTime.value = maxTime;
        setInputValue(maxTimeValueArr[0],maxTimeValueArr[1],maxTimeValueArr[2]);
      }else{
        firsthandActiveTime.value = minTime;
        setInputValue(minTimeValueArr[0],minTimeValueArr[1],minTimeValueArr[2]);
      }
    }
    isActive.value = true;
    showPopup.value = true;
  };

  /**
   * 判断v-model 绑定的时间是否超出 最大值 最小值 范围
   * 如果带有格式化 ， 将执行格式化
   *  */
  const vModelIsBeyond = ()=>{
    if(vModeValue.value != '' && vModeValue.value < minTime){
      vModeValue.value = minTime;
    }else if(vModeValue.value != '' && vModeValue.value > maxTime){
      vModeValue.value = maxTime;
    }

    const vModelValueArr = vModeValue.value.split(':');
    vModeValue.value && setInputValue(vModelValueArr[0],vModelValueArr[1],vModelValueArr[2]);

  };


  const getTimeValue = (e: MouseEvent)=>{
    e.stopPropagation();
    if(showPopup.value){
      hh.value = timePopupDom.value.changTimeData().activeHour.value;
      mm.value = timePopupDom.value.changTimeData().activeMinute.value;
      ss.value = timePopupDom.value.changTimeData().activeSecond.value;
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
      setInputValue(hh.value,mm.value,ss.value);
    }
  };

  const setInputValue = (hh: string,mm: string,ss: string)=> {
    if(format == 'hh:mm:ss'){
      vModeValue.value = `${hh}:${mm}:${ss}`;
    }else if(format == 'mm:hh:ss'){
      vModeValue.value = `${mm}:${hh}:${ss}`;
    }else if(format == 'hh:mm'){
      vModeValue.value = `${hh}:${mm}`;
    }else if(format == 'mm:ss'){
      vModeValue.value = `${mm}:${ss}`;
    }
  };

  const clearAll = (e: MouseEvent)=>{
    e.stopPropagation();
    showPopup.value = false;

    if(minTime != '00:00:00'){
      const minTimeArr = minTime.split(':');
      hh.value = minTimeArr[0];
      mm.value = minTimeArr[1];
      ss.value = minTimeArr[2];
    }else{
      hh.value = '00';
      mm.value = '00';
      ss.value = '00';
    }
    firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
    setInputValue(hh.value,mm.value,ss.value);
  };

  const isOutOpen =()=>{
    if(autoOpen){

      const timeArr = vModeValue.value.split(':');
      hh.value = timeArr[0];
      mm.value = timeArr[1];
      ss.value = timeArr[2];

      firsthandActiveTime.value = vModeValue.value;

      setInputValue(hh.value,mm.value,ss.value);

      isActive.value = true;
      showPopup.value = autoOpen;
    }
  };

  // slot -- 选择时间
  const chooseTime = (slotTime: TimeObj) => {
    if (slotTime.type) {
      if (slotTime.type.toLowerCase() == 'hh') {
        hh.value = slotTime.time;
      } else if (slotTime.type.toLowerCase() == 'mm') {
        mm.value = slotTime.time;
      } else if (slotTime.type.toLowerCase() == 'ss') {
        ss.value = slotTime.time;
      }
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
      setInputValue(hh.value,mm.value,ss.value);
    } else {
      const timeArr = slotTime.time.split(':');
      hh.value = timeArr[0];
      mm.value = timeArr[1];
      ss.value = timeArr[2];
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
      setInputValue(hh.value,mm.value,ss.value);
    }
  };

  return {
    isActive,
    showPopup,
    devuiTimePicker,
    timePickerValue,
    inputDom,
    timePopupDom,
    left,top,
    showClearIcon,
    firsthandActiveTime,
    vModeValue,
    getPopupPosition,
    getTimeValue,
    clickVerifyFun,
    isOutOpen,
    vModelIsBeyond,
    clearAll,
    chooseTime
  };
}
