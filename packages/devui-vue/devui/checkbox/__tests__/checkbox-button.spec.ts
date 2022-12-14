import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DCheckboxButton from '../src/checkbox-button';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('checkbox-button', true);
const baseClass = ns.b();
const sizeLgClass = ns.m('lg');

describe('checkbox-button', () => {
  it('checkbox-button render work', async () => {
    const checked = ref(true);
    const wrapper = mount({
      components: { DCheckboxButton },
      template: `<d-checkbox-button v-model="checked" value="a">button</d-checkbox-button>`,
      setup() {
        return {
          checked,
        };
      },
    });
    const container = wrapper.find(baseClass);

    expect(wrapper.text()).toEqual('button');
    expect(container.exists()).toBeTruthy();
    expect(container.classes()).toContain('active');

    checked.value = false;
    await nextTick();

    expect(container.classes()).not.toContain('active');
    expect(container.classes()).toContain('unchecked');

    wrapper.unmount();
  });

  it('checkbox-button title work', async () => {
    const wrapper = mount(DCheckboxButton, {
      props: {
        value: 'a',
        label: 'title',
      },
    });

    expect(wrapper.text()).toEqual('title');
    const label = wrapper.find('label');
    expect(label.attributes('title')).toEqual('title');

    await wrapper.setProps({
      title: 'titleChange',
      label: '1314',
    });
    expect(label.attributes('title')).toEqual('titleChange');

    await wrapper.setProps({
      isShowTitle: false,
    });
    expect(label.attributes('title')).toEqual('');

    wrapper.unmount();
  });

  it('checkbox-button disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DCheckboxButton, {
      props: {
        value: 'a',
        disabled: true,
        onChange,
      },
    });
    const label = wrapper.find('label');

    await label.trigger('click');
    expect(wrapper.find(baseClass).classes()).toContain('disabled');
    expect(onChange).toBeCalledTimes(0);

    await wrapper.setProps({
      disabled: false,
    });
    await label.trigger('click');
    expect(wrapper.find(baseClass).classes()).not.toContain('disabled');
    expect(onChange).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('checkbox-button beforeChange work', async () => {
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const checked = ref(false);
    const wrapper = mount({
      components: { DCheckboxButton },
      template: `
        <d-checkbox-button
          v-model="checked"
          value="测试"
          @change="onChange"
          :before-change="beforeChange">
          测试
        </d-checkbox-button>`,
      setup() {
        return {
          beforeChange,
          onChange,
          checked,
        };
      },
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

    wrapper.unmount();
  });

  it('checkbox-button size work', async () => {
    const wrapper = mount(DCheckboxButton, {
      props: {
        value: 'data1',
        size: 'lg',
      },
    });

    expect(wrapper.find(sizeLgClass).exists()).toBe(true);

    wrapper.unmount();
  });
});
