import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DRadioButton from '../src/radio-button';
import { useNamespace } from '../../shared/hooks/use-namespace';

const nsClass = useNamespace('radio-button', true);
const baseClass = nsClass.b();

describe('RadioButton', () => {
  it('radio-button render work', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      components: { DRadioButton },
      template: `<d-radio-button v-model="modelValue" value="A" @change="onChange">ItemA</d-radio-button>`,
      setup() {
        const modelValue = ref('Item1');
        return {
          modelValue,
          onChange,
        };
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.exists()).toBeTruthy();
    expect(container.classes()).not.toContain('active');
    expect(container.text()).toEqual('ItemA');

    const input = wrapper.find('input');
    await input.trigger('change');
    expect(onChange).toBeCalledTimes(1);
  });

  it('radio-button value work', () => {
    const wrapper = mount(DRadioButton, {
      props: {
        value: 'Item1',
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes()['value']).toEqual('Item1');
  });

  it('radio-button disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DRadioButton, {
      props: {
        value: 'Item1',
        disabled: true,
        onChange,
      },
    });
    const container = wrapper.find(baseClass);
    expect(container.classes()).toContain('disabled');
    const input = wrapper.find('input');
    await input.trigger('change');
    expect(onChange).toBeCalledTimes(0);
  });
});
