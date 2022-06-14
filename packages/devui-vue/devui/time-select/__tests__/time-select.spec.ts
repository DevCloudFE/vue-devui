import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTimeSelect from '../src/time-select';
import { useNamespace } from '../../shared/hooks/use-namespace';

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
    const listItems = wrapper.findAll(selectItemCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown.isVisible()).toBeFalsy();
    await input.trigger('click');
    await nextTick();
    expect(listItems.length).toBe(23);
    expect(listItems[0].classes()).toContain('active');
    expect(input.element.value).toBe('01:00');
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
        };
      },
    });

    const input = wrapper.find(selectInputCls);
    await input.trigger('focus');
    await nextTick();
    expect(onFocus).toBeCalledTimes(1);

    await input.trigger('blur');
    expect(onBlur).toBeCalledTimes(1);

    await input.trigger('click');
    expect(onChange).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
