import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useYearCalendarPanel from '../composables/use-year-calendar-panel';
import { datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';

export default defineComponent({
  name: 'YearCalendarPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');

    const { yarListScrollRef, yearList, getYearItemCls, handlerSelectYear } = useYearCalendarPanel(props, ctx);

    return () => {
      return (
        <div class={ns.e('year-calendar-panel')}>
          <div ref={yarListScrollRef} class={ns.e('year-list')}>
            {yearList.value.map((years: [], index: number) => (
              <div class={ns.e('year-list-item')} key={index}>
                {years.map((year: number) => (
                  <div
                    key={year}
                    class={getYearItemCls(year)}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlerSelectYear(year);
                    }}>
                    {year}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    };
  },
});
