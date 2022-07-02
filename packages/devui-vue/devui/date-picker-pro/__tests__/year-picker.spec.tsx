import { mount } from '@vue/test-utils';
import DDatePickerPro from '../src/date-picker-pro';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const yearPanelClass = ns.e('year-calendar-panel');
const yearListItemClass = ns.e('year-list-item');
const yearItemClass = ns.e('year-item-title');

const noDotNs = useNamespace('date-picker-pro', false);
const noDotYearThisYearClass = noDotNs.e('this-year');
const noDotYearActiveYearClass = noDotNs.e('year-active');
const noDotYearStartYearClass = noDotNs.e('year-start');
const noDotYearEndYearClass = noDotNs.e('year-end');
const noDotYearDisabledClass = noDotNs.e('year-disabled');

const rangeDatePickerNs = useNamespace('range-date-picker-pro', true);
const rangeBaseClass = rangeDatePickerNs.b();

describe('date-picker-pro year type test', () => {
  it('year picker init render and select year', async () => {
    const datePickerProValue = ref<Date>();
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="year"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(yearPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearListItems = pickerPanel.findAll(yearListItemClass);
    expect(yearListItems.length).toBe(Math.ceil((2099 - 1970 + 1) / 3));
    const yearItems = pickerPanel.findAll(yearItemClass);
    expect(yearItems.length).toBe(2099 - 1970 + 1);

    const year = new Date().getFullYear();
    const yearIndex = year - 1970;
    expect(yearItems[yearIndex].classes().includes(noDotYearThisYearClass)).toBe(true);
    await yearItems[yearIndex].trigger('click');
    expect(datePickerProValue.value?.getFullYear()).toBe(year);
    expect(input.element.value).toBe(year.toString());

    wrapper.unmount();
  });

  it('year picker v-model test', async () => {
    const datePickerProValue = ref<Date | string>(new Date());
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} type="year"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(yearPanelClass);
    const yearItems = pickerPanel.findAll(yearItemClass);
    expect(yearItems.length).toBe(2099 - 1970 + 1);

    const year = new Date().getFullYear();
    const yearIndex = year - 1970;
    expect(yearItems[yearIndex].classes().includes(noDotYearActiveYearClass)).toBe(true);

    wrapper.unmount();
  });

  it('year picker calendarRange limitDateRange test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const limitDateRange = ref<Date[]>([new Date(new Date().getFullYear() - 2, 0, 1), new Date(new Date().getFullYear() + 2, 0, 1)]);
    const wrapper = mount({
      setup() {
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={[2000, 2050]}
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
    const pickerPanel = container.find(yearPanelClass);
    const yearItems = pickerPanel.findAll(yearItemClass);
    expect(yearItems.length).toBe(51);

    const year = new Date().getFullYear() - 2000;
    const startIndex = year - 2;
    const endIndex = year + 2;
    expect(yearItems[startIndex].classes().includes(noDotYearDisabledClass)).toBe(false);
    expect(yearItems[endIndex].classes().includes(noDotYearDisabledClass)).toBe(false);
    expect(yearItems[startIndex - 1].classes().includes(noDotYearDisabledClass)).toBe(true);
    expect(yearItems[endIndex + 1].classes().includes(noDotYearDisabledClass)).toBe(true);

    await yearItems[startIndex - 1].trigger('click');
    expect(input.element.value).toBe('');

    wrapper.unmount();
  });

  it('year range picker init render and select year', async () => {
    const datePickerProValue = ref<(Date)[]>([]);
    const wrapper = mount({
      setup() {
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
    const pickerPanel = container.find(yearPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearListItems = pickerPanel.findAll(yearListItemClass);
    expect(yearListItems.length).toBe(Math.ceil((2099 - 1970 + 1) / 3));
    const yearItems = pickerPanel.findAll(yearItemClass);
    expect(yearItems.length).toBe(2099 - 1970 + 1);

    const year = new Date().getFullYear();
    const yearIndex = year - 1970;
    expect(yearItems[yearIndex].classes().includes(noDotYearThisYearClass)).toBe(true);
    await yearItems[yearIndex].trigger('click');

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    await yearItems[yearIndex + 5].trigger('click');
    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    expect(datePickerProValue.value[0]?.getFullYear()).toBe(year);
    expect(datePickerProValue.value[1]?.getFullYear()).toBe(year + 5);
    expect(inputs[0].element.value).toBe(year.toString());
    expect(inputs[1].element.value).toBe((year + 5).toString());

    wrapper.unmount();
  });

  it('year range picker v-model test', async () => {
    const datePickerProValue = ref<(Date | string)[]>([new Date(), new Date(new Date().getFullYear() + 5, 0, 1)]);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} type="year"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(rangeBaseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(yearPanelClass);
    const yearItems = pickerPanel.findAll(yearItemClass);

    const start = new Date().getFullYear();
    const end = new Date().getFullYear() + 5;
    const startYearIndex = start - 1970;
    const endYearIndex = end - 1970;
    expect(inputs[0].element.value).toBe(start.toString());
    expect(inputs[1].element.value).toBe(end.toString());
    expect(yearItems[startYearIndex].classes().includes(noDotYearStartYearClass)).toBe(true);
    expect(yearItems[endYearIndex].classes().includes(noDotYearEndYearClass)).toBe(true);

    wrapper.unmount();
  });
});
