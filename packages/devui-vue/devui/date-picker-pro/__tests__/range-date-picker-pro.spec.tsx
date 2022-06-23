import { mount } from '@vue/test-utils';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DButton from '../../button/src/button';
import { divide } from 'lodash';

const datePickerNs = useNamespace('date-picker-pro', true);
const rangeDatePickerNs = useNamespace('range-date-picker-pro', true);
const baseClass = rangeDatePickerNs.b();
const pickerPanelClass = datePickerNs.e('panel');
const yearListItemClass = datePickerNs.em('calendar-panel', 'year-list-item');
const weekHeaderClass = datePickerNs.e('table-week-header');
const tableMonthClass = datePickerNs.e('table-month');

const noDotDatePickerNs = useNamespace('date-picker-pro', false);
const noDotYearActiveClass = noDotDatePickerNs.e('year-title-active');

const inputNs = useNamespace('input', true);

describe('range-date-picker-pro test', () => {
  it('range-date-picker-pro init render', async () => {
    const datePickerProValue = ref(['', '']);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value}></DRangeDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].attributes('placeholder')).toBe('请选择日期');
    expect(inputs[1].attributes('placeholder')).toBe('请选择日期');
    await inputs[0].trigger('focus');
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

    const monthContentContainer = tableMonthItems[monthIndex].find(datePickerNs.e('table-month-content'));
    expect(monthContentContainer.exists()).toBeTruthy();
    const Items = monthContentContainer.findAll('td');
    expect(Items.length).toBe(7 * 6);

    expect(Items[emptyNum].find('span').text()).toBe('');
    expect(Items[emptyNum + 1].find('span').text()).not.toBe('');
    expect(Items[emptyNum + dayIndex].classes().includes(noDotDatePickerNs.e('table-date-today'))).toBe(true);
    wrapper.unmount();
  });

  it('range-date-picker-pro select date', async () => {
    const datePickerProValue = ref(['', '']);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value}></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex : todayIndex + 1;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    await nextTick();
    expect(inputs[0].element.value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${
        todayIndex > 20 ? date.getDate() : date.getDate() + 1
      }`
    );
    expect(inputs[1].element.value).toBe('');

    const newSelectIndex = todayIndex > 20 ? todayIndex : todayIndex + 5;
    await Items[newSelectIndex].trigger('click');
    await nextTick();
    expect(inputs[0].element.value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${
        todayIndex > 20 ? date.getDate() : date.getDate() + 1
      }`
    );
    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    expect(inputs[1].element.value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${
        todayIndex > 20 ? date.getDate() : date.getDate() + 5
      }`
    );

    wrapper.unmount();
  });

  it('date-picker-pro v-model test', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value}></DRangeDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    datePickerProValue.value[0] = new Date();
    const time = 5 * 24 * 3600 * 1000;
    datePickerProValue.value[1] = new Date().getDate() > 20 ? new Date() : new Date(new Date().getTime() + time);
    await nextTick();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);

    const date = new Date();
    const todayIndx = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = date.getDate() > 20 ? todayIndx : todayIndx + 5;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    expect(Items[todayIndx].classes().includes(noDotDatePickerNs.e('table-date-start'))).toBe(true);

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    expect(Items[selectIndex].classes().includes(noDotDatePickerNs.e('table-date-end'))).toBe(true);

    wrapper.unmount();
  });
  it('range-date-picker-pro event toggleChange confirmEvent', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const onToggleChange = jest.fn();
    const onConfirmEvent = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DRangeDatePickerPro
            v-model={datePickerProValue.value}
            onToggleChange={onToggleChange}
            onConfirmEvent={onConfirmEvent}></DRangeDatePickerPro>
        );
      },
    });

    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    expect(onToggleChange).toBeCalledTimes(1);

    const pickerPanel = container.find(pickerPanelClass);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    const monthContentContainer = tableMonthItems[3 * 12 + date.getMonth()].find(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    await nextTick();
    expect(onConfirmEvent).toBeCalledTimes(0);
    expect(onToggleChange).toBeCalledTimes(1);

    await Items[selectIndex + 1].trigger('click');
    await nextTick();
    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    expect(onConfirmEvent).toBeCalledTimes(1);
    expect(onToggleChange).toBeCalledTimes(2);
    wrapper.unmount();
  });
  it('range-date-picker-pro clear date', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value}></DRangeDatePickerPro>;
      },
    });
    const date = new Date();
    const container = wrapper.find(baseClass);
    datePickerProValue.value[0] = date;

    await nextTick();
    const vm = wrapper.vm;
    const inputs = vm.$el.querySelectorAll('input');
    expect(inputs[0].value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getDate()}`
    );
    expect(inputs[1].value).toBe('');

    const rangePicker = container.find(rangeDatePickerNs.e('range-picker'));
    await rangePicker.trigger('mouseover');
    const icon = rangePicker.find(rangeDatePickerNs.m('icon-visible'));
    expect(icon.exists()).toBeTruthy();
    await icon.trigger('click');
    const inputNews = vm.$el.querySelectorAll('input');
    expect(inputNews[0].value).toBe('');
    expect(inputNews[1].value).toBe('');

    wrapper.unmount();
  });

  it('range-date-picker-pro size test', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const wrapper = mount({
      setup() {
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} size="lg"></DRangeDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    const inputs = container.findAll(inputNs.m('lg'));
    expect(inputs.length).toBe(2);
    expect(inputs[0].exists()).toBeTruthy();
    expect(inputs[1].exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('range-date-picker-pro rightArea slot', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const setDate = (days: number) => {
      datePickerProValue.value = [new Date(new Date().getTime() + days * 24 * 3600 * 1000), new Date()];
    };
    const wrapper = mount({
      setup() {
        return () => (
          <DRangeDatePickerPro
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
            }}></DRangeDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    expect(inputs.length).toBe(2);
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    const rightArea = pickerPanel.find(datePickerNs.e('panel-right-area'));
    expect(rightArea.exists()).toBeTruthy();

    const button = rightArea.find('button');
    expect(button.exists()).toBeTruthy();
    const date = new Date();
    await button.trigger('click');

    await nextTick();
    const vm = wrapper.vm;
    const inputNews = vm.$el.querySelectorAll('input');
    expect(inputNews.length).toBe(2);
    const newDate = new Date(date.getTime() - 30 * 24 * 3600 * 1000);
    expect(inputNews[0].value).toBe(
      `${newDate.getFullYear()}/${
        newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1
      }/${newDate.getDate()}`
    );
    expect(inputNews[1].value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getDate()}`
    );

    wrapper.unmount();
  });

  it('range-date-picker-pro footerArea slot', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const setToday = () => {
      datePickerProValue.value = [new Date(new Date().getTime()), new Date(new Date().getTime() + 1 * 24 * 3600 * 1000)];
    };
    const wrapper = mount({
      setup() {
        return () => (
          <DRangeDatePickerPro
            v-model={datePickerProValue.value}
            v-slots={{
              footerArea: () => (
                <div>
                  <d-button variant="solid" color="secondary" onClick={setToday}>
                    今天
                  </d-button>
                </div>
              ),
            }}></DRangeDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    const footerArea = pickerPanel.find(datePickerNs.e('panel-footer'));
    expect(footerArea.exists()).toBeTruthy();

    const button = footerArea.find('button');
    expect(button.exists()).toBeTruthy();
    const date = new Date();
    await button.trigger('click');

    await nextTick();
    const vm = wrapper.vm;
    const inputNews = vm.$el.querySelectorAll('input');
    expect(inputNews.length).toBe(2);
    const newDate = new Date(date.getTime() + 1 * 24 * 3600 * 1000);
    expect(inputNews[0].value).toBe(
      `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getDate()}`
    );
    expect(inputNews[1].value).toBe(
      `${newDate.getFullYear()}/${
        newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1
      }/${newDate.getDate()}`
    );

    wrapper.unmount();
  });
});
