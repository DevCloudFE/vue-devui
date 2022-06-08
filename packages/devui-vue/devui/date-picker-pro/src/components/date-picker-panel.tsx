import { defineComponent } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import CalendarPanel from './calendar-panel';
export default defineComponent({
  name: 'DatePickerProPanel',
  setup() {
    const ns = useNamespace('date-picker-pro');

    return () => {
      return (
        <div class={ns.e('panel')}>
          <div class={ns.e('panel-content')}>
            <CalendarPanel></CalendarPanel>
          </div>
        </div>
      );
    };
  },
});
