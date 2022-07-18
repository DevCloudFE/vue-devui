import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useYearCalendarPanel from '../composables/use-year-calendar-panel';
import { datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';
import { yearPickerHeight, yearCalendarItemHeight } from '../const';
import { VirtualList } from '../../../virtual-list';

export default defineComponent({
  name: 'YearCalendarPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');

    const { yarListScrollRef, yearList, getYearItemCls, handlerSelectYear } = useYearCalendarPanel(props, ctx);

    return () => {
      const yearItemSlots = {
        item: (years: number[]) => {
          return (
            <div class={ns.e('year-list-item')}>
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
          );
        },
      };
      return (
        <div class={ns.e('year-calendar-panel')}>
          <VirtualList
            ref={yarListScrollRef}
            class={ns.e('year-list')}
            data={yearList.value}
            height={yearPickerHeight}
            itemHeight={yearCalendarItemHeight}
            v-slots={yearItemSlots}></VirtualList>
        </div>
      );
    };
  },
});
