import { mount } from '@vue/test-utils';
import { reactive, ref, nextTick, h } from 'vue';
import DCheckboxGroup from '../src/checkbox-group';
import DCheckbox from '../src/checkbox';

describe('d-checkbox-group', () => {
  it('checkbox-group render work', async () => {
    const wrapper = mount(DCheckboxGroup, {
      props: {
        modelValue: ['b']
      },
      slots: {
        default: [
          h(DCheckbox, { value: 'a' }),
          h(DCheckbox, { value: 'b' })
        ]
      }
    });

    expect(wrapper.findAll('.devui-checkbox').length).toBe(2);

    const [box1, box2] = wrapper.findAll('.devui-checkbox');

    expect(wrapper.classes()).toContain('devui-checkbox-group');
    expect(box1.classes()).toContain('unchecked');
    expect(box2.classes()).toContain('active');

    await wrapper.setProps({ modelValue: ['a'] });
    await nextTick();
    expect(box1.classes()).toContain('active');
    expect(box2.classes()).toContain('unchecked');
  });

  it('checkbox-group disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DCheckboxGroup, {
      props: {
        modelValue: ['b'],
        disabled: true,
        onChange 
      },
      slots: {
        default: [
          h(DCheckbox, { value: 'a' }, { defaule: () => "I am devui." }),
          h(DCheckbox, { value: 'b' }, { defaule: () => "yes, it is." })
        ]
      }
    });
    
    const label1 = wrapper.find('label');
    await label1.trigger('click');
    expect(onChange).toBeCalledTimes(0);
    expect(wrapper.findAll('.devui-checkbox').every(el => el.classes().includes('disabled'))).toBe(true);

    await wrapper.setProps({ disabled: false });
    await label1.trigger('click');
    expect(onChange).toBeCalledTimes(1);
    expect(wrapper.findAll('.devui-checkbox').some(el => el.classes().includes('disabled'))).toBe(false);
  });

  it('checkbox-group direction work', async () => {
    const wrapper = mount(DCheckboxGroup, {
      props: {
        modelValue: ['b'],
        direction: 'column',
      },
      slots: {
        default: [
          h(DCheckbox, { value: 'a' }, { defaule: () => "I am devui." }),
          h(DCheckbox, { value: 'b' }, { defaule: () => "yes, it is." })
        ]
      }
    });

    expect(wrapper.findAll('.devui-checkbox__column-margin').length).toBe(2);
    expect(wrapper.find('.devui-checkbox-list-inline').exists()).toBe(false);

    await wrapper.setProps({ direction: 'row' });
    expect(wrapper.find('.devui-checkbox-list-inline').exists()).toBe(true);
  });

  it('checkbox-group itemWidth work', () => {
    const wrapper = mount(DCheckboxGroup, {
      props: {
        modelValue: ['b'],
        itemWidth: 100,
      },
      slots: {
        default: [
          h(DCheckbox, { value: 'a' }, { defaule: () => "I am devui." }),
          h(DCheckbox, { value: 'b' }, { defaule: () => "yes, it is." })
        ]
      }
    });

    expect(wrapper.findAll('.devui-checkbox__tick-wrap').length).toBe(2);
  });

  it('checkbox-group options work', () => {
    const wrapper = mount(DCheckboxGroup, {
      props: {
        options: [
          {
            value: 'a'
          }, {
            value: 'b'
          }
        ],
        modelValue: ['b']
      }
    })
    const boxList = wrapper.findAll('.devui-checkbox');

    expect(boxList.length).toBe(2);
    expect(boxList[0].classes()).toContain('unchecked');
    expect(boxList[1].classes()).toContain('active');
  });

  it('checkbox-group beforeChange work', async () => {
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const wrapper = mount(DCheckboxGroup, {
      props: {
        modelValue: ['b'],
        onChange,
        beforeChange
      },
      slots: {
        default: [
          h(DCheckbox, { value: 'a' }, { default: () => 'I am devui' }),
          h(DCheckbox, { value: 'b' }, { default: () => 'Yes, it is.' })
        ]
      }
    });

    const box1 = wrapper.find('label');
    await box1.trigger('click');
    expect(beforeChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReturnValue(true);

    await box1.trigger('click');
    expect(beforeChange).toHaveBeenCalledTimes(2);
    expect(onChange).toBeCalledTimes(1);
  });
});
