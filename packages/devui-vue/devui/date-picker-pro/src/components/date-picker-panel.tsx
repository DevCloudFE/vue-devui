import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import CalendarPanel from './calendar-panel';
import { datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';
import type { Dayjs } from 'dayjs';

export default defineComponent({
  name: 'DatePickerProPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const onSelectedDate = (date: Dayjs) => {
      ctx.emit('selectedDate', date);
    };

    return () => {
      return (
        <div class={ns.e('panel')}>
          <div class={ns.e('panel-content')}>
            <CalendarPanel dateValue={props.dateValue} format={props.format} onSelectedDate={onSelectedDate}></CalendarPanel>
          </div>
        </div>
      );
    };
  },
});
