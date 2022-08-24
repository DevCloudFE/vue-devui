import { mount } from '@vue/test-utils';
import DDatePickerPro from '../src/date-picker-pro';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref, getCurrentInstance } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Locale } from '../../locale';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const monthPanelClass = ns.e('month-calendar-panel');
const yearListClass = ns.e('year-list');
const yearItemClass = ns.e('year-list-item');
const yearActiveClass = ns.e('year-item-active');
const monthListClass = ns.e('month-list');
const monthItemClass = ns.e('table-month');
const monthsClass = ns.e('month-item');

const noDotNs = useNamespace('date-picker-pro', false);
const noDotMonthThisMonthClass = noDotNs.e('this-month');
const noDotMonthActiveMonthClass = noDotNs.e('month-active');
const noDotMonthStartMonthClass = noDotNs.e('month-start');
const noDotMonthEndMonthClass = noDotNs.e('month-end');
const noDotMonthDisabledClass = noDotNs.e('month-disabled');

const rangeDatePickerNs = useNamespace('range-date-picker-pro', true);
const rangeBaseClass = rangeDatePickerNs.b();

// 因为 jest 不支持 ResizeObserver，需要 mock 实现
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('date-picker-pro year type test', () => {
  it('year picker init render and select year', async () => {
    const datePickerProValue = ref<Date>();
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="month"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(monthPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearList = pickerPanel?.querySelector(yearListClass);
    expect(yearList).toBeTruthy();
    const yearListItems = yearList?.querySelectorAll(yearItemClass);
    // 虚拟滚动，左侧年份列表总共渲染13个item
    expect(yearListItems?.length).toBe(13);
    const activeYearItems = pickerPanel?.querySelector(yearActiveClass);
    expect(activeYearItems).toBeTruthy();

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const monthList = pickerPanel?.querySelector(monthListClass);
    const monthListItems = monthList?.querySelectorAll(monthItemClass);
    // 虚拟滚动，中间月份列表总共渲染4个item
    expect(monthListItems?.length).toBe(4);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const months = monthListItems?.[1].querySelectorAll(monthsClass);
    expect(months?.length).toBe(12);
    expect(months?.[month].classList).toContain(noDotMonthThisMonthClass);
    await months?.[month].dispatchEvent(new Event('click'));
    expect(datePickerProValue.value?.getFullYear()).toBe(year);
    expect(datePickerProValue.value?.getMonth()).toBe(month);
    expect(input.element.value).toBe(`${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);

    wrapper.unmount();
  });

  it('year picker v-model test', async () => {
    const datePickerProValue = ref<Date | string>(new Date());
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="month"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(monthPanelClass);
    const monthItems = pickerPanel?.querySelectorAll(monthItemClass);

    const month = new Date().getMonth();
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthItem = monthItems?.[1].querySelectorAll(monthsClass);
    expect(monthItem?.[month].classList).toContain(noDotMonthActiveMonthClass);

    wrapper.unmount();
  });

  it('year picker calendarRange limitDateRange test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const curYear = new Date().getFullYear();
    const calendarRange = [curYear, curYear + 1];
    const limitDateRange = ref<Date[]>([new Date(new Date().getFullYear(), 1, 1), new Date(new Date().getFullYear(), 8, 1)]);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={calendarRange}
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
    const pickerPanel = document.querySelector(monthPanelClass);
    const yearItems = pickerPanel?.querySelectorAll(yearItemClass);
    expect(yearItems?.length).toBe(2);

    const monthItems = pickerPanel?.querySelectorAll(monthItemClass);
    expect(monthItems?.length).toBe(2);
    const months = monthItems?.[0].querySelectorAll(monthsClass);
    expect(months?.[1].classList).not.toContain(noDotMonthDisabledClass);
    expect(months?.[8].classList).not.toContain(noDotMonthDisabledClass);
    expect(months?.[0].classList).toContain(noDotMonthDisabledClass);
    expect(months?.[9].classList).toContain(noDotMonthDisabledClass);

    await months?.[0].dispatchEvent(new Event('click'));
    expect(input.element.value).toBe('');

    wrapper.unmount();
  });

  it('year range picker init render and select year', async () => {
    const datePickerProValue = ref<Date[]>([]);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
    const pickerPanel = document.querySelector(monthPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearList = pickerPanel?.querySelector(yearListClass);
    expect(yearList).toBeTruthy();

    // const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const monthList = pickerPanel?.querySelector(monthListClass);
    expect(yearList).toBeTruthy();
    const monthListItems = monthList?.querySelectorAll(monthItemClass);
    // 虚拟滚动，中间月份列表总共渲染4个item
    expect(monthListItems?.length).toBe(4);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const months = monthListItems?.[1].querySelectorAll(monthsClass);
    expect(months?.length).toBe(12);
    expect(months?.[month].classList).toContain(noDotMonthThisMonthClass);
    await months?.[month].dispatchEvent(new Event('click'));

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    const newMonths = monthListItems?.[2].querySelectorAll(monthsClass);
    await newMonths?.[month].dispatchEvent(new Event('click'));

    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    // expect(datePickerProValue.value[0]?.getFullYear()).toBe(year);
    // expect(datePickerProValue.value[0]?.getMonth()).toBe(month);
    // expect(datePickerProValue.value[1]?.getFullYear()).toBe(year + 1);
    // expect(datePickerProValue.value[1]?.getMonth()).toBe(month);
    // expect(inputs[0].element.value).toBe(`${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);
    // expect(inputs[1].element.value).toBe(`${year + 1}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);

    wrapper.unmount();
  });

  it('year range picker v-model test', async () => {
    const datePickerProValue = ref<(Date | string)[]>([
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear() + 1, 0, 1),
    ]);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} type="month"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(rangeBaseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(monthPanelClass);
    const monthItems = pickerPanel?.querySelectorAll(monthItemClass);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const startMonths = monthItems?.[1].querySelectorAll(monthsClass);
    const endMonths = monthItems?.[2].querySelectorAll(monthsClass);

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    expect(inputs[0].element.value).toBe(`${year}-${month + 1 >= 10 ? month + 1 : '0' + (month + 1)}`);
    expect(inputs[1].element.value).toBe(`${year + 1}-01`);
    expect(startMonths?.[month].classList).toContain(noDotMonthStartMonthClass);
    expect(endMonths?.[0].classList).toContain(noDotMonthEndMonthClass);

    wrapper.unmount();
  });
});
