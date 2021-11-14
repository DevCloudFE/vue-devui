import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';

describe('RadioGroup', () => {
  it('radioGroup render work', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio
      },
      template: `
        <d-radio-group v-model="radioVal" @change="onChange">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2">Item2</d-radio>
        </d-radio-group>
      `,
      setup () {
        const radioVal = ref('Item1');
        return {
          radioVal,
          onChange
        };
      }
    });

    const radioA = wrapper.findAllComponents({ name: 'DRadio' })[0];
    const radioB = wrapper.findAllComponents({ name: 'DRadio' })[1];
    const inputB = wrapper.findAll('input')[1];

    expect(wrapper.classes()).toContain('devui-radio-group');
    expect(radioA.classes()).toContain('active');
    expect(radioB.classes()).not.toContain('active');

    await inputB.trigger('change');

    expect(radioA.classes()).not.toContain('active');
    expect(radioB.classes()).toContain('active');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('radioGroup cssStyle work', async () => {
    const wrapper = mount(DRadioGroup, {
      props: {
        value: 'Item1'
      }
    });
    expect(wrapper.html()).not.toMatch('is-row');

    await wrapper.setProps({
      value: 'Item1',
      cssStyle: 'row'
    });
    expect(wrapper.html()).toMatch('is-row');
  });

  it('radioGroup beforeChange work', async () => {
    const beforeChange = jest.fn(v => v !== 'Item2');
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio
      },
      template: `
        <d-radio-group v-model="radioVal" @change="onChange" :before-change="beforeChange">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2">Item2</d-radio>
          <d-radio value="Item3">Item3</d-radio>
        </d-radio-group>
      `,
      setup () {
        const radioVal = ref('Item1');
        return {
          radioVal,
          onChange,
          beforeChange
        };
      }
    });

    const [radio1, radio2, radio3] = wrapper.findAllComponents({ name: 'DRadio' });
    expect(radio1.classes()).toContain('active');

    await radio2.find('input').trigger('change');
    expect(radio1.classes()).toContain('active');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReset();
    await radio3.find('input').trigger('change');
    expect(radio1.classes()).not.toContain('active');
    expect(radio3.classes()).toContain('active');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(1);
  });

  it('radioGroup disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio
      },
      template: `
        <d-radio-group v-model="radioVal" @change="onChange">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2" disabled>Item2</d-radio>
        </d-radio-group>
      `,
      setup () {
        const radioVal = ref('Item1');
        return {
          radioVal,
          onChange
        };
      }
    });

    const radio2 = wrapper.findAllComponents({ name: 'DRadio' })[1];
    const input2 = wrapper.findAll('input')[1];

    await input2.trigger('change');
    expect(radio2.classes()).not.toContain('active');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
