import { ref, defineComponent } from 'vue'
import { usePopupLine } from './composables/use-popup-line'
import { ArrType } from '../../types'
import './index.scss'


export default defineComponent({
  name:'TTimeList',
  props:{
    hourList:{
      type:Array,
      default:()=>[]
    },
    minuteList:{
      type:Array,
      default:()=>[]
    },
    secondList:{
      type:Array,
      default:()=>[]
    },
    format:{
      type:String,
      default:'hh:mm:ss'
    },
    minTime:{
      type:String,
      default:'00:00:00'
    },
    maxTime:{
      type:String,
      default:'23:59:59'
    }
  },
  setup(props,ctx,){
    const timeListDom = ref<Element>()
    const {
      getNewTime,
      activeTimeFun,
      resetTimeValue
    } = usePopupLine(
      props.hourList as Array<ArrType>,
      props.minuteList as Array<ArrType>,
      props.secondList as Array<ArrType>,
      props.minTime,
      props.maxTime,
      props.format,
      timeListDom,
    )

    const restScrooTop = ()=>{
      for (let i = 0; i < timeListDom.value.children.length; i++) {
        timeListDom.value.children[i].scrollTop = 0
      }
    }

    const setOutoTime = (time:string)=>{
      resetTimeValue(time)
    }



    const TimeLi = (timeArr:Array<ArrType>):any=>{
      return (
        timeArr.map((item: ArrType, index: number) => {
          return (
            <li
                class={`${item.flag}Id-${index} ${item.isActive ? 'active-li' : ''} ${item.isDisabled ? 'disabled-li' : ''}`}
                onClick={(e) => { activeTimeFun(e, item, index,) }}
              >{item.time}
            </li>
          )
        })      
      )
    }

    const TimeUl = (timeList:Array<ArrType>)=>{
      return (
        <ul class='time-ul' style={{'width':props.format.length>6?'33.33%':'50%'}}> {TimeLi(timeList)}</ul>
      )
    }

    const formatTimeUl = ()=>{
      const timeList = {
      'hh':props.hourList,
      'mm':props.minuteList,
      'ss':props.secondList
      }

      const timeFormatArr = (props.format as string).split(':')
      
      return(
        timeFormatArr.map((timeItme)=>{
          return(
            TimeUl(timeList[timeItme])
          )
        })
      )
    }

    //TODO: 区分浏览器内核,解决firefox中鼠标离开元素不继续滚动的情况
    const selectTimeFun = (e: MouseEvent) => {
      e.stopPropagation()
      console.log(e);
      
      // e.stopPropagation()
      // const ua = navigator.userAgent
      // if (ua.indexOf('Firefox') > -1) {
      //   resetTimeValue(activeTime)
      // }
    }
    
    ctx.expose({
      restScrooTop,setOutoTime,getNewTime
    })

    return ()=>{
      return (
        <div class='devui-time-list' ref={timeListDom}>
          {
            formatTimeUl()
          }
        </div>
      )
    }
  }
})


 