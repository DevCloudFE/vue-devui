import { computed, defineComponent, ref, watchEffect } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import CalendarPanel from './calendar-panel';
import TimerPickerPanel from './time-picker-panel';
import { Button } from '../../../button';
import { datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  name: 'DatePickerProPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const currentDate = ref<Dayjs>();
    const timeData = ref<string>('');

    const getSelectedDate = (date: Dayjs) => {
      //  日期加上时间
      const curDate = date.toDate().toLocaleDateString();
      const curDateTime = `${curDate} ${timeData.value || '00:00:00'}`;
      return dayjs(curDateTime).locale('zh-cn');
    };

    const onSelectedDate = (date: Dayjs) => {
      currentDate.value = date;
      if (!props.showTime) {
        ctx.emit('selectedDate', date, true);
      } else {
        ctx.emit('selectedDate', getSelectedDate(date), false);
      }
    };

    const timeFormat = computed(() => {
      return props.format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, '').trim();
    });

    watchEffect(() => {
      if (props.dateValue) {
        const date = Array.isArray(props.dateValue) ? props.dateValue[0] : props.dateValue;
        timeData.value = date.format(timeFormat.value);
      }
    });

    const handlerConfirm = () => {
      if (!currentDate.value) {
        return;
      }
      ctx.emit('selectedDate', getSelectedDate(currentDate.value), true);
    };

    return () => {
      return (
        <div class={ns.e('panel')}>
          <div class={ns.e('panel-content')}>
            <CalendarPanel
              dateValue={props.dateValue}
              format={props.format}
              visible={props.visible}
              onSelectedDate={onSelectedDate}></CalendarPanel>
            {props.showTime && <TimerPickerPanel visible={props.visible} bindData={timeData.value} />}
          </div>
          {props.showTime && (
            <div class={ns.e('panel-footer')}>
              <Button variant="solid" onClick={handlerConfirm}>
                确定
              </Button>
            </div>
          )}
        </div>
      );
    };
  },
});
