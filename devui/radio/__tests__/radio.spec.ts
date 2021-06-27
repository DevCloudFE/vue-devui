import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DRadio from '../src/radio';

describe('Radio', () => {
  it('radio render work', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      components: { DRadio },
      template: `<d-radio v-model:checked="checked" value="A" @change="onChange">ItemA</d-radio>`,
      setup () {
        const checked = ref(false);
        return {
          checked,
          onChange
        };
      },
    });

    expect(wrapper.classes()).toContain('devui-radio');
    expect(wrapper.classes()).not.toContain('active');
    expect(wrapper.text()).toEqual('ItemA');

    const input = wrapper.find('input');
    await input.trigger('change');
    expect(onChange).toBeCalledTimes(1);
  });

  it('radio value work', () => {
    const wrapper = mount(DRadio, {
      props: {
        value: 'ABC'
      }
    });
    const input = wrapper.find('input');
    expect(input.attributes()['value']).toEqual('ABC');
  });

  it('radio disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DRadio, {
      props: {
        value: 'CD',
        disabled: true,
        onChange
      }
    });
    const circle = wrapper.find('circle');
    expect(circle.classes()).toContain('disabled');
    const input = wrapper.find('input');
    await input.trigger('change');
    expect(onChange).toBeCalledTimes(0);
  });

  it('radio beforeChange work', async () => {
    const beforeChange = jest.fn(() => true);
    const onChange = jest.fn();
    const wrapper = mount(DRadio, {
      props: {
        value: 'EF',
        onChange,
        beforeChange
      }
    });
    const input = wrapper.find('input');
    await input.trigger('change');
    expect(beforeChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);

    const beforeChangeFalse = jest.fn(() => false);
    onChange.mockReset();
    await wrapper.setProps({
      value: 'CD',
      beforeChange: beforeChangeFalse,
      onChange
    });
    await input.trigger('change');
    expect(beforeChangeFalse).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
