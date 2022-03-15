import { defineComponent, reactive, ref,watch ,onMounted} from 'vue';
import { initializeTimeData,setTimeAstrict } from '../../utils';
import TimeList from '../popup-line/index';
import { Button } from '../../../../button/index';

import './index.scss';
export default defineComponent({
  name:'DTimePopup',
  components:{
    TimeList,Button
  },
  props:{
    showPopup:{
      type:Boolean,
      default:false
    },
    popupTop:{
      type:Number,
      default:-100
    },
    popupLeft:{
      type:Number,
      default:-100
    },
    popupWidth:{
      type:Number,
      default:300
    },
    popupFormat:{
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
    },
    bindData:{
      type:String,
      default:'00:00:00'
    }
  },
  emits:['subData'],
  setup(props,ctx){
    const popupDome = ref<Node>();
    const timeListDom = ref();
    const hourList = initializeTimeData('hour');
    const minuteList = initializeTimeData('minute');
    const secondList = initializeTimeData('second');

    onMounted(()=>{
      setTimeAstrict(hourList,minuteList,secondList,props.minTime,props.maxTime,props.popupFormat);
    });

    watch(()=>[props.showPopup,props.bindData],([showPopup,newTimeVal],[oldShowPopup,oldTimeVal])=>{
      if(showPopup ||  newTimeVal != oldTimeVal){
        timeListDom.value.setOutoTime(newTimeVal);
      }else{
        timeListDom.value.resetScrollTop();
      }
    });

    const changTimeData = ()=>{
      return timeListDom.value.getNewTime();
    };

    const subDataFun = (e: MouseEvent)=>{
      e.stopPropagation();
      ctx.emit('subData');
    };

    ctx.expose({
      changTimeData
    });

    return()=>{
      return(
        <>
          <div ref={popupDome}
            class={`devui-time-popup ${props.showPopup ? 'devui-show-time-popup' : ''}`}
            style={{'width': props.popupWidth + 'px','top':props.popupTop+'px','left':props.popupLeft+'px'}}>
            <TimeList
              ref={timeListDom}
              hourList={hourList}
              minuteList={minuteList}
              secondList={secondList}
              minTime={props.minTime}
              maxTime={props.maxTime}
              format={props.popupFormat}
            />

            <div class="devui-time-popup-btn" >
              <div class='popup-slots'>
                {
                  ctx.slots.default?.()
                }
              </div>
              <div onClick={subDataFun}>
                <Button variant="common">确定</Button>
              </div>

            </div>
          </div>
        </>
      );
    };
  }
});

