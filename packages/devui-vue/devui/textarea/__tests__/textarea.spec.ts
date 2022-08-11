import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DTextarea from '../src/textarea';

describe('textarea test', () => {
  it('d-textarea render work', async () => {
    const value = ref('abc');
    const wrapper = mount({
      components: { DTextarea },
      template: `
        <d-textarea v-model="value" />
      `,
      setup() {
        return {
          value,
        };
      },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.classes()).toContain('devui-textarea');
    expect(textarea.element.value).toBe('abc');

    await textarea.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'thx';
    await nextTick();
    expect(textarea.element.value).toBe('thx');
  });

  it('d-textarea rows work', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        rows: 5,
      },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.rows).toBe(5);
  });

  it('d-textarea bindEvents work', async () => {
    const onChange = jest.fn(),
      onFocus = jest.fn(),
      onBlur = jest.fn(),
      onKeydown = jest.fn();
    const wrapper = mount({
      components: { DTextarea },
      template: `
        <d-textarea
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
    const textarea = wrapper.find('textarea');

    await textarea.trigger('change');
    expect(onChange).toBeCalledTimes(1);

    await textarea.trigger('focus');
    expect(onFocus).toBeCalledTimes(1);

    await textarea.trigger('blur');
    expect(onBlur).toBeCalledTimes(1);

    await textarea.trigger('keydown');
    expect(onKeydown).toBeCalledTimes(1);
  });

  it('d-textarea disabled work', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        disabled: false,
      },
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('disabled')).toBe(undefined);

    await wrapper.setProps({
      disabled: true,
    });
    expect(textarea.attributes('disabled')).toBe('');
  });

  it('d-textarea error work', async () => {
    const wrapper = mount(DTextarea, {
      props: {
        error: false,
      },
    });
    expect(wrapper.find('textarea').classes()).not.toContain('devui-textarea--error');

    await wrapper.setProps({
      error: true,
    });
    expect(wrapper.find('textarea').classes()).toContain('devui-textarea--error');
  });

  it('d-textarea autosize work', async () => {
    const wrapper = mount({
      components: { DTextarea },
      template: `
        <d-textarea ref="textarea" :autosize="{ minRows: 1, maxRows: 10 }"/>
      `,
    });
    const wrapper2 = mount({
      components: { DTextarea },
      template: `
        <d-textarea ref="textarea" :autosize="{ minRows: 5, maxRows: 10 }"/>
      `,
    });
    const textarea = wrapper.find('textarea');
    const textarea2 = wrapper2.find('textarea');
    await nextTick();
    const firstStyle = textarea.attributes('style');
    const secondStyle = textarea2.attributes('style');
    expect(firstStyle).not.toEqual(secondStyle);
  });

  it.todo('props resize work well.');

  it.todo('props show-count work well.');
});
