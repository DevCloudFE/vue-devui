import { mount } from '@vue/test-utils';
import DDatePickerPro from '../src/date-picker-pro';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const monthPanelClass = ns.e('month-calendar-panel');
const yearListClass = ns.e('year-list');
const yearItemClass = ns.e('year-list-item');
const monthListClass = ns.e('month-list');
const monthItemClass = ns.e('table-month');
const monthsClass = ns.e('month-item');

const noDotNs = useNamespace('date-picker-pro', false);
const noDotYearActiveClass = noDotNs.e('year-item-active');
const noDotMonthThisMonthClass = noDotNs.e('this-month');
const noDotMonthActiveMonthClass = noDotNs.e('month-active');
const noDotMonthStartMonthClass = noDotNs.e('month-start');
const noDotMonthEndMonthClass = noDotNs.e('month-end');
const noDotMonthDisabledClass = noDotNs.e('month-disabled');

const rangeDatePickerNs = useNamespace('range-date-picker-pro', true);
const rangeBaseClass = rangeDatePickerNs.b();

describe('date-picker-pro year type test', () => {
  it('year picker init render and select year', async () => {
    const datePickerProValue = ref<Date>();
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="month"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(monthPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearList = pickerPanel.find(yearListClass);
    expect(yearList.exists()).toBeTruthy();
    const yearListItems = yearList.findAll(yearItemClass);
    expect(yearListItems.length).toBe(51);
    expect(yearListItems[25].classes().includes(noDotYearActiveClass)).toBe(true);

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const monthList = pickerPanel.find(monthListClass);
    expect(yearList.exists()).toBeTruthy();
    const monthListItems = monthList.findAll(monthItemClass);
    expect(monthListItems.length).toBe(51);
    const months = monthListItems[25].findAll(monthsClass);
    expect(months.length).toBe(12);
    expect(months[month].classes().includes(noDotMonthThisMonthClass)).toBe(true);
    await months[month].trigger('click');
    expect(datePickerProValue.value?.getFullYear()).toBe(year);
    expect(datePickerProValue.value?.getMonth()).toBe(month);
    expect(input.element.value).toBe(`${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);

    wrapper.unmount();
  });

  it('year picker v-model test', async () => {
    const datePickerProValue = ref<Date | string>(new Date());
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="month"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(monthPanelClass);
    const monthItems = pickerPanel.findAll(monthItemClass);

    const month = new Date().getMonth();
    const monthItem = monthItems[25].findAll(monthsClass);
    expect(monthItem[month].classes().includes(noDotMonthActiveMonthClass)).toBe(true);

    wrapper.unmount();
  });

  it('year picker calendarRange limitDateRange test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const limitDateRange = ref<Date[]>([new Date(new Date().getFullYear(), 1, 1), new Date(new Date().getFullYear(), 8, 1)]);
    const wrapper = mount({
      setup() {
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={[2000, 2050]}
            limitDateRange={limitDateRange.value}
            type="month"></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(monthPanelClass);
    const yearItems = pickerPanel.findAll(yearItemClass);
    expect(yearItems.length).toBe(51);

    const year = new Date().getFullYear() - 2000;
    const monthItems = pickerPanel.findAll(monthItemClass);
    expect(monthItems.length).toBe(51);
    const months = monthItems[year].findAll(monthsClass);
    expect(months[1].classes().includes(noDotMonthDisabledClass)).toBe(false);
    expect(months[8].classes().includes(noDotMonthDisabledClass)).toBe(false);
    expect(months[0].classes().includes(noDotMonthDisabledClass)).toBe(true);
    expect(months[9].classes().includes(noDotMonthDisabledClass)).toBe(true);

    await months[0].trigger('click');
    expect(input.element.value).toBe('');

    wrapper.unmount();
  });

  it('year range picker init render and select year', async () => {
    const datePickerProValue = ref<Date[]>([]);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} type="month"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(rangeBaseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    expect(inputs.length).toBe(2);
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(monthPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearList = pickerPanel.find(yearListClass);
    expect(yearList.exists()).toBeTruthy();
    const yearListItems = yearList.findAll(yearItemClass);
    expect(yearListItems.length).toBe(51);
    expect(yearListItems[25].classes().includes(noDotYearActiveClass)).toBe(true);

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const monthList = pickerPanel.find(monthListClass);
    expect(yearList.exists()).toBeTruthy();
    const monthListItems = monthList.findAll(monthItemClass);
    expect(monthListItems.length).toBe(51);
    const months = monthListItems[25].findAll(monthsClass);
    expect(months.length).toBe(12);
    expect(months[month].classes().includes(noDotMonthThisMonthClass)).toBe(true);
    await months[month].trigger('click');

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    const newMonths = monthListItems[26].findAll(monthsClass);
    await newMonths[month].trigger('click');
    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    expect(datePickerProValue.value[0]?.getFullYear()).toBe(year);
    expect(datePickerProValue.value[0]?.getMonth()).toBe(month);
    expect(datePickerProValue.value[1]?.getFullYear()).toBe(year + 1);
    expect(datePickerProValue.value[1]?.getMonth()).toBe(month);
    expect(inputs[0].element.value).toBe(`${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);
    expect(inputs[1].element.value).toBe(`${year + 1}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);

    wrapper.unmount();
  });

  it('year range picker v-model test', async () => {
    const datePickerProValue = ref<(Date | string)[]>([
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear() + 1, 0, 1),
    ]);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} type="month"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(rangeBaseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(monthPanelClass);
    const monthItems = pickerPanel.findAll(monthItemClass);
    const startMonths = monthItems[25].findAll(monthsClass);
    const endMonths = monthItems[26].findAll(monthsClass);

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    expect(inputs[0].element.value).toBe(`${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);
    expect(inputs[1].element.value).toBe(`${year + 1}-01`);
    expect(startMonths[month].classes().includes(noDotMonthStartMonthClass)).toBe(true);
    expect(endMonths[0].classes().includes(noDotMonthEndMonthClass)).toBe(true);

    wrapper.unmount();
  });
});
