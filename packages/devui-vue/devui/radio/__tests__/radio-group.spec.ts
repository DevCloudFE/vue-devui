import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';
import DRadioButton from '../src/radio-button';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('radio-group', false);
const baseClass = ns.b();

const radioNs = useNamespace('radio', true);
const radioBaseClass = radioNs.b();

const radioNoDotNs = useNamespace('radio', false);
const sizeNs = radioNoDotNs.m('lg');
const borderNs = radioNoDotNs.m('bordered');

const buttonNs = useNamespace('radio-button', true);
const buttonBaseClass = buttonNs.b();

describe('RadioGroup', () => {
  it('radioGroup render work', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio,
      },
      template: `
        <d-radio-group v-model="radioVal" @change="onChange">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2">Item2</d-radio>
        </d-radio-group>
      `,
      setup() {
        const radioVal = ref('Item1');
        return {
          radioVal,
          onChange,
        };
      },
    });

    const radioA = wrapper.findAllComponents({ name: 'DRadio' })[0].find(radioBaseClass);
    const radioB = wrapper.findAllComponents({ name: 'DRadio' })[1].find(radioBaseClass);
    const inputB = wrapper.findAll('input')[1];

    expect(wrapper.classes()).toContain(baseClass);
    expect(radioA.classes()).toContain('active');
    expect(radioB.classes()).not.toContain('active');

    await inputB.trigger('change');

    expect(radioA.classes()).not.toContain('active');
    expect(radioB.classes()).toContain('active');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('radioGroup direction work', async () => {
    const wrapper = mount(DRadioGroup, {
      props: {
        value: 'Item1',
      },
    });
    expect(wrapper.html()).not.toMatch('is-row');

    await wrapper.setProps({
      value: 'Item1',
      direction: 'row',
    });
    expect(wrapper.html()).toMatch('is-row');
  });

  it('radioGroup beforeChange work', async () => {
    const beforeChange = jest.fn((v) => v !== 'Item2');
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio,
      },
      template: `
        <d-radio-group v-model="radioVal" @change="onChange" :before-change="beforeChange">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2">Item2</d-radio>
          <d-radio value="Item3">Item3</d-radio>
        </d-radio-group>
      `,
      setup() {
        const radioVal = ref('Item1');
        return {
          radioVal,
          onChange,
          beforeChange,
        };
      },
    });

    const [radio1, radio2, radio3] = wrapper.findAllComponents({ name: 'DRadio' });
    const radio1Wrapper = radio1.find(radioBaseClass);
    const radio3Wrapper = radio3.find(radioBaseClass);
    expect(radio1Wrapper.classes()).toContain('active');

    await radio2.find('input').trigger('change');
    expect(radio1Wrapper.classes()).toContain('active');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReset();
    await radio3.find('input').trigger('change');
    expect(radio1Wrapper.classes()).not.toContain('active');
    expect(radio3Wrapper.classes()).toContain('active');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(1);
  });

  it('radioGroup disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio,
      },
      template: `
        <d-radio-group v-model="radioVal" @change="onChange">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2" disabled>Item2</d-radio>
        </d-radio-group>
      `,
      setup() {
        const radioVal = ref('Item1');
        return {
          radioVal,
          onChange,
        };
      },
    });

    const radio2 = wrapper.findAllComponents({ name: 'DRadio' })[1];
    const input2 = wrapper.findAll('input')[1];

    await input2.trigger('change');
    expect(radio2.classes()).not.toContain('active');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('radioGroup size border work', async () => {
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadio,
      },
      template: `
        <d-radio-group v-model="radioVal" size="lg" :border="border">
          <d-radio value="Item1">Item1</d-radio>
          <d-radio value="Item2" disabled>Item2</d-radio>
        </d-radio-group>
      `,
      setup() {
        const radioVal = ref('Item1');
        const border = ref(false);
        return {
          radioVal,
          border,
        };
      },
    });

    const radio1 = wrapper.findAllComponents({ name: 'DRadio' })[0];
    const radio1Wrapper = radio1.find(radioBaseClass);
    expect(radio1Wrapper.classes()).toContain(sizeNs);
    await wrapper.setProps({
      border: true,
    });
    expect(radio1Wrapper.classes()).toContain(sizeNs);
    expect(radio1Wrapper.classes()).toContain(borderNs);
  });

  it('radio-button fill text-color', async () => {
    const choose = ref('a');
    const wrapper = mount({
      components: {
        DRadioGroup,
        DRadioButton,
      },
      template: `
        <d-radio-group v-model="choose" fill="red" text-color="rgb(204,204,204)">
          <d-radio-button value="a">1</d-radio-button>
          <d-radio-button value="b">2</d-radio-button>
        </d-radio-group>
      `,
      setup() {
        return {
          choose,
        };
      },
    });

    const content = wrapper.find(buttonBaseClass);
    expect(content.attributes().style).toBe('border-color: red; background-color: red; color: rgb(204, 204, 204);');
  });
});
