import { defineComponent, getCurrentInstance } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useMonthCalendarPanel from '../composables/use-month-calendar-panel';
import { datePickerProPanelProps, DatePickerProPanelProps, YearAndMonthItem } from '../date-picker-pro-types';
import { createI18nTranslate } from '../../../locale/create';
import { monthPickerHeight, yearItemHeight, monthCalendarItemHeight } from '../const';
import { VirtualList } from '../../../virtual-list';

export default defineComponent({
  name: 'MonthCalendarPanel',
  props: datePickerProPanelProps,
  emits: ['selectedDate', 'changeRangeFocusType'],
  setup(props: DatePickerProPanelProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);

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
      const yearItemSlots = {
        item: (year: YearAndMonthItem) => {
          return (
            <div
              class={[ns.e('year-list-item'), year.active && ns.e('year-item-active')]}
              key={year.year}
              onClick={() => handlerSelectYear(year.year)}>
              {year.year}
            </div>
          );
        },
      };

      const monthItemSlots = {
        item: (year: YearAndMonthItem) => {
          return (
            <div class={ns.e('table-month')}>
              <div class={ns.e('table-month-title')}>{year.year + t('year')}</div>
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
                          <span>{t(`month${month}`) || 'm'}</span>
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
        <div class={ns.e('month-calendar-panel')}>
          <VirtualList
            ref={yearScrollRef}
            class={ns.e('year-list')}
            data={yearList.value}
            height={monthPickerHeight}
            itemHeight={yearItemHeight}
            v-slots={yearItemSlots}></VirtualList>
          <div class={ns.e('month-wrapper')}>
            <VirtualList
              ref={monthScrollRef}
              class={ns.e('month-list')}
              data={yearList.value}
              height={monthPickerHeight}
              itemHeight={monthCalendarItemHeight}
              v-slots={monthItemSlots}
              onScroll={handlerMonthScroll}></VirtualList>
          </div>
        </div>
      );
    };
  },
});
