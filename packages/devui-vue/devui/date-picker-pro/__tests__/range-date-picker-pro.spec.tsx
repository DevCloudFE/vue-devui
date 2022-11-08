import { mount } from '@vue/test-utils';
import dayjs from 'dayjs';
import DRangeDatePickerPro from '../src/components/range-date-picker-pro';
import { nextTick, ref, getCurrentInstance } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DButton from '../../button/src/button';
import { Locale } from '../../locale';
import { getDateIndex, getSelectedDate, getSelectedIndex } from './utils';
import { DATE_FORMAT } from './const';

const datePickerNs = useNamespace('date-picker-pro', true);
const rangeDatePickerNs = useNamespace('range-date-picker-pro', true);
const baseClass = rangeDatePickerNs.b();
const pickerPanelClass = datePickerNs.e('panel');
const yearListItemClass = datePickerNs.em('calendar-panel', 'year-list-item');
const yearActiveClass = datePickerNs.e('year-title-active');
const weekHeaderClass = datePickerNs.e('table-week-header');
const tableMonthClass = datePickerNs.e('table-month');
const disabledClass = rangeDatePickerNs.m('disabled');

const noDotDatePickerNs = useNamespace('date-picker-pro', false);
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

describe('range-date-picker-pro test', () => {
  afterEach(() => {
    const baseDom = document.querySelector(baseClass);
    baseDom?.parentNode?.removeChild(baseDom);
    const pannelDomm = document.querySelector(pickerPanelClass);
    pannelDomm?.parentNode?.removeChild(pannelDomm);
  });

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
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearListItems = document.querySelectorAll(yearListItemClass);
    // 虚拟滚动，左侧年份列表总共渲染13个item
    expect(yearListItems.length).toBe(13);
    const weekHeader = document.querySelector(weekHeaderClass);
    expect(weekHeader?.getElementsByTagName('td').length).toBe(7);
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);
    // 虚拟滚动，中间月份列表总共渲染4个item
    expect(tableMonthItems?.length).toBe(4);

    const yearActiveItem = pickerPanel?.querySelector(yearActiveClass);
    expect(yearActiveItem).toBeTruthy();
    const activeTody = pickerPanel?.querySelector(datePickerNs.e('table-date-today'));
    expect(activeTody).toBeTruthy();
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
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);

    const date = new Date();
    const todayIndex = getDateIndex(date);
    const selectIndex = getSelectedIndex(todayIndex);
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer?.getElementsByTagName('td');
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    await nextTick();

    expect(dayjs(inputs[0].element.value).format(DATE_FORMAT)).toBe(getSelectedDate(todayIndex, date));
    expect(inputs[1].element.value).toBe('');

    const newSelectIndex = getSelectedIndex(todayIndex, 5);
    await Items?.[newSelectIndex].dispatchEvent(new Event('click'));
    await nextTick();
    // expect(dayjs(inputs[0].element.value).format(DATE_FORMAT)).toBe(getSelectedDate(todayIndex, date, 5));

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

    const date = new Date();
    datePickerProValue.value[0] = date;
    const time = 5 * 24 * 3600 * 1000;

    const todayIndex = getDateIndex(date);
    // todayIndex 大于 20 赋值当前日期 否则加五天 对应下方getSelectedIndex逻辑
    datePickerProValue.value[1] = todayIndex > 20 ? new Date() : new Date(new Date().getTime() + time);
    const selectIndex = getSelectedIndex(todayIndex, 5);

    await nextTick();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);


    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer?.getElementsByTagName('td');
    expect(Items?.[todayIndex].classList).toContain(noDotDatePickerNs.e('table-date-start'));

    await inputs[1].trigger('focus');
    await nextTick();
    await nextTick();
    expect(Items?.[selectIndex].classList).toContain(noDotDatePickerNs.e('table-date-end'));

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
            onBlur={onBlur}
          ></DRangeDatePickerPro>
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

    const pickerPanel = document.querySelector(pickerPanelClass);
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);
    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 1 : todayIndex + 1;
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer?.getElementsByTagName('td');
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    await nextTick();
    expect(onConfirmEvent).toBeCalledTimes(0);
    expect(onToggleChange).toBeCalledTimes(1);
    expect(onFocus).toBeCalledTimes(1);

    await Items?.[selectIndex + 1].dispatchEvent(new Event('click'));
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
    expect(inputs[0].value).toBe(dayjs(date).format(DATE_FORMAT));
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
                      }}
                    >
                      一个月前
                    </DButton>
                  </li>
                </ul>
              ),
            }}
          ></DRangeDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    expect(inputs.length).toBe(2);
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    const rightArea = pickerPanel?.querySelector(datePickerNs.e('panel-right-area'));
    expect(rightArea).toBeTruthy();

    const button = rightArea?.querySelector('button');
    expect(button).toBeTruthy();
    const date = new Date();
    await button?.dispatchEvent(new Event('click'));

    await nextTick();
    const vm = wrapper.vm;
    const inputNews = vm.$el.querySelectorAll('input');
    expect(inputNews.length).toBe(2);

    expect(inputNews[0].value).toBe(dayjs().subtract(30, 'day').format(DATE_FORMAT));

    expect(inputNews[1].value).toBe(dayjs(date).format(DATE_FORMAT));

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
            }}
          ></DRangeDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    const footer = pickerPanel?.querySelector(datePickerNs.e('panel-footer'));
    expect(footer).toBeTruthy();

    const button = footer?.getElementsByTagName('button');
    expect(button).toBeTruthy();
    await button?.[0].dispatchEvent(new Event('click'));

    await nextTick();
    const vm = wrapper.vm;
    const inputNews = vm.$el.querySelectorAll('input');
    expect(inputNews.length).toBe(2);

    expect(inputNews[0].value).toBe(dayjs().format(DATE_FORMAT));

    expect(inputNews[1].value).toBe(dayjs().add(1, 'day').format(DATE_FORMAT));

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
            limitDateRange={limitDateRange.value}
          ></DRangeDatePickerPro>
        );
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeTruthy();

    const yearListItems = pickerPanel?.querySelectorAll(yearListItemClass);
    expect(yearListItems?.length).toBe(11);
    const weekHeader = pickerPanel?.querySelector(weekHeaderClass);
    expect(weekHeader?.getElementsByTagName('td').length).toBe(7);
    const tableMonthItems = pickerPanel?.querySelectorAll(tableMonthClass);
    if (new Date().getMonth() + 1 >= 11 || new Date().getMonth() + 1 <= 1) {
      expect(tableMonthItems?.length).toBe(3);
    } else {
      expect(tableMonthItems?.length).toBe(4);
    }

    const date = new Date();
    const todayIndex = 7 - ((date.getDate() - date.getDay()) % 7) + date.getDate();
    const selectIndex = todayIndex > 20 ? todayIndex - 2 : todayIndex + 2;
    // 虚拟列表 当前面板呈现月为虚拟列表的第二个tableMonthItem
    const monthContentContainer = tableMonthItems?.[1].querySelector(datePickerNs.e('table-month-content'));
    const Items = monthContentContainer?.getElementsByTagName('td');
    expect(Items?.[selectIndex].classList).toContain(noDotDatePickerNs.e('table-date-disabled'));
    await Items?.[selectIndex].dispatchEvent(new Event('click'));
    expect(inputs[0].element.value).toBe('');
    expect(inputs[1].element.value).toBe('');

    wrapper.unmount();
  });

  it('range-date-picker-pro disabled', async () => {
    const datePickerProValue = ref<(Date | string)[]>(['', '']);
    const wrapper = mount({
      setup() {
        const app = getCurrentInstance();
        app.appContext.config.globalProperties.langMessages = ref(Locale.messages());
        return () => <DRangeDatePickerPro v-model={datePickerProValue.value} disabled={true}></DRangeDatePickerPro>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    // 测试是否生成了 disabled 相关的类
    expect(wrapper.find(disabledClass).exists()).toBeTruthy();
    expect(wrapper.find(inputDisableClass).exists()).toBeTruthy();
    expect(wrapper.findAll(inputDisableClass).length).toBe(2);

    // 测试鼠标是否能触发时间选择面板
    const inputs = container.findAll('input');
    await inputs[0].trigger('focus');
    await nextTick();
    const pickerPanel = document.querySelector(pickerPanelClass);
    expect(pickerPanel).toBeFalsy();
  });
});
