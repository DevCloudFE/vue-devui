import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import CalendarPanel from './calendar-panel';
import TimerPickerPanel from './time-picker-panel';
import { Button } from '../../../button';
import YearCalendarPanel from './year-calendar-panel';
import { datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';
import useDatePicker from '../composables/use-date-picker';

export default defineComponent({
  name: 'DatePickerProPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const { calendarPanelRef, timeData, onSelectedDate, handlerConfirm, handlerSelectedTime, onChangeRangeFocusType } = useDatePicker(
      props,
      ctx
    );

    return () => {
      return (
        <div class={ns.e('panel')}>
          <div class={ns.e('panel-content')}>
            {props.type === 'date' && (
              <CalendarPanel
                ref={calendarPanelRef}
                {...props}
                onSelectedDate={onSelectedDate}
                onChangeRangeFocusType={onChangeRangeFocusType}></CalendarPanel>
            )}

            {props.type === 'date' && props.showTime && (
              <TimerPickerPanel visible={props.visible} bindData={timeData.value} onSelectedTime={handlerSelectedTime} />
            )}
            {props.type === 'year' && (
              <YearCalendarPanel
                {...props}
                onSelectedDate={onSelectedDate}
                onChangeRangeFocusType={onChangeRangeFocusType}></YearCalendarPanel>
            )}
            {ctx.slots?.rightArea && <div class={ns.e('panel-right-area')}>{ctx.slots?.rightArea()}</div>}
          </div>
          {ctx.slots?.footer && <div class={ns.e('panel-footer')}>{ctx.slots?.footer()}</div>}
          {!ctx.slots?.footer && props.showTime && (
            <div class={ns.e('panel-footer')}>
              <div class={ns.e('panel-footer-center')}>
                <Button variant="solid" onClick={handlerConfirm}>
                  确定
                </Button>
              </div>
            </div>
          )}
        </div>
      );
    };
  },
});
