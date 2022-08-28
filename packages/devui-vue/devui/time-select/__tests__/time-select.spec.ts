import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTimeSelect from '../src/time-select';
import { useNamespace } from '../../shared/hooks/use-namespace';

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
      step: '00:01',
    });

    await input.trigger('click');
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    // 传入最小单位
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
    //  传入一个超大 step
    expect(listItems.length).toBe(1);

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
    // 不传start和end，则默认为00:00 到 24:00
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

  it.todo('props min-time/max-time work well.');

  it.todo('props placeholder work well.');
});
