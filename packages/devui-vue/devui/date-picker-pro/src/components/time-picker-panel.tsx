import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { timeArr } from '../const';
import DTimeList from '../../../time-picker/src/components/popup-line';
import useTimePickerPanel from '../composables/use-time-picker-panel';
import { TimerPickerPanelProps, timerPickerPanelProps } from '../date-picker-pro-types';

export default defineComponent({
  name: 'TimerPickerPanel',
  props: timerPickerPanelProps,
  emits: ['selectedTime'],
  setup(props: TimerPickerPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const { timeListDom, hourList, minuteList, secondList, handlerTimeSelected } = useTimePickerPanel(props, ctx);

    return () => {
      return (
        <div class={ns.e('panel-time')}>
          <div class={ns.em('panel-time', 'title')}>
            {timeArr.map((child) => (
              <span class={ns.em('panel-time', 'title-item')}> {child}</span>
            ))}
          </div>
          <div class={ns.em('panel-time', 'content')}>
            <DTimeList
              ref={timeListDom}
              hourList={hourList}
              minuteList={minuteList}
              secondList={secondList}
              itemHeight={30}
              onChange={handlerTimeSelected}></DTimeList>
          </div>
        </div>
      );
    };
  },
});
