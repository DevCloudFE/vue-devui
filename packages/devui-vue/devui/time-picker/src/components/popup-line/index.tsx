import { ref, defineComponent, onMounted } from 'vue';
import { usePopupLine } from './composables/use-popup-line';
import { ArrType } from '../../types';
import TimeScroll from '../time-scroll';

import './index.scss';


export default defineComponent({
  name:'DTimeList',
  components:{ TimeScroll },
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
    const timeListDom = ref<Element>();
    const {
      getNewTime,
      activeTimeFun,
      resetTimeValue,
      resetScrollTop
    } = usePopupLine(
      props.hourList as Array<ArrType>,
      props.minuteList as Array<ArrType>,
      props.secondList as Array<ArrType>,
      props.minTime,
      props.maxTime,
      props.format,
      timeListDom,
    );

    const setOutoTime = (time: string)=>{
      resetTimeValue(time);
    };

    const TimeLi = (timeArr: Array<ArrType>): any=>{
      return (
        timeArr.map((item: ArrType, index: number) => {
          return (
            <li
              class={`time-li ${item.flag}Id-${index} ${item.isActive ? 'active-li' : ''} ${item.isDisabled ? 'disabled-li' : ''}`}
              onClick={(e) => { activeTimeFun(e, item, index,); }}
            >
              <span>{item.time}</span>
            </li>
          );
        })
      );
    };

    const TimeUl = (timeList: Array<ArrType>)=>{
      return (
        <div class='time-item' style={{'flex':1}}>
          <TimeScroll>
            <ul class='time-ul'>
              {TimeLi(timeList)}
            </ul>
          </TimeScroll>
        </div>
      );
    };

    const formatTimeUl = ()=>{
      const timeList = {
        'hh':props.hourList,
        'mm':props.minuteList,
        'ss':props.secondList
      };

      const timeFormatArr = (props.format as string).split(':');

      return(
        timeFormatArr.map((timeItme)=>{
          return(
            TimeUl(timeList[timeItme])
          );
        })
      );
    };

    ctx.expose({
      resetScrollTop,setOutoTime,getNewTime
    });

    return ()=>{
      return (
        <div class='devui-time-list' ref={timeListDom}>
          {
            formatTimeUl()
          }
        </div>
      );
    };
  }
});

