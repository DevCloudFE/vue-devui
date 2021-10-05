import { Ref, ref } from 'vue'
import { TimeObj } from '../types'
import { getPositionFun } from '../utils'

export default function usePicker(
  hh:Ref,mm:Ref,ss:Ref,minTime:string,format:string,
  autoOpen:boolean,disabled:boolean,value:string
  ):any{
  const isActive = ref(false)
  const showPopup = ref(false)
  const devuiTimePicker = ref()
  const inputDom = ref()
  const left = ref(-100)
  const top = ref(-100)
  const timePopupDom = ref()
  const timePickerValue = ref('')
  const showClearIcon = ref(false)
  const firsthandActiveTime = ref(`${hh.value}:${mm.value}:${ss.value}`)
  const vModeValue = ref(value)

  const getPopupPosition = ()=>{
    getPositionFun(devuiTimePicker.value,left,top)
  }

  const clickVerifyFun = (e: any) => {
    e.stopPropagation()
    isActive.value = false
    showPopup.value = false

    if(disabled) return

    const path = (e.composedPath && e.composedPath()) || e.path
    path.map( item => {
      if (item == devuiTimePicker.value) {
        if(firsthandActiveTime.value == '00:00:00'){
          vModeValue.value == ''
            ? vModeValue.value = '00:00:00' 
            : ''

          vModeValue.value > minTime 
            ? firsthandActiveTime.value = vModeValue.value 
            : firsthandActiveTime.value = minTime
        }
        setInputValue()
        isActive.value = true
        showPopup.value = true
      }
    })
  }

  const getTimeValue = (e:MouseEvent)=>{
    e.stopPropagation()
    if(showPopup.value){
      hh.value = timePopupDom.value.changTimeData().activeHour.value
      mm.value = timePopupDom.value.changTimeData().activeMinute.value
      ss.value = timePopupDom.value.changTimeData().activeSecond.value
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`
      setInputValue()
    }
  }

  const setInputValue = ()=> {
    if(format == 'hh:mm:ss'){
      vModeValue.value = `${hh.value}:${mm.value}:${ss.value}`
    }else if(format == 'mm:hh:ss'){
      vModeValue.value = `${mm.value}:${hh.value}:${ss.value}`
    }else if(format == 'hh:mm'){
      vModeValue.value = `${hh.value}:${mm.value}`
    }else if(format == 'mm:ss'){
      vModeValue.value = `${mm.value}:${ss.value}`
    }
  }

  const clearAll = (e:MouseEvent)=>{
    e.stopPropagation()
    showPopup.value = false

    if(minTime != '00:00:00'){
      const minTimeArr = minTime.split(':')
      hh.value = minTimeArr[0]
      mm.value = minTimeArr[1]
      ss.value = minTimeArr[2]
    }else{
      hh.value = '00'
      mm.value = '00'
      ss.value = '00'
    }
    firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`
    setInputValue()
  }

  const isOutOpen =()=>{
    if(autoOpen){
      
      const timeArr = vModeValue.value.split(':')
      hh.value = timeArr[0]
      mm.value = timeArr[1]
      ss.value = timeArr[2]

      firsthandActiveTime.value = vModeValue.value
      setInputValue()
      isActive.value = true
      showPopup.value = autoOpen
    }
  }

  // slot -- 选择时间
  const chooseTime = (slotTime:TimeObj) => {
    if (slotTime.type) {
      if (slotTime.type.toLowerCase() == 'hh') {
        hh.value = slotTime.time
      } else if (slotTime.type.toLowerCase() == 'mm') {
        mm.value = slotTime.time
      } else if (slotTime.type.toLowerCase() == 'ss') {
        ss.value = slotTime.time
      }
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`
      setInputValue()
    } else {
      const timeArr = slotTime.time.split(':')
      hh.value = timeArr[0]
      mm.value = timeArr[1]
      ss.value = timeArr[2]
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`
      setInputValue()
    }
  }

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
    setInputValue,
    getTimeValue,
    clickVerifyFun,
    isOutOpen,
    clearAll,
    chooseTime
  }
}