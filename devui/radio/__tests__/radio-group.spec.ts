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
        <d-radio-group v-model:value="radioVal" @change="onChange">
          <d-radio value="ab">AB</d-radio>
          <d-radio value="cd">CD</d-radio>
        </d-radio-group>
      `,
      setup () {
        const radioVal = ref('ab');
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
        value: 'AA'
      }
    });
    expect(wrapper.html()).not.toMatch('devui-radio-horizontal');

    await wrapper.setProps({
      value: 'AA',
      cssStyle: 'row'
    });
    expect(wrapper.html()).toMatch('devui-radio-horizontal');
  });

  it('radioGroup beforeChange work', async () => {
    const beforeChange = jest.fn(v => v !== 'bb');
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio
      },
      template: `
        <d-radio-group v-model:value="radioVal" @change="onChange" :before-change="beforeChange">
          <d-radio value="aa">AA</d-radio>
          <d-radio value="bb">BB</d-radio>
          <d-radio value="cc">CC</d-radio>
        </d-radio-group>
      `,
      setup () {
        const radioVal = ref('aa');
        return {
          radioVal,
          onChange,
          beforeChange
        };
      }
    });

    const [radioA, radioB, radioC] = wrapper.findAllComponents({ name: 'DRadio' });
    expect(radioA.classes()).toContain('active');

    await radioB.find('input').trigger('change');
    expect(radioA.classes()).toContain('active');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReset();
    await radioC.find('input').trigger('change');
    expect(radioA.classes()).not.toContain('active');
    expect(radioC.classes()).toContain('active');
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
        <d-radio-group v-model:value="radioVal" @change="onChange">
          <d-radio value="ee">EE</d-radio>
          <d-radio value="ff" :disabled="true">FF</d-radio>
        </d-radio-group>
      `,
      setup () {
        const radioVal = ref('ee');
        return {
          radioVal,
          onChange
        };
      }
    });

    const radioF = wrapper.findAllComponents({ name: 'DRadio' })[1];
    const inputF = wrapper.findAll('input')[1];

    await inputF.trigger('change');
    expect(radioF.classes()).not.toContain('active');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
