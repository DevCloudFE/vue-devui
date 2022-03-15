import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DCheckbox from '../src/checkbox';

describe('checkbox', () => {
  it('checkbox render work', async () => {
    const checked = ref(true);
    const wrapper = mount({
      components: { DCheckbox },
      template: `<d-checkbox v-model:checked="checked" value="a">1024</d-checkbox>`,
      setup () {
        return {
          checked
        };
      }
    });
    const container = wrapper.find('.devui-checkbox');

    expect(wrapper.text()).toEqual('1024');
    expect(container.exists()).toBeTruthy();
    expect(container.classes()).toContain('active');

    checked.value = false;
    await nextTick();

    expect(container.classes()).not.toContain('active');
    expect(container.classes()).toContain('unchecked');
  });

  it('checkbox title work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: 'a',
        label: '1314'
      }
    });

    expect(wrapper.text()).toEqual('1314');
    const label = wrapper.find('label');
    expect(label.attributes('title')).toEqual('1314');

    await wrapper.setProps({
      title: '520',
      label: '1314'
    });
    expect(label.attributes('title')).toEqual('520');

    await wrapper.setProps({
      isShowTitle: false
    });
    expect(label.attributes('title')).toEqual('');
  });

  it('checkbox showAnimation work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: 'a'
      }
    });

    expect(wrapper.findAll('.devui-no-animation').length).toBe(0);

    await wrapper.setProps({
      showAnimation: false
    });
    expect(wrapper.findAll('.devui-no-animation').length).toBe(2);
  });

  it('checkbox disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DCheckbox, {
      props: {
        value: 'a',
        disabled: true,
        onChange
      }
    });
    const label = wrapper.find('label');

    await label.trigger('click');
    expect(wrapper.find('.devui-checkbox').classes()).toContain('disabled');
    expect(onChange).toBeCalledTimes(0);

    await wrapper.setProps({
      disabled: false
    });
    await label.trigger('click');
    expect(wrapper.find('.devui-checkbox').classes()).not.toContain('disabled');
    expect(onChange).toBeCalledTimes(1);
  });

  it('checkbox halfchecked work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: '555',
        halfchecked: false
      }
    });

    const container = wrapper.find('.devui-checkbox');
    expect(container.classes()).not.toContain('halfchecked');
    expect(container.find('.devui-checkbox-default-background').exists()).toBe(true);

    await wrapper.setProps({
      halfchecked: true
    });
    expect(container.classes()).toContain('halfchecked');
    expect(container.find('.devui-checkbox-default-background').exists()).toBe(false);
  });

  it('checkbox beforeChange work', async () => {
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const checked = ref(false);
    const wrapper = mount({
      components: { DCheckbox },
      template: `
        <d-checkbox
          v-model:checked="checked"
          value="666"
          @change="onChange"
          :before-change="beforeChange">
          666
        </d-checkbox>`,
      setup () {
        return {
          beforeChange,
          onChange,
          checked
        };
      }
    });

    const label = wrapper.find('label');
    await label.trigger('click');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);
    expect(checked.value).toBe(false);

    beforeChange.mockReturnValue(true);
    await label.trigger('click');
    expect(beforeChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledTimes(1);
    expect(checked.value).toBe(true);
  });
});
