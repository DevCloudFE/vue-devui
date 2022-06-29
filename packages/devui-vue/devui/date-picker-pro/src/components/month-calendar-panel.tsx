import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useMonthCalendarPanel from '../composables/use-month-calendar-panel';
import { datePickerProPanelProps, DatePickerProPanelProps, YearAndMonthItem } from '../date-picker-pro-types';
import { yearMonthsArr } from '../const';

export default defineComponent({
  name: 'MonthCalendarPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');

    const {
      yearScrollRef,
      monthScrollRef,
      yearList,
      monthList,
      handlerSelectYear,
      handlerMonthScroll,
      getMonthItemCls,
      handlerSelectMonth,
    } = useMonthCalendarPanel(props, ctx);

    return () => {
      return (
        <div class={ns.e('month-calendar-panel')}>
          <div ref={yearScrollRef} class={ns.e('year-list')}>
            {yearList.value.map((year: YearAndMonthItem) => (
              <div
                class={[ns.e('year-list-item'), year.active && ns.e('year-item-active')]}
                key={year.year}
                onClick={() => handlerSelectYear(year.year)}>
                {year.year}
              </div>
            ))}
          </div>
          <div class={ns.e('month-wrapper')}>
            <div class={ns.e('month-list')} ref={monthScrollRef} onScroll={handlerMonthScroll}>
              {yearList.value.map((year: YearAndMonthItem) => (
                <div class={ns.e('table-month')}>
                  <div class={ns.e('table-month-title')}>{year.year + '年'}</div>
                  <table class={ns.e('table-month-content')}>
                    <tbody>
                      {monthList.map((season: number[], seasonIndex: number) => (
                        <tr key={seasonIndex}>
                          {season.map((month: number) => (
                            <td
                              key={month}
                              class={getMonthItemCls(year.year, month)}
                              onClick={(e: MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlerSelectMonth(year.year, month);
                              }}>
                              <span>{yearMonthsArr[month - 1] || ''}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
  },
});
