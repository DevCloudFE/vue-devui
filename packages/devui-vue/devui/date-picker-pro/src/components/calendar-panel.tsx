import { defineComponent } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useCalendarPanel from '../composables/use-calendar-panel';
import { yearMonthsArr, weekDaysArr, getYearMonthStr } from '../const';
import { YearAndMonthItem } from '../date-picker-pro-types';

export default defineComponent({
  name: 'CalendarPanel',
  setup() {
    const ns = useNamespace('date-picker-pro');
    const { yearAndMonthList, allMonthList, isListCollapse, handlerSelectDate } = useCalendarPanel();
    return () => {
      return (
        <div class={ns.e('calendar-panel')}>
          <div class={ns.em('calendar-panel', 'year-list')}>
            {yearAndMonthList.value.map((item: YearAndMonthItem, index: number) => (
              <div class={ns.em('calendar-panel', 'year-list-item')} key={index}>
                {!item.isMonth && !isListCollapse.value && <div class={ns.e('year-title')}>{item.year}</div>}
                {!item.isMonth && isListCollapse.value && <div class={ns.e('year-title')}>{item.year}</div>}
                {item.isMonth && <div class={ns.e('month-title')}>{yearMonthsArr[item.month || 0]}</div>}
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
                    <div class={ns.e('tbody-wrapper')}>
                      {allMonthList.value.map((month: YearAndMonthItem, monthIndex: number) => (
                        <div key={monthIndex}>
                          <div class={ns.e('table-month-title')}>{getYearMonthStr(month.year, (month.month || 0) + 1)}</div>
                          <table class={ns.e('table-month-content')}>
                            <tbody>
                              {month.displayWeeks &&
                                month.displayWeeks.map((week, weekIndex: number) => (
                                  <tr class={ns.e('table-week-header')} key={weekIndex}>
                                    {week.map((day, dayIndex: number) => (
                                      <td
                                        key={dayIndex}
                                        class={[day.inMonth && ns.e('table-date')]}
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
