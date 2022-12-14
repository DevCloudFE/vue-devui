import { mount } from '@vue/test-utils';
import dayjs from 'dayjs';
import DDatePickerPro from '../src/date-picker-pro';
import { nextTick, ref, getCurrentInstance } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DButton from '../../button/src/button';
import { Locale } from '../../locale';
import { getDateIndex, getSelectedDate, getSelectedIndex } from './utils';
import { DATE_FORMAT, TIME_FORMAT } from './const';

const ns = useNamespace('date-picker-pro', true);
const baseClass = ns.b();
const pickerPanelClass = ns.e('panel');
const yearListItemClass = ns.em('calendar-panel', 'year-list-item');
const yearActiveClass = ns.e('year-title-active');
const weekHeaderClass = ns.e('table-week-header');
const tableMonthClass = ns.e('table-month');

const noDotNs = useNamespace('date-picker-pro', false);

const inputNs = useNamespace('input', true);
const inputDisableClass = inputNs.m('disabled');

// 因为 jest 不支持 ResizeObserver，需要 mock 实现
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('date-picker-pro test', () => {
  afterEach(() => {
    const baseDom = document.querySelector(baseClass);
    baseDom?.parentNode?.removeChild(baseDom);
    const pannelDomm = document.querySelector(pickerPanelClass);
    pannelDomm?.parentNode?.removeChild(pannelDomm);
  });

  it('date-picker-pro init render', async () => {
    const datePickerProValue = ref('');
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} placeholder="请选择日期"></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    expect(input.attributes('placeholder')).toBe('请选择日期');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearActiveItem = pickerPanel?.querySelector(yearActiveClass);
    expect(yearActiveItem).toBeTruthy();
    const weekHeader = pickerPanel?.querySelector(weekHeaderClass);
    expect(weekHeader?.getElementsByTagName('td').length).toBe(7);
    const activeTody = pickerPanel?.querySelector(ns.e('table-date-today'));
    expect(activeTody).toBeTruthy();
    wrapper.unmount();
  });

  it('date-picker-pro select date', async () => {
    const datePickerProValue = ref<Date>();
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} placeholder="请选择日期"></DDatePickerPro>;
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);

    const date = new Date();
    const todayIndex = getDateIndex(date);

    const selectIndex = getSelectedIndex(todayIndex);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(ns.e('table-month-content'));
    const Items = monthContentContainer?.querySelectorAll('td');
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    expect(dayjs(datePickerProValue.value).format(DATE_FORMAT)).toBe(getSelectedDate(todayIndex, date));

    const pickerPanelNew = container.find(pickerPanelClass);
    expect(pickerPanelNew.exists()).toBeFalsy();

    wrapper.unmount();
  });

  it('date-picker-pro v-model test', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} placeholder="请选择日期"></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    datePickerProValue.value = new Date();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);

    const date = new Date();
    const selectIndex = getDateIndex(date);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(ns.e('table-month-content'));
    const Items = monthContentContainer?.querySelectorAll('td');
    expect(Items?.[selectIndex].classList).toContain(noDotNs.e('table-date-selected'));

    wrapper.unmount();
  });

  it('date-picker-pro format props', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} format="YYYY-MM-DD" placeholder="请选择日期"></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);

    const date = new Date();
    const todayIndex = getDateIndex(date);
    const selectIndex = getSelectedIndex(todayIndex);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(ns.e('table-month-content'));
    const Items = monthContentContainer?.querySelectorAll('td');
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    const vm = wrapper.vm;
    const inputNew = vm.$el.querySelector('input');
    expect(dayjs(inputNew.value).format(DATE_FORMAT)).toBe(getSelectedDate(todayIndex, date));

    wrapper.unmount();
  });

  it('date-picker-pro showTime props', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} showTime={true} placeholder="请选择日期"></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);

    const timePicker = pickerPanel?.querySelector(ns.e('panel-time'));
    expect(timePicker).toBeTruthy();
    const timeUl = timePicker?.querySelectorAll('.time-ul');
    expect(timeUl?.[0].childElementCount).toBe(24);
    expect(timeUl?.[1].childElementCount).toBe(60);
    expect(timeUl?.[2].childElementCount).toBe(60);

    const date = new Date();
    const todayIndex = getDateIndex(date);
    const selectIndex = getSelectedIndex(todayIndex);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(ns.e('table-month-content'));
    const Items = monthContentContainer?.getElementsByTagName('td');
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    expect(dayjs(datePickerProValue.value).format(TIME_FORMAT)).toBe(`${getSelectedDate(todayIndex, date)} 12:00:00`);

    const liItems = timeUl?.[0].querySelectorAll('.time-li');
    await liItems?.[3].dispatchEvent(new Event('click'));
    // expect(dayjs(datePickerProValue.value).format(TIME_FORMAT)).toBe(`${getSelectedDate(todayIndex, date)} 03:00:00`);

    const pickerPanelFooter = document.querySelector(ns.e('panel-footer'));
    const button = pickerPanelFooter?.getElementsByTagName('button')[0];
    await button?.dispatchEvent(new Event('click'));
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
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => (
          <DDatePickerPro
            v-model={datePickerProValue.value}
            onToggleChange={onToggleChange}
            onConfirmEvent={onConfirmEvent}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="请选择日期"></DDatePickerPro>
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

    const pickerPanel = document.querySelector(pickerPanelClass);
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);
    const date = new Date();
    const todayIndex = getDateIndex(date);
    const selectIndex = getSelectedIndex(todayIndex);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(ns.e('table-month-content'));
    const Items = monthContentContainer?.querySelectorAll('td');
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    expect(onConfirmEvent).toBeCalledTimes(1);
    expect(onToggleChange).toBeCalledTimes(2);
    expect(onBlur).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('date-picker-pro clear date', async () => {
    const datePickerProValue = ref<Date | string>('');
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} placeholder="请选择日期"></DDatePickerPro>;
      },
    });
    const date = new Date();
    const container = wrapper.find(baseClass);
    datePickerProValue.value = date;

    await nextTick();
    const vm = wrapper.vm;
    const input = vm.$el.querySelector('input');
    expect(input.value).toBe(dayjs(date).format(DATE_FORMAT));
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
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} size="lg" placeholder="请选择日期"></DDatePickerPro>;
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
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
            }}
            placeholder="请选择日期"></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find('input');
    expect(input.exists()).toBeTruthy();
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    const rightArea = pickerPanel?.querySelector(ns.e('panel-right-area'));
    expect(rightArea).toBeTruthy();

    const button = rightArea?.getElementsByTagName('button')[0];
    expect(button).toBeTruthy();
    await button?.dispatchEvent(new Event('click'));

    await nextTick();
    const vm = wrapper.vm;
    const inputNew = vm.$el.querySelector('input');
    expect(inputNew.value).toBe(dayjs().subtract(30, 'day').format(DATE_FORMAT));

    wrapper.unmount();
  });

  it('date-picker-pro footer slot', async () => {
    const datePickerProValue = ref<Date | string>('');
    const setToday = () => {
      datePickerProValue.value = new Date();
    };
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
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
            }}
            placeholder="请选择日期"></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const input = container.find('input');
    expect(input.exists()).toBeTruthy();
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const footer = document.querySelector(ns.e('panel-footer'));
    expect(footer).toBeTruthy();

    const button = footer?.getElementsByTagName('button')[0];
    expect(button).toBeTruthy();
    await button?.dispatchEvent(new Event('click'));

    await nextTick();
    const vm = wrapper.vm;
    const inputNew = vm.$el.querySelector('input');
    expect(inputNew.value).toBe(dayjs().format(DATE_FORMAT));

    wrapper.unmount();
  });

  it('date-picker-pro calendarRange limitDateRange', async () => {
    const datePickerProValue = ref<Date | string>('');
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
          <DDatePickerPro
            v-model={datePickerProValue.value}
            calendarRange={calendarRange}
            limitDateRange={limitDateRange.value}
            placeholder="请选择日期"></DDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const input = container.find('input');
    await input.trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearListItems = pickerPanel?.querySelectorAll(yearListItemClass);
    expect(yearListItems?.length).toBe(11);
    const weekHeader = pickerPanel?.querySelector(weekHeaderClass);
    expect(weekHeader?.getElementsByTagName('td').length).toBe(7);
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);
    const curMonth = new Date().getMonth() + 1;
    if (curMonth >= 11 || curMonth <= 1) {
      if (curMonth === 12) {
        expect(tableMonthItems?.length).toBe(2);
      } else {
        expect(tableMonthItems?.length).toBe(3);
      }
    } else {
      expect(tableMonthItems?.length).toBe(4);
    }

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 2 : todayIndex + 2;
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(ns.e('table-month-content'));
    const Items = monthContentContainer?.getElementsByTagName('td');
    expect(Items?.[selectIndex].classList).toContain(noDotNs.e('table-date-disabled'));
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    expect(datePickerProValue.value).toBe('');

    wrapper.unmount();
  });

  it('date-picker-pro disabled', async () => {
    const datePickerProValue = ref('');
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DDatePickerPro v-model={datePickerProValue.value} placeholder="请选择日期" disabled={true}></DDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    // 测试是否生成了 disabled 相关的类
    expect(wrapper.find(inputDisableClass).exists()).toBeTruthy();

    // 测试鼠标是否能触发时间选择面板
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeFalsy();
  });
});
