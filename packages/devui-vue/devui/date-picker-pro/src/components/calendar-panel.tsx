import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useCalendarPanel from '../composables/use-calendar-panel';
import { yearMonthsArr, weekDaysArr, getYearMonthStr } from '../const';
import { YearAndMonthItem, datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';

export default defineComponent({
  name: 'CalendarPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const ns = useNamespace('date-picker-pro');
    const {
      yearScrollRef,
      monthScrollRef,
      yearAndMonthList,
      allMonthList,
      isListCollapse,
      handlerSelectDate,
      handlerYearCollapse,
      handlerClickMonth,
      handleScrollYearList,
      handleScrollMonthList,
      isDateSelected,
      isStartDate,
      isInRangeDate,
      isEndDate,
      isDisabled,
    } = useCalendarPanel(props, ctx);
    return () => {
      return (
        <div class={ns.e('calendar-panel')}>
          <div ref={yearScrollRef} class={ns.em('calendar-panel', 'year-list')} onScroll={handleScrollYearList}>
            {yearAndMonthList.value.map((item: YearAndMonthItem, index: number) => (
              <div class={[ns.em('calendar-panel', 'year-list-item'), item.active && ns.e('year-title-active')]} key={index}>
                {!item.isMonth && !isListCollapse.value && (
                  <div class={ns.e('year-title')} onClick={() => handlerYearCollapse()}>
                    {item.year}
                  </div>
                )}
                {!item.isMonth && isListCollapse.value && (
                  <div
                    class={ns.e('year-title')}
                    onClick={() => {
                      handlerClickMonth(item.year, 0);
                    }}>
                    {item.year}
                  </div>
                )}
                {item.isMonth && (
                  <div
                    class={ns.e('month-title')}
                    onClick={() => {
                      handlerClickMonth(item.year, item.month);
                    }}>
                    {yearMonthsArr[item.month || 0]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div class={ns.em('calendar-panel', 'main')}>
            <table class={ns.e('calendar-table')}>
              <thead>
                <tr class={ns.e('table-week-header')}>
                  {weekDaysArr.map((child) => (
                    <td>{child}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="7">
                    <div ref={monthScrollRef} class={ns.e('tbody-wrapper')} onScroll={handleScrollMonthList}>
                      {allMonthList.value.map((month: YearAndMonthItem, monthIndex: number) => (
                        <div class={ns.e('table-month')} key={monthIndex}>
                          <div class={ns.e('table-month-title')}>{getYearMonthStr(month.year, (month.month || 0) + 1)}</div>
                          <table class={ns.e('table-month-content')}>
                            <tbody>
                              {month.displayWeeks &&
                                month.displayWeeks.map((week, weekIndex: number) => (
                                  <tr class={ns.e('table-week-header')} key={weekIndex}>
                                    {week.map((day, dayIndex: number) => (
                                      <td
                                        key={dayIndex}
                                        class={[
                                          day.inMonth && ns.e('table-date'),
                                          isDateSelected(day.date) && ns.e('table-date-selected'),
                                          day.isToday && ns.e('table-date-today'),
                                          isStartDate(day.date) && ns.e('table-date-start'),
                                          isInRangeDate(day.date) && ns.e('table-date-in-range'),
                                          isEndDate(day.date) && ns.e('table-date-end'),
                                          isDisabled(day.date) && ns.e('table-date-disabled'),
                                        ]}
                                        onClick={(e: MouseEvent) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handlerSelectDate(day);
                                        }}>
                                        <span>{day.inMonth ? day.day : ''}</span>
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    };
  },
});
