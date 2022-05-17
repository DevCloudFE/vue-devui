import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DInput from '../src/input';

describe('d-input', () => {
  it('d-input render work', async () => {
    const value = ref('abc');
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input v-model="value" />
      `,
      setup() {
        return {
          value,
        };
      },
    });
    const input = wrapper.find('input');
    expect(input.classes()).toContain('devui-input__inner');
    expect(input.element.value).toBe('abc');

    await input.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'thx';
    await nextTick();
    expect(input.element.value).toBe('thx');
  });

  it('d-input bindEvents work', async () => {
    const onChange = jest.fn(),
      onFocus = jest.fn(),
      onBlur = jest.fn(),
      onKeydown = jest.fn();
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown" />
      `,
      setup() {
        return {
          onChange,
          onFocus,
          onBlur,
          onKeydown,
        };
      },
    });
    const input = wrapper.find('input');

    await input.trigger('change');
    expect(onChange).toBeCalledTimes(1);

    await input.trigger('focus');
    expect(onFocus).toBeCalledTimes(1);

    await input.trigger('blur');
    expect(onBlur).toBeCalledTimes(1);

    await input.trigger('keydown');
    expect(onKeydown).toBeCalledTimes(1);
  });

  it('d-input disabled work', async () => {
    const wrapper = mount(DInput, {
      props: {
        disabled: false,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBe(undefined);

    await wrapper.setProps({
      disabled: true,
    });
    expect(input.attributes('disabled')).toBe('');
  });

  it('d-input error work', async () => {
    const wrapper = mount(DInput, {
      props: {
        error: false,
      },
    });
    expect(wrapper.classes()).not.toContain('devui-input--error');

    await wrapper.setProps({
      error: true,
    });
    expect(wrapper.classes()).toContain('devui-input--error');
  });

  it('d-input size work', async () => {
    const wrapper = mount(DInput);
    expect(wrapper.classes()).not.toContain('devui-input--sm');
    expect(wrapper.classes()).not.toContain('devui-input--lg');

    await wrapper.setProps({
      size: 'sm',
    });
    expect(wrapper.classes()).toContain('devui-input--sm');
    expect(wrapper.classes()).not.toContain('devui-input--lg');

    await wrapper.setProps({
      size: 'lg',
    });
    expect(wrapper.classes()).not.toContain('devui-input--sm');
    expect(wrapper.classes()).toContain('devui-input--lg');
  });

  it('d-input Method:select/focus/blur work', async () => {
    const testValue = ref('abc');
    const wrapper = mount({
      components: { DInput },
      template: `
        <d-input ref="inputDemo" v-model="testValue" />
      `,
      setup() {
        return {
          testValue,
        };
      },
    });

    const input = wrapper.find('input').element;
    input.selectionEnd = 0;
    (wrapper.vm.$refs.inputDemo as HTMLInputElement).select();
    await nextTick();
    expect(input.selectionEnd).toBe(input.value.length);

    // TODO focus/blur
    // 调用DOM的focus和select并不会给节点的div加上devui-input--focus
  });

  it('d-input validate-event work', async () => {
    // TODO 需要结合form组件进行测试
  });
});
