import { Ref, ref } from 'vue'
import { ArrType } from '../../../types'

const usePopupLine =(
  hourListRef:Array<ArrType>,minuteListRef:Array<ArrType>,secondListRef:Array<ArrType>,
  minTime:string,maxTime:string,format:string,timeListDom:Ref,
  ):any =>{

  const activeTime = ref('00:00:00')
  const activeHour = ref('00')
  const activeMinute = ref('00')
  const activeSecond = ref('00')

  const activeTimeFun = (e:any, item:ArrType, index:number)=>{
    if(item.isDisabled){
      return false
    }else{
      setTimeActive(item,index)
      e.target.parentElement.scrollTop = index * 30
    }
  }


  const setTimeActive = (item:ArrType,index:number)=>{

    let activeTimeList = []
    let acitveTimeValue = ref('')
    if(item.flag == 'hour'){
      activeTimeList = hourListRef
      acitveTimeValue = activeHour
      getItemAstrict(item)
    }else if(item.flag == 'minute'){
      activeTimeList = minuteListRef
      acitveTimeValue = activeMinute
      getItemAstrict(item)
    }else if(item.flag == 'second'){
      activeTimeList = secondListRef
      acitveTimeValue = activeSecond
    }

    activeTimeList.map((tiemItem,tiemeIndex)=>{
      tiemItem.isActive = false
    })
    activeTimeList[index].isActive = true
    acitveTimeValue.value = activeTimeList[index].time


    activeTime.value = `${activeHour.value}:${activeMinute.value}:${activeSecond.value}`
    
    if(activeTime.value < minTime){
      activeTime.value = minTime
      resetTimeValue(minTime)
    }else if(format == 'mm:ss' && `${activeMinute.value}:${activeSecond.value}` > maxTime.slice(3)){
      const newMinTime = minTime.slice(0,3) + maxTime.slice(3)
      resetTimeValue(newMinTime)
    }else if(activeTime.value > maxTime){
      activeTime.value = maxTime
      resetTimeValue(maxTime)
    }
  }

  // 获取最大值 最小值
  const getItemAstrict = (item:ArrType):void=>{
    let min ='00'
    let max ='00'

    const minTimeHour = minTime.split(':')[0]
    const minTimeMinute = minTime.split(':')[1]
    const minTimeSecond = minTime.split(':')[2]

    const maxTimeHour = maxTime.split(':')[0]
    const maxTimeMinute = maxTime.split(':')[1]
    const maxTimeSecond = maxTime.split(':')[2]

    if(item.flag == 'hour'){
      if(item.time == minTimeHour){
        min = minTimeMinute
        // console.log('11')
        setItemAstrict(minuteListRef,min,max)
        activeMinute.value < minTimeMinute && setItemAstrict(secondListRef,minTimeSecond,max)
      }else if ( item.time == maxTimeHour){
        max = maxTimeMinute
        // console.log('22')
        setItemAstrict(minuteListRef,min,max)
        setItemAstrict(secondListRef,min,maxTimeSecond)
      }else{
        // console.log('33')
        setItemAstrict(minuteListRef,min,max)
        setItemAstrict(secondListRef,min,max)
      }
    }
    if(item.flag == 'minute' && format == 'mm:ss'){
      if(item.time == minTimeMinute){
        min = minTimeSecond
        setItemAstrict(secondListRef,min,max)
      }else if(item.time == maxTimeMinute){
        max = maxTimeSecond
        setItemAstrict(secondListRef,min,max)
      } else{
        setItemAstrict(secondListRef,min,max)
      }
    }else if(item.flag == 'minute'){
      if(activeHour.value == minTimeHour && item.time == minTimeMinute){
        min = minTimeSecond
        setItemAstrict(secondListRef,min,max)
        // console.log('44')
      }else if(activeHour.value == maxTimeHour && item.time == maxTimeMinute){
        max = maxTimeSecond
        // console.log('55')
        setItemAstrict(secondListRef,min,max)
      } else{
        // console.log('66')
        setItemAstrict(secondListRef,min,max)
      }
    }

  }
  // 设置最大值  最小值
  const setItemAstrict = (timeArr:Array<ArrType>,min:string,max:string) =>{
    timeArr.map(itme=>{
      if(min !='00' && itme.time < min){
        itme.isDisabled = true
      }else if(max !='00' && itme.time > max){
        itme.isDisabled = true
      }else{
        itme.isDisabled = false
      }
    })
  }

  // 指定时间
  const resetTimeValue = (time:string)=>{
    const timeValueArr = time.split(':')
    const minTiveArr = minTime.split(':')

    let hh = 0
    let mm = 0
    let ss = 0

    if(format == 'hh:mm:ss'){

      hh = parseInt(timeValueArr[0])
      mm = parseInt(timeValueArr[1])
      ss = parseInt(timeValueArr[2])

      timeListDom.value.children[0].scrollTop = hh * 30
      timeListDom.value.children[1].scrollTop = mm * 30
      timeListDom.value.children[2].scrollTop = ss * 30

      activeHour.value = timeValueArr[0]
      activeMinute.value = timeValueArr[1]
      activeSecond.value = timeValueArr[2]

      resetTimeActive(hourListRef,timeValueArr[0])
      resetTimeActive(minuteListRef,timeValueArr[1])
      resetTimeActive(secondListRef,timeValueArr[2])

      resetTimeAstrict(hourListRef,activeHour.value)
      resetTimeAstrict(minuteListRef,activeMinute.value)

    }
    else if(format == 'mm:hh:ss'){
      hh = parseInt(timeValueArr[0])
      mm = parseInt(timeValueArr[1])
      ss = parseInt(timeValueArr[2])

      timeListDom.value.children[0].scrollTop = mm * 30
      timeListDom.value.children[1].scrollTop = hh * 30
      timeListDom.value.children[2].scrollTop = ss * 30

      activeHour.value = timeValueArr[0]
      activeMinute.value = timeValueArr[1]
      activeSecond.value = timeValueArr[2]

      resetTimeActive(hourListRef,timeValueArr[0])
      resetTimeActive(minuteListRef,timeValueArr[1])
      resetTimeActive(secondListRef,timeValueArr[2])

      resetTimeAstrict(hourListRef,activeHour.value)
      resetTimeAstrict(minuteListRef,activeMinute.value)

    }else if(format == 'hh:mm'){

      hh = parseInt(timeValueArr[0])
      mm = parseInt(timeValueArr[1])

      timeListDom.value.children[0].scrollTop = hh * 30
      timeListDom.value.children[1].scrollTop = mm * 30

      activeHour.value = timeValueArr[0]
      activeMinute.value = timeValueArr[1]

      resetTimeActive(hourListRef,timeValueArr[0])
      resetTimeActive(minuteListRef,timeValueArr[1])

      resetTimeAstrict(hourListRef,activeHour.value)

    }else if(format == 'mm:ss'){
      
      mm = parseInt(timeValueArr[1])
      ss = parseInt(timeValueArr[2])

      timeListDom.value.children[0].scrollTop = mm * 30
      timeListDom.value.children[1].scrollTop = ss * 30

      activeHour.value = minTiveArr[0]
      activeMinute.value = timeValueArr[1]
      activeSecond.value = timeValueArr[2]

      resetTimeActive(minuteListRef,timeValueArr[1])
      resetTimeActive(secondListRef,timeValueArr[2])

      resetTimeAstrict(minuteListRef,activeMinute.value)
    }
    // activeTime.value = `${activeHour.value}:${activeMinute.value}:${activeSecond.value}`

  }

  // 解决清空之后，再次打开 最大值最小值限制范围失效
  const resetTimeAstrict = (timeArr:Array<ArrType>,time:string) =>{
    timeArr.map(item=>{
      if(item.time == time){
        getItemAstrict(item)
      } 
    })
  }

  // 指定选中
  const resetTimeActive = (timeArr:Array<ArrType>,itemValue:string) =>{
    timeArr.map( item =>{
      if(item.time == itemValue){
        item.isActive = true
      }else{
        item.isActive = false
      }
    })
  }

  // 暂时返回选中  时 分 秒 
  const getNewTime = ()=>{
    return { activeTime,activeHour,activeMinute,activeSecond }
  }

  return{
    activeTime,
    activeHour,
    activeMinute,
    activeSecond,
    activeTimeFun,
    resetTimeValue,
    getNewTime
  }
}

export { 
  usePopupLine
}



