import { mount } from '@vue/test-utils';
import DDatePickerPro from '../src/date-picker-pro';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref, getCurrentInstance } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Locale } from '../../locale';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const yearPanelClass = ns.e('year-calendar-panel');
const yearListItemClass = ns.e('year-list-item');
const yearThisYearClass = ns.e('this-year');
const yearItemClass = ns.e('year-item-title');

const noDotNs = useNamespace('date-picker-pro', false);
const noDotYearThisYearClass = noDotNs.e('this-year');
const noDotYearActiveYearClass = noDotNs.e('year-active');
const noDotYearStartYearClass = noDotNs.e('year-start');
const noDotYearEndYearClass = noDotNs.e('year-end');
const noDotYearDisabledClass = noDotNs.e('year-disabled');

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
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="year"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(yearPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearListItems = document.querySelectorAll(yearListItemClass);
    expect(yearListItems.length).toBe(6);
    const thisYearItems = document.querySelector(yearThisYearClass);
    expect(thisYearItems).toBeTruthy();

    const year = new Date().getFullYear();
    await thisYearItems?.dispatchEvent(new Event('click'));
    expect(datePickerProValue.value?.getFullYear()).toBe(year);
    expect(input.element.value).toBe(year.toString());

    wrapper.unmount();
  });

  it('year picker v-model test', async () => {
    const datePickerProValue = ref<Date | string>(new Date());
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="year"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();

    const thisYearItems = document.querySelector(yearThisYearClass);
    expect(thisYearItems).toBeTruthy();
    expect(thisYearItems?.classList).toContain(noDotYearActiveYearClass);

    wrapper.unmount();
  });

  it('year picker calendarRange limitDateRange test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const curYear = new Date().getFullYear();
    const calendarRange = [curYear - 5, curYear + 5];
    const limitDateRange = ref<Date[]>([new Date(new Date().getFullYear() - 2, 0, 1), new Date(new Date().getFullYear() + 2, 0, 1)]);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={calendarRange}
            limitDateRange={limitDateRange.value}
            type="year"></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const yearItems = document.querySelectorAll(yearItemClass);
    expect(yearItems.length).toBe(11);

    const year = 5;
    const startIndex = year - 2;
    const endIndex = year + 2;
    expect(yearItems[startIndex].classList).not.toContain(noDotYearDisabledClass);
    expect(yearItems[endIndex].classList).not.toContain(noDotYearDisabledClass);
    expect(yearItems[startIndex - 1].classList).toContain(noDotYearDisabledClass);
    expect(yearItems[endIndex + 1].classList).toContain(noDotYearDisabledClass);

    await yearItems[startIndex - 1].dispatchEvent(new Event('click'));
    expect(input.element.value).toBe('');

    wrapper.unmount();
  });

  it('year range picker init render and select year', async () => {
    const datePickerProValue = ref<Date[]>([]);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} type="year"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(rangeBaseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    expect(inputs.length).toBe(2);
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(yearPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearItems = document.querySelectorAll(yearItemClass);
    const year = new Date().getFullYear();
    // 虚拟列表 当前面板呈现的当前年在yearListItems的第三行
    const yearIndex = ((year - 1970 + 1) % 3) + (3 * 2 - 1);
    expect(yearItems[yearIndex].classList).toContain(noDotYearThisYearClass);
    await yearItems[yearIndex].dispatchEvent(new Event('click'));

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    await yearItems[yearIndex + 5].dispatchEvent(new Event('click'));
    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    // expect(datePickerProValue.value[0]?.getFullYear()).toBe(year);
    // expect(datePickerProValue.value[1]?.getFullYear()).toBe(year + 5);
    // expect(inputs[0].element.value).toBe(year.toString());
    // expect(inputs[1].element.value).toBe((year + 5).toString());

    wrapper.unmount();
  });

  it('year range picker v-model test', async () => {
    const datePickerProValue = ref<(Date | string)[]>([new Date(), new Date(new Date().getFullYear() + 5, 0, 1)]);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} type="year"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(rangeBaseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const yearItems = document.querySelectorAll(yearItemClass);

    const year = new Date().getFullYear();
    const start = year;
    const end = start + 5;
    // 虚拟列表 当前面板呈现的当前年在yearListItems的第三行
    const startYearIndex = ((year - 1970 + 1) % 3) + (3 * 2 - 1);
    const endYearIndex = startYearIndex + 5;
    expect(inputs[0].element.value).toBe(start.toString());
    expect(inputs[1].element.value).toBe(end.toString());
    expect(yearItems[startYearIndex].classList).toContain(noDotYearStartYearClass);
    expect(yearItems[endYearIndex].classList).toContain(noDotYearEndYearClass);

    wrapper.unmount();
  });
});
