import { mount } from '@vue/test-utils';
import DDatePickerPro from '../src/date-picker-pro';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DButton from '../../button/src/button';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const pickerPanelClass = ns.e('panel');
const yearListClass = ns.em('calendar-panel', 'year-list');
const yearListItemClass = ns.em('calendar-panel', 'year-list-item');
const weekHeaderClass = ns.e('table-week-header');
const monthListClass = ns.e('tbody-wrapper');
const tableMonthClass = ns.e('table-month');

const noDotNs = useNamespace('date-picker-pro', false);
const noDotYearActiveClass = noDotNs.e('year-title-active');

const inputNs = useNamespace('input', true);

describe('date-picker-pro test', () => {
  it('date-picker-pro init render', async () => {
    const datePickerProValue = ref('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value}></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    expect(input.attributes('placeholder')).toBe('请选择日期');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearListItems = pickerPanel.findAll(yearListItemClass);
    expect(yearListItems.length).toBe(7 + 7 * 12);
    const weekHeader = pickerPanel.find(weekHeaderClass);
    expect(weekHeader.findAll('td').length).toBe(7);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    expect(tableMonthItems.length).toBe(7 * 12);

    const date = new Date();
    const yearIndex = 3 * 13 + date.getMonth() + 1;
    const monthIndex = 3 * 12 + date.getMonth();
    const dayIndex = date.getDate();
    const dayWeekIndex = date.getDay();
    const emptyNum = 7 - ((dayIndex - dayWeekIndex) % 7);

    expect(yearListItems[yearIndex].classes().includes(noDotYearActiveClass)).toBe(true);
    expect(pickerPanel.exists()).toBeTruthy();

    const vm = wrapper.vm;
    const yearList = vm.$el.querySelector(yearListClass);
    const monthList = vm.$el.querySelector(monthListClass);

    const monthContentContainer = tableMonthItems[monthIndex].find(ns.e('table-month-content'));
    expect(monthContentContainer.exists()).toBeTruthy();
    const Items = monthContentContainer.findAll('td');
    expect(Items.length).toBe(7 * 6);

    expect(Items[emptyNum].find('span').text()).toBe('');
    expect(Items[emptyNum + 1].find('span').text()).not.toBe('');
    expect(Items[emptyNum + dayIndex].classes().includes(noDotNs.e('table-date-today'))).toBe(true);
    wrapper.unmount();
  });

  it('date-picker-pro select date', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value}></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(ns.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    expect(datePickerProValue.value?.toLocaleDateString()).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1}/${todayIndex > 20 ? date.getDate() - 1 : date.getDate() + 1}`
    );

    const pickerPanelNew = container.find(pickerPanelClass);
    expect(pickerPanelNew.exists()).toBeFalsy();

    wrapper.unmount();
  });

  it('date-picker-pro v-model test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value}></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    datePickerProValue.value = new Date();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);

    const date = new Date();
    const selectIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(ns.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    expect(Items[selectIndex].classes().includes(noDotNs.e('table-date-selected'))).toBe(true);

    wrapper.unmount();
  });

  it('date-picker-pro format props', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} format="YYYY-MM-DD"></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(ns.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    const vm = wrapper.vm;
    const inputNew = vm.$el.querySelector('input');
    expect(inputNew.value).toBe(
      `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${
        todayIndex > 20 ? date.getDate() - 1 : date.getDate() + 1
      }`
    );

    wrapper.unmount();
  });

  it('date-picker-pro showTime props', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} showTime={true}></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);

    const timePicker = pickerPanel.find(ns.e('panel-time'));
    expect(timePicker.exists()).toBeTruthy();
    const timeUl = timePicker.findAll('.time-ul');
    expect(timeUl[0].element.childElementCount).toBe(24);
    expect(timeUl[1].element.childElementCount).toBe(60);
    expect(timeUl[2].element.childElementCount).toBe(60);

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(ns.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    expect(datePickerProValue.value?.toLocaleString()).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1}/${todayIndex > 20 ? date.getDate() - 1 : date.getDate() + 1} 00:00:00`
    );

    const liItems = timeUl[0].findAll('.time-li');
    await liItems[3].trigger('click');
    expect(datePickerProValue.value?.toLocaleString()).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1}/${todayIndex > 20 ? date.getDate() - 1 : date.getDate() + 1} 03:00:00`
    );

    const pickerPanelFooter = container.find(ns.e('panel-footer'));
    const button = pickerPanelFooter.find('button');
    await button.trigger('click');
    const pickerPanelNew = container.find(pickerPanelClass);
    expect(pickerPanelNew.exists()).toBeFalsy();

    wrapper.unmount();
  });
  it('date-picker-pro event toggleChange confirmEvent focus blur', async () => {
    const datePickerProValue = ref<Date | string>('');
    const onToggleChange = jest.fn();
    const onConfirmEvent = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            onToggleChange={onToggleChange}
            onConfirmEvent={onConfirmEvent}
            onFocus={onFocus}
            onBlur={onBlur}></DDatePickerPro>
        );
      },
    });

    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    expect(onToggleChange).toBeCalledTimes(1);
    expect(onFocus).toBeCalledTimes(1);

    const pickerPanel = container.find(pickerPanelClass);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(ns.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    expect(onConfirmEvent).toBeCalledTimes(1);
    expect(onToggleChange).toBeCalledTimes(2);
    expect(onBlur).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('date-picker-pro clear date', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value}></DDatePickerPro>;
      },
    });
    const date = new Date();
    const container = wrapper.find(baseClass);
    datePickerProValue.value = date;

    await nextTick();
    const vm = wrapper.vm;
    const input = vm.$el.querySelector('input');
    expect(input.value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getDate()}`
    );
    const singlePicker = container.find(ns.e('single-picker'));
    await singlePicker.trigger('mouseover');
    const icon = singlePicker.find(ns.m('icon-visible'));
    expect(icon.exists()).toBeTruthy();
    await icon.trigger('click');
    const inputNew = vm.$el.querySelector('input');
    expect(inputNew.value).toBe('');

    wrapper.unmount();
  });

  it('date-picker-pro size test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        return () => <DDatePickerPro v-model={datePickerProValue.value} size="lg"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find(inputNs.m('lg'));
    expect(input.exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('date-picker-pro rightArea slot', async () => {
    const datePickerProValue = ref<Date | string>('');
    const setDate = (days: number) => {
      datePickerProValue.value = new Date(new Date().getTime() + days * 24 * 3600 * 1000);
    };
    const wrapper = mount({
      setup() {
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            v-slots={{
              rightArea: () => (
                <ul>
                  <li>
                    <DButton
                      variant="text"
                      color="primary"
                      onClick={() => {
                        setDate(-30);
                      }}>
                      一个月前
                    </DButton>
                  </li>
                </ul>
              ),
            }}></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find('input');
    expect(input.exists()).toBeTruthy();
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    const rightArea = pickerPanel.find(ns.e('panel-right-area'));
    expect(rightArea.exists()).toBeTruthy();

    const button = rightArea.find('button');
    expect(button.exists()).toBeTruthy();
    const date = new Date();
    await button.trigger('click');

    await nextTick();
    const vm = wrapper.vm;
    const inputNew = vm.$el.querySelector('input');
    const newDate = new Date(date.getTime() - 30 * 24 * 3600 * 1000);
    expect(inputNew.value).toBe(
      `${newDate.getFullYear()}/${
        newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1
      }/${newDate.getDate()}`
    );

    wrapper.unmount();
  });

  it('date-picker-pro footer slot', async () => {
    const datePickerProValue = ref<Date | string>('');
    const setToday = () => {
      datePickerProValue.value = new Date();
    };
    const wrapper = mount({
      setup() {
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            v-slots={{
              footer: () => (
                <div>
                  <DButton color="primary" onClick={setToday}>
                    今天
                  </DButton>
                </div>
              ),
            }}></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find('input');
    expect(input.exists()).toBeTruthy();
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    const footer = pickerPanel.find(ns.e('panel-footer'));
    expect(footer.exists()).toBeTruthy();

    const button = footer.find('button');
    expect(button.exists()).toBeTruthy();
    await button.trigger('click');

    await nextTick();
    const vm = wrapper.vm;
    const inputNew = vm.$el.querySelector('input');
    const newDate = new Date();
    expect(inputNew.value).toBe(
      `${newDate.getFullYear()}/${
        newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1
      }/${newDate.getDate()}`
    );

    wrapper.unmount();
  });

  it('date-picker-pro calendarRange limitDateRange', async () => {
    const datePickerProValue = ref<Date | string>('');
    const limitDateRange = ref<Date[]>([
      new Date(new Date().getTime() - 24 * 3600 * 1000),
      new Date(new Date().getTime() + 24 * 3600 * 1000),
    ]);
    const wrapper = mount({
      setup() {
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={[2022, 2025]}
            limitDateRange={limitDateRange.value}></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearListItems = pickerPanel.findAll(yearListItemClass);
    expect(yearListItems.length).toBe(4 + 4 * 12);
    const weekHeader = pickerPanel.find(weekHeaderClass);
    expect(weekHeader.findAll('td').length).toBe(7);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    expect(tableMonthItems.length).toBe(4 * 12);

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 2 : todayIndex + 2;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(ns.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    expect(Items[selectIndex].classes().includes(noDotNs.e('table-date-disabled'))).toBe(true);
    await Items[selectIndex].trigger('click');
    expect(datePickerProValue.value).toBe('');

    wrapper.unmount();
  });
});
