import { ref, defineComponent, PropType, SetupContext } from 'vue';
import { usePopupLine } from './composables/use-popup-line';
import { ArrType, TimeListItem } from '../../types';
import TimeScroll from '../time-scroll';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

import './index.scss';

export default defineComponent({
  name: 'DTimeList',
  components: { TimeScroll },
  props: {
    hourList: {
      type: Array as PropType<Array<ArrType>>,
      default: () => [],
    },
    minuteList: {
      type: Array as PropType<Array<ArrType>>,
      default: () => [],
    },
    secondList: {
      type: Array as PropType<Array<ArrType>>,
      default: () => [],
    },
    format: {
      type: String,
      default: 'hh:mm:ss',
    },
    minTime: {
      type: String,
      default: '00:00:00',
    },
    maxTime: {
      type: String,
      default: '23:59:59',
    },
    itemHeight: {
      type: Number,
      default: 32,
    },
  },
  emits: ['change'],

  setup(props, ctx: SetupContext) {
    const ns = useNamespace('time-list');
    const timeListDom = ref<Element>();
    const { getNewTime, activeTimeFun, resetTimeValue, resetScrollTop } = usePopupLine(
      props.hourList as Array<ArrType>,
      props.minuteList as Array<ArrType>,
      props.secondList as Array<ArrType>,
      props.minTime,
      props.maxTime,
      props.format,
      props.itemHeight,
      timeListDom,
      ctx
    );

    const setOuterTime = (time: string) => {
      resetTimeValue(time);
    };

    const TimeLi = (timeArr: Array<ArrType>) => {
      return timeArr.map((item: ArrType, index: number) => {
        return (
          <li
            class={`time-li ${item.flag}Id-${index} ${item.isActive ? 'active-li' : ''} ${item.isDisabled ? 'disabled-li' : ''}`}
            onClick={(e) => {
              activeTimeFun(e, item, index);
            }}>
            <span>{item.time}</span>
          </li>
        );
      });
    };

    const TimeUl = (timeList: Array<ArrType>) => {
      return (
        <div class="time-item" style={{ flex: 1 }}>
          <TimeScroll>
            <ul class="time-ul">{TimeLi(timeList)}</ul>
          </TimeScroll>
        </div>
      );
    };

    const formatTimeUl = () => {
      const timeList: TimeListItem = {
        hh: props.hourList,
        mm: props.minuteList,
        ss: props.secondList,
      };

      const timeFormatArr = (props.format as string).split(':');

      return timeFormatArr.map((timeItem: string) => {
        return TimeUl(timeList[timeItem as keyof TimeListItem]);
      });
    };

    ctx.expose({
      resetScrollTop,
      setOuterTime,
      getNewTime,
    });

    return () => {
      return (
        <div class={ns.b()} ref={timeListDom}>
          {formatTimeUl()}
        </div>
      );
    };
  },
});
