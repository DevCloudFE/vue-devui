import { defineComponent, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useCalendarPanel from '../composables/use-calendar-panel';
import { YearAndMonthItem, datePickerProPanelProps, DatePickerProPanelProps } from '../date-picker-pro-types';
import { createI18nTranslate } from '../../../locale/create';
import { yearListHeight, yearItemHeight, calendarListHeight, calendarItemHeight } from '../const';
import { VirtualList } from '../../../virtual-list';

export default defineComponent({
  name: 'CalendarPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);

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
      handleScrollMonthList,
      isDateSelected,
      isStartDate,
      isInRangeDate,
      isEndDate,
      isDisabled,
    } = useCalendarPanel(props, ctx);
    return () => {
      const yearItemSlots = {
        item: (item: YearAndMonthItem) => {
          return (
            <div class={[ns.em('calendar-panel', 'year-list-item'), item.active && ns.e('year-title-active')]}>
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
                  {t(`month${item.month ? item.month + 1 : 1}`)}
                </div>
              )}
            </div>
          );
        },
      };

      const monthItemSlots = {
        item: (month: YearAndMonthItem) => {
          return (
            <div class={ns.e('table-month')}>
              <div class={ns.e('table-month-title')}>{t('getYearMonthStr')(month.year, (month.month || 0) + 1)}</div>
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
          );
        },
      };

      return (
        <div class={ns.e('calendar-panel')}>
          <VirtualList
            ref={yearScrollRef}
            class={ns.em('calendar-panel', 'year-list')}
            data={yearAndMonthList.value}
            height={yearListHeight}
            itemHeight={yearItemHeight}
            v-slots={yearItemSlots}></VirtualList>
          <div class={ns.em('calendar-panel', 'main')}>
            <table class={ns.e('calendar-table')}>
              <thead>
                <tr class={ns.e('table-week-header')}>
                  {t('getWeekDays')().map((child: string) => (
                    <td>{child}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="7">
                    <VirtualList
                      ref={monthScrollRef}
                      class={ns.e('tbody-wrapper')}
                      data={allMonthList.value}
                      height={calendarListHeight}
                      itemHeight={calendarItemHeight}
                      v-slots={monthItemSlots}
                      onScroll={handleScrollMonthList}></VirtualList>
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
