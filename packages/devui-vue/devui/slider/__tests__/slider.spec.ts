import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DSlider from '../src/slider';

describe('d-slider', () => {
  it('slider maxValue && minValue work', () => {
    const wrapper = mount(DSlider, {
      props: {
        max: 50,
        min: 2
      }
    });
    const max = wrapper.find('.devui-max_count');
    const min = wrapper.find('.devui-min_count');
    expect(min.text()).toBe('2');
    expect(max.text()).toBe('50');
  });
  it('slider v-model work', async () => {
    const value = ref(5);
    const wrapper = mount({
      components: { DSlider },
      template: `
        <d-slider v-model:modelValue="modelValue" showInput />
      `,
      setup() {
        return {
          modelValue: value
        };
      }
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('5');
    input.setValue(10);
    await nextTick();
    expect(value.value).toBe(10);
  });
  it('slider showInput work', () => {
    const wrapper = mount(DSlider, {
      props: {
        showInput: true
      }
    });
    const dInput = wrapper.find('.devui-input__out-wrap');
    expect(dInput.exists()).toBeTruthy();
  });

  it('slider disabled work', () => {
    const wrapper = mount(DSlider, {
      props: {
        disabled: true,
        showInput: true
      }
    });
    const slider = wrapper.find('.devui-slider__runway');
    const input = wrapper.find('input');
    expect(slider.classes()).toContain('disabled');
    expect(input.attributes('disabled')).toBe('');
  });

  it('slider tipsRenderer work', () => {
    const wrapper = mount(DSlider, {
      props: {
        tipsRenderer: 'null'
      }
    });
    const slider = wrapper.find('.devui-slider_popover');
    expect(slider.exists()).toBe(false);
  });

  it('slider popover work', () => {
    const wrapper = mount(DSlider, {
      props: {
        tipsRenderer: 'bananas',
        modelValue: 10
      }
    });
    const slider = wrapper.find('.devui-slider_popover-content');
    expect(slider.text()).toBe('10 bananas');
  });

  it('slider color work', () => {
    const wrapper = mount(DSlider, {
      props: {
        color: 'red'
      }
    });
    expect(wrapper.find('.devui-slider__bar').attributes('style').includes('background-color: red')).toBeTruthy();
    expect(wrapper.find('.devui-slider__button').attributes('style').includes('border-color: red')).toBeTruthy();
  });
});
