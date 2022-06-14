import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import CalendarPanel from './calendar-panel';
import TimerPickerPanel from './time-picker-panel';
import { Button } from '../../../button';
import { datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';
import useDatePicker from '../composables/use-date-picker';

export default defineComponent({
  name: 'DatePickerProPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const { calendarPanelRef, timeData, onSelectedDate, handlerConfirm, handlerSelectedTime, onChangeRangeType } = useDatePicker(
      props,
      ctx
    );

    return () => {
      return (
        <div class={ns.e('panel')}>
          <div class={ns.e('panel-content')}>
            <CalendarPanel
              ref={calendarPanelRef}
              dateValue={props.dateValue}
              format={props.format}
              visible={props.visible}
              showTime={props.showTime}
              isRangeType={props.isRangeType}
              onSelectedDate={onSelectedDate}
              onChangeRangeType={onChangeRangeType}
              focusType={props.focusType}></CalendarPanel>
            {props.showTime && <TimerPickerPanel visible={props.visible} bindData={timeData.value} onSelectedTime={handlerSelectedTime} />}
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
