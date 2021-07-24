import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTextInput from '../src/text-input';

describe('d-text-input', () => {
  it('d-text-input render work', async () => {
    const value = ref('abc');
    const wrapper = mount({
      components: { DTextInput },
      template: `
        <d-text-input v-model:value="value" />
      `,
      setup () {
        return {
          value
        };
      }
    });
    const input = wrapper.find('input');
    expect(input.attributes('dtextinput')).toBe('true');
    expect(input.element.value).toBe('abc');

    await input.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'thx';
    await nextTick();
    expect(input.element.value).toBe('thx');
  });

  it('d-text-input bindEvents work', async () => {
    const onChange = jest.fn(),
      onFocus = jest.fn(),
      onBlur = jest.fn(),
      onKeydown = jest.fn();
    const wrapper = mount({
      components: { DTextInput },
      template: `
        <d-text-input
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown" />
      `,
      setup () {
        return {
          onChange,
          onFocus,
          onBlur,
          onKeydown
        };
      }
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

  it('d-text-input disabled work', async () => {
    const wrapper = mount(DTextInput, {
      props: {
        disabled: false
      }
    });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBe(undefined);

    await wrapper.setProps({
      disabled: true
    });
    expect(input.attributes('disabled')).toBe('');
  });

  it('d-text-input error work', async () => {
    const wrapper = mount(DTextInput, {
      props: {
        error: false
      }
    });
    const input = wrapper.find('input');
    expect(input.classes()).not.toContain('error');

    await wrapper.setProps({
      error: true
    });
    expect(input.classes()).toContain('error');
  });

  it('d-text-input size work', async () => {
    const wrapper = mount(DTextInput);
    const input = wrapper.find('input');
    expect(input.classes()).not.toContain('devui-textinput-sm');
    expect(input.classes()).not.toContain('devui-textinput-lg');

    await wrapper.setProps({
      size: 'sm'
    });
    expect(input.classes()).toContain('devui-textinput-sm');
    expect(input.classes()).not.toContain('devui-textinput-lg');

    await wrapper.setProps({
      size: 'lg'
    });
    expect(input.classes()).not.toContain('devui-textinput-sm');
    expect(input.classes()).toContain('devui-textinput-lg');
  });

  it('d-text-input showPassword work', async () => {
    const wrapper = mount(DTextInput);
    const input = wrapper.find('input');

    expect(input.attributes('type')).toBe('text');

    await wrapper.setProps({
      showPassword: true
    });
    expect(input.attributes('type')).toBe('password');
  });
});
