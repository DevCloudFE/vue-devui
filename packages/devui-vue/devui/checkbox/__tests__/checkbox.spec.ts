import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DCheckbox from '../src/checkbox';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('checkbox', true);
const baseClass = ns.b();
const noAnimationClass = ns.m('no-animation');
const defaultBgClass = ns.e('default-background');
const borderClass = ns.m('bordered');
const sizeLgClass = ns.m('lg');

describe('checkbox', () => {
  it('checkbox render work', async () => {
    const checked = ref(true);
    const wrapper = mount({
      components: { DCheckbox },
      template: `<d-checkbox v-model:checked="checked" value="a">1024</d-checkbox>`,
      setup() {
        return {
          checked,
        };
      },
    });
    const container = wrapper.find(baseClass);

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
        label: '1314',
      },
    });

    expect(wrapper.text()).toEqual('1314');
    const label = wrapper.find('label');
    expect(label.attributes('title')).toEqual('1314');

    await wrapper.setProps({
      title: '520',
      label: '1314',
    });
    expect(label.attributes('title')).toEqual('520');

    await wrapper.setProps({
      isShowTitle: false,
    });
    expect(label.attributes('title')).toEqual('');
  });

  it('checkbox showAnimation work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: 'a',
      },
    });

    expect(wrapper.findAll(noAnimationClass).length).toBe(0);

    await wrapper.setProps({
      showAnimation: false,
    });
    expect(wrapper.findAll(noAnimationClass).length).toBe(2);
  });

  it('checkbox disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DCheckbox, {
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
  });

  it('checkbox halfchecked work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: '555',
        halfChecked: false,
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.classes()).not.toContain('half-checked');
    expect(container.find(defaultBgClass).exists()).toBe(true);

    await wrapper.setProps({
      halfChecked: true,
    });
    expect(container.classes()).toContain('half-checked');
    expect(container.find(defaultBgClass).exists()).toBe(false);
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
  });

  it('checkbox border work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: 'data1',
        border: false,
      },
    });

    expect(wrapper.find(borderClass).exists()).toBe(false);

    await wrapper.setProps({
      border: true,
    });
    expect(wrapper.find(borderClass).exists()).toBe(true);
  });

  it('checkbox size work', async () => {
    const wrapper = mount(DCheckbox, {
      props: {
        value: 'data1',
        size: 'lg',
        border: false,
      },
    });

    expect(wrapper.find(sizeLgClass).exists()).toBe(false);

    await wrapper.setProps({
      border: true,
    });
    expect(wrapper.find(sizeLgClass).exists()).toBe(true);
  });
});
