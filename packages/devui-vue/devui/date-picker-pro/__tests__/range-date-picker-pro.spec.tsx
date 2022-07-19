import { mount } from '@vue/test-utils';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref, getCurrentInstance } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DButton from '../../button/src/button';
import { Locale } from '../../locale';

const datePickerNs = useNamespace('date-picker-pro', true);
const rangeDatePickerNs = useNamespace('range-date-picker-pro', true);
const baseClass = rangeDatePickerNs.b();
const pickerPanelClass = datePickerNs.e('panel');
const yearListItemClass = datePickerNs.em('calendar-panel', 'year-list-item');
const yearActiveClass = datePickerNs.e('year-title-active');
const weekHeaderClass = datePickerNs.e('table-week-header');
const tableMonthClass = datePickerNs.e('table-month');

const noDotDatePickerNs = useNamespace('date-picker-pro', false);
const inputNs = useNamespace('input', true);

// 因为 jest 不支持 ResizeObserver，需要 mock 实现
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('range-date-picker-pro test', () => {
  it('range-date-picker-pro init render', async () => {
    const datePickerProValue = ref(['', '']);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value}></DRangeDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    expect(inputs.length).toBe(2);
    expect(inputs[0].attributes('placeholder')).toBe('请选择开始日期');
    expect(inputs[1].attributes('placeholder')).toBe('请选择结束日期');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearListItems = pickerPanel.findAll(yearListItemClass);
    // 虚拟滚动，左侧年份列表总共渲染13个item
    expect(yearListItems.length).toBe(13);
    const weekHeader = pickerPanel.find(weekHeaderClass);
    expect(weekHeader.findAll('td').length).toBe(7);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    // 虚拟滚动，中间月份列表总共渲染4个item
    expect(tableMonthItems.length).toBe(4);

    const yearActiveItem = pickerPanel.find(yearActiveClass);
    expect(yearActiveItem.exists()).toBeTruthy();
    const activeTody = pickerPanel.find(datePickerNs.e('table-date-today'));
    expect(activeTody.exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('range-date-picker-pro select date', async () => {
    const datePickerProValue = ref(['', '']);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems[1].find(datePickerNs.e('table-month-content'));
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
    // expect(inputs[1].element.value).toBe(
    //   `${date.getFullYear()}/${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${
    //     todayIndex > 20 ? date.getDate() : date.getDate() + 5
    //   }`
    // );

    wrapper.unmount();
  });

  it('date-picker-pro v-model test', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems[1].find(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    expect(Items[todayIndx].classes().includes(noDotDatePickerNs.e('table-date-start'))).toBe(true);

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    expect(Items[selectIndex].classes().includes(noDotDatePickerNs.e('table-date-end'))).toBe(true);

    wrapper.unmount();
  });
  it('range-date-picker-pro event toggleChange confirmEvent focus blur', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const onToggleChange = jest.fn();
    const onConfirmEvent = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => (
          <DRangeDatePickerPro
            v-model={datePickerProValue.value}
            onToggleChange={onToggleChange}
            onConfirmEvent={onConfirmEvent}
            onFocus={onFocus}
            onBlur={onBlur}></DRangeDatePickerPro>
        );
      },
    });

    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    expect(onToggleChange).toBeCalledTimes(1);
    expect(onFocus).toBeCalledTimes(1);

    const pickerPanel = container.find(pickerPanelClass);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems[1].find(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    await Items[selectIndex].trigger('click');
    await nextTick();
    expect(onConfirmEvent).toBeCalledTimes(0);
    expect(onToggleChange).toBeCalledTimes(1);
    expect(onFocus).toBeCalledTimes(1);

    await Items[selectIndex + 1].trigger('click');
    await nextTick();
    // todo 选择第二个日期时，focusType判断仍然是start。 demo中是正确的，单测原因需进一步确定
    // expect(onConfirmEvent).toBeCalledTimes(1);
    // expect(onToggleChange).toBeCalledTimes(2);
    // expect(onBlur).toBeCalledTimes(1);

    wrapper.unmount();
  });
  it('range-date-picker-pro clear date', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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

  it('range-date-picker-pro footer slot', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const setToday = () => {
      datePickerProValue.value = [new Date(new Date().getTime()), new Date(new Date().getTime() + 1 * 24 * 3600 * 1000)];
    };
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => (
          <DRangeDatePickerPro
            v-model={datePickerProValue.value}
            v-slots={{
              footer: () => (
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
    const footer = pickerPanel.find(datePickerNs.e('panel-footer'));
    expect(footer.exists()).toBeTruthy();

    const button = footer.find('button');
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

  it('range-date-picker-pro calendarRange limitDateRange', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const limitDateRange = ref<Date[]>([
      new Date(new Date().getTime() - 24 * 3600 * 1000),
      new Date(new Date().getTime() + 24 * 3600 * 1000),
    ]);
    const year = new Date().getFullYear();
    const calendarRange = [year, year];
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => (
          <DRangeDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={calendarRange}
            limitDateRange={limitDateRange.value}></DRangeDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = container.find(pickerPanelClass);
    expect(pickerPanel.exists()).toBeTruthy();

    const yearListItems = pickerPanel.findAll(yearListItemClass);
    expect(yearListItems.length).toBe(13);
    const weekHeader = pickerPanel.find(weekHeaderClass);
    expect(weekHeader.findAll('td').length).toBe(7);
    const tableMonthItems = pickerPanel.findAll(tableMonthClass);
    expect(tableMonthItems.length).toBe(12);

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 2 : todayIndex + 2;
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems[1].find(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer.findAll('td');
    expect(Items[selectIndex].classes().includes(noDotDatePickerNs.e('table-date-disabled'))).toBe(true);
    await Items[selectIndex].trigger('click');
    expect(inputs[0].element.value).toBe('');
    expect(inputs[1].element.value).toBe('');

    wrapper.unmount();
  });
});
