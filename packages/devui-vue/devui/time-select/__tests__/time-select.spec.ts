import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTimeSelect from '../src/time-select';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Form as DForm, FormItem as DFormItem } from '../../form';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('select', true);
const baseClass = ns.b();
const dropdownCls = ns.e('dropdown');
const selectItemCls = ns.e('item');
const selectInputCls = ns.e('input');
const clearCls = ns.e('clear');

const notDotNs = useNamespace('select');
const selectSMCls = notDotNs.m('sm');
const selectLGCls = notDotNs.m('lg');
const selectDisabledCls = notDotNs.m('disabled');
const selectItemDisabledCls = selectItemCls + ' ' + 'disabled';

describe('TimeSelect', () => {
  /** 测试是否正常渲染 */
  it('time-select render work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" step="01:00" start="01:00" end="23:00"></d-time-select>`,
      setup() {
        const modelValue = ref('01:00');
        return {
          modelValue,
        };
      },
    });

    const container = wrapper.find(baseClass);
    const dropdown = wrapper.find(dropdownCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown.exists()).toBeFalsy();
    await input.trigger('click');
    await nextTick();
    const listItems = document.querySelectorAll(selectItemCls);
    expect(listItems.length).toBe(23);
    expect(listItems[0].classList).toContain('active');
    expect(input.element.value).toBe('01:00');

    wrapper.unmount();
  });

  it('time-select size work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" size="sm"></d-time-select>`,
      setup() {
        const modelValue = ref('00:30');
        return {
          modelValue,
        };
      },
    });

    let container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectSMCls);

    await wrapper.setProps({
      size: 'lg',
    });

    container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectLGCls);
    wrapper.unmount();
  });

  it('time-select props size priority', async () => {
    const dFormSize = ref('lg');
    const dTimeSelectSize = ref('sm');

    const wrapper = mount({
      components: { DTimeSelect, DForm, DFormItem },
      template: `
        <DForm :size="dFormSize">
        <DFormItem>
          <d-time-select  :size="dTimeSelectSize"></d-time-select>
        </DFormItem>
        </DForm>`,
      setup() {
        return {
          dFormSize,
          dTimeSelectSize,
        };
      },
    });

    const container = wrapper.find(baseClass);

    // form 与 元素同时存在size 属性，以元素为准。
    expect(container.classes()).toContain(selectSMCls);

    // 元素不存在 size ，form 存在，以表单为准
    dTimeSelectSize.value = '';
    await nextTick();
    expect(container.classes()).toContain(selectLGCls);

    // form 与 元素都不存在 size 属性，使用默认值。
    dFormSize.value = '';
    await nextTick();
    expect(container.classes()).not.toContain(selectSMCls);
    expect(container.classes()).not.toContain(selectLGCls);

    wrapper.unmount();
  });

  it('time-select disabled work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" disabled></d-time-select>`,
      setup() {
        const modelValue = ref('00:30');
        return {
          modelValue,
        };
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectDisabledCls);

    const input = wrapper.find(selectInputCls);
    expect(input.attributes()).toHaveProperty('disabled');
    wrapper.unmount();
  });

  it('time-select clear work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" clearable></d-time-select>`,
      setup() {
        const modelValue = ref('00:30');
        return {
          modelValue,
        };
      },
    });

    const container = wrapper.find(baseClass);
    const clearIcon = container.find(clearCls);

    expect(clearIcon.exists()).toBeTruthy();
    await clearIcon.trigger('click');
    const input = wrapper.find<HTMLInputElement>(selectInputCls);
    expect(input.element.value).toBe('');
    wrapper.unmount();
  });

  it('time-select events work', async () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" @change="onChange" @focus="onFocus" @blur="onBlur"></d-time-select>`,
      setup() {
        const modelValue = ref('00:30');
        return {
          modelValue,
          onChange,
          onFocus,
          onBlur,
        };
      },
    });

    const input = wrapper.find(selectInputCls);
    await input.trigger('focus');
    expect(onFocus).toBeCalledTimes(1);

    await input.trigger('blur');
    expect(onBlur).toBeCalledTimes(1);

    await input.trigger('click');
    const listItems = document.querySelectorAll(selectItemCls);
    await listItems[2].dispatchEvent(new Event('click'));

    expect(onChange).toBeCalled();

    wrapper.unmount();
  });

  it('time-select step work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" start="01:00" end="23:00"></d-time-select>`,
      setup() {
        const modelValue = ref('');
        return {
          modelValue,
        };
      },
    });

    const container = wrapper.find(baseClass);
    const dropdown = wrapper.find(dropdownCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown.exists()).toBeFalsy();
    await input.trigger('click');
    await nextTick();
    let listItems = document.querySelectorAll(selectItemCls);
    // 不传入 step 时默认为 00:30
    expect(listItems.length).toBe((23 - 1) * 2 + 1);

    await wrapper.setProps({
      step: '0:1',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 测试只传一位数字的情况
    expect(listItems.length).toBe((23 - 1) * 60 + 1);

    await wrapper.setProps({
      step: '01:49',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入一个非整点 step
    expect(listItems.length).toBe(13);

    await wrapper.setProps({
      step: '23:49',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入一个超大 step
    expect(listItems.length).toBe(1);

    await wrapper.setProps({
      step: '00:00',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入不合法的 step (00:00) 将变为默认的 00:30
    expect(listItems.length).toBe((23 - 1) * 2 + 1);

    await wrapper.setProps({
      step: '-1:0',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入不合法的 step (-1:0) 将变为默认的 00:30
    expect(listItems.length).toBe((23 - 1) * 2 + 1);

    await wrapper.setProps({
      step: '-2:20',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入不合法的 step (-2:20) 将变为默认的 00:30
    expect(listItems.length).toBe((23 - 1) * 2 + 1);

    await wrapper.setProps({
      step: '02:-1',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 虽然换算成分钟是正的，但依然不合法的值 step (2:-1) 将变为默认的 00:30
    expect(listItems.length).toBe((23 - 1) * 2 + 1);

    await wrapper.setProps({
      step: '1:0',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入带 0 但合法的 step (1:0)
    expect(listItems.length).toBe(23);

    wrapper.unmount();
  });

  it('time-select start/end work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" step="00:10"></d-time-select>`,
      setup() {
        const modelValue = ref('');
        return {
          modelValue,
        };
      },
    });

    const container = wrapper.find(baseClass);
    const dropdown = wrapper.find(dropdownCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown.exists()).toBeFalsy();
    await input.trigger('click');
    await nextTick();
    let listItems = document.querySelectorAll(selectItemCls);
    // 不传 start 和 end，则默认为 00:00 到 24:00
    expect(listItems.length).toBe(24 * 6 + 1);

    await wrapper.setProps({
      end: '17:00',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 从 00:00 到 17：00
    expect(listItems.length).toBe(17 * 6 + 1);

    await wrapper.setProps({
      start: '17:00',
      end: '18:00',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 17:00 到 18:00
    expect(listItems.length).toBe(6 + 1);

    await wrapper.setProps({
      start: '18:00',
      end: '02:00',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 中间无可选时间
    expect(listItems.length).toBe(0);

    wrapper.unmount();
  });

  it('time-select min-time/max-time work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" max-time="18:30"></d-time-select>`,
      setup() {
        const modelValue = ref('');
        return {
          modelValue,
        };
      },
    });

    const isAllDisabled = (listItems: NodeListOf<Element>, begin: number, end = listItems.length - 1) => {
      return Array.from(listItems)
        .slice(begin, end)
        .every((x) => x.classList.contains('disabled'));
    };

    const isAllAvailable = (listItems: NodeListOf<Element>, begin: number, end = listItems.length - 1) => {
      return Array.from(listItems)
        .slice(begin, end)
        .every((x) => !x.classList.contains('disabled'));
    };

    const container = wrapper.find(baseClass);
    const dropdown = wrapper.find(dropdownCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown.exists()).toBeFalsy();
    await input.trigger('click');
    await nextTick();
    let listItems = document.querySelectorAll(selectItemCls);
    // 只传 max 没传 start end 的情况,会渲染 24 小时里的所有时间,但有部分被禁用
    expect(container.find(selectItemDisabledCls).exists()).toBeTruthy;
    expect(listItems.length).toBe(24 * 2 + 1);

    // 小于等于 18:30 的时间可以被点击(18:00)
    expect(isAllAvailable(listItems, 0, 18 * 2 + 1)).toBeTruthy();

    // 等于 18:30 的时间可以被点击
    await listItems[18 * 2 + 1].dispatchEvent(new Event('click'));
    listItems = document.querySelectorAll(selectItemCls);
    expect(listItems[18 * 2 + 1].classList).toContain('active');
    expect(input.element.value).toBe('18:30');

    // 大于 18:30 以后的时间不可以被点击
    await listItems[19 * 2].dispatchEvent(new Event('click'));
    listItems = document.querySelectorAll(selectItemCls);
    expect(listItems[19 * 2].classList).not.toContain('active');
    expect(input.element.value).not.toBe('19:00');

    // 19:00 开始,之后的所有元素都无法点击
    expect(isAllDisabled(listItems, 19 * 2)).toBeTruthy();

    await wrapper.setProps({
      'min-time': '03:00',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传了 min 和 max, 没传 start end 的情况,会渲染 24 小时里的所有时间,但有部分被禁用
    expect(container.find(selectItemDisabledCls).exists()).toBeTruthy;
    expect(listItems.length).toBe(24 * 2 + 1);

    // 所有小于 03:00 的时间不可以被点击
    expect(isAllDisabled(listItems, 0, 3 * 2 - 1)).toBeTruthy();

    // 等于 03:00 的时间可以被点击
    expect(listItems[3 * 2].classList).not.toContain('disabled');
    await listItems[3 * 2].dispatchEvent(new Event('click'));
    listItems = document.querySelectorAll(selectItemCls);
    expect(listItems[3 * 2].classList).toContain('active');
    expect(input.element.value).toBe('03:00');

    // 所有大于等于 03:00  小于等于 18:30 的时间可以被点击
    expect(isAllAvailable(listItems, 3 * 2, 18 * 2 + 1)).toBeTruthy();

    // 19:00 开始,之后的所有元素都无法点击
    expect(isAllDisabled(listItems, 19 * 2)).toBeTruthy();

    // 传递 min-time、max-time、start、end
    await wrapper.setProps({
      'min-time': '09:30',
      'max-time': '18:30',
      start: '08:00',
      end: '20:00',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 可选时间的数目由传入的 start 和 end 决定
    expect(container.find(selectItemDisabledCls).exists()).toBeTruthy;
    expect(listItems.length).toBe(12 * 2 + 1);

    // 所有小于 09:30 的时间不可以被点击
    expect(isAllDisabled(listItems, 0, 2)).toBeTruthy();

    // 所有大于等于 09:30 和 小于等于 18:30 的时间可以被点击
    expect(isAllAvailable(listItems, 3, 2 * 10 + 1)).toBeTruthy();

    // 所有大于 18:30 的时间都不可以被点击
    expect(isAllDisabled(listItems, 2 * 11)).toBeTruthy();

    wrapper.unmount();
  });

  it('time-select placeholder work', async () => {
    const wrapper = mount({
      components: { DTimeSelect },
      template: `<d-time-select v-model="modelValue" placeholder="测试placeholder是否正常渲染"></d-time-select>`,
      setup() {
        const modelValue = ref('');
        return {
          modelValue,
        };
      },
    });

    const input = wrapper.find<HTMLInputElement>(selectInputCls);
    expect(input.attributes().placeholder).toBe('测试placeholder是否正常渲染');

    await wrapper.setProps({
      placeholder: 'placeholder',
    });
    await nextTick();

    expect(input.attributes().placeholder).toBe('placeholder');
  });
});
