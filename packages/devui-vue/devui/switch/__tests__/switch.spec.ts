import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DSwitch from '../src/switch';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('switch', true);
const notDotNs = useNamespace('switch', false);

const baseClass = notDotNs.b();
const containerClass = ns.e('wrapper');
const disabledClass = notDotNs.m('disabled');
const checkedClass = notDotNs.m('checked');
const smSizeClass = notDotNs.m('sm');
const lgSizeClass = notDotNs.m('lg');

describe('d-switch', () => {
  it('switch render work', async () => {
    const checked = ref(false);
    const wrapper = mount({
      components: { DSwitch },
      template: `
        <d-switch v-model="checked"></d-switch>
      `,
      setup() {
        return {
          checked,
        };
      },
    });

    expect(wrapper.classes()).toContain(baseClass);
    const container = wrapper.find(containerClass);
    expect(container.exists()).toBeTruthy();
    expect(container.classes()).not.toContain(checkedClass);

    checked.value = true;
    await nextTick();

    expect(container.classes()).toContain(checkedClass);

    wrapper.unmount();
  });

  it('switch disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DSwitch, {
      props: {
        disabled: true,
        onChange,
      },
    });

    const container = wrapper.find(containerClass);
    expect(container.classes()).toContain(disabledClass);

    await container.trigger('click');
    expect(onChange).toBeCalledTimes(0);

    await wrapper.setProps({
      disabled: false,
    });
    await container.trigger('click');

    expect(container.classes()).not.toContain(disabledClass);
    expect(onChange).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('switch size work', async () => {
    const wrapper = mount(DSwitch, {
      props: {
        size: 'sm',
      },
    });

    expect(wrapper.classes()).toContain(smSizeClass);

    await wrapper.setProps({
      size: 'lg',
    });
    expect(wrapper.classes()).not.toContain(smSizeClass);
    expect(wrapper.classes()).toContain(lgSizeClass);

    wrapper.unmount();
  });

  it('switch beforeChange work', async () => {
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const wrapper = mount(DSwitch, {
      props: {
        beforeChange,
        onChange,
      },
    });

    const container = wrapper.find(containerClass);
    await container.trigger('click');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReturnValue(true);
    await container.trigger('click');
    expect(beforeChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('switch slot work', async () => {
    const isChecked = ref(false);
    const wrapper = mount({
      components: { DSwitch },
      template: `
        <d-switch v-model="isChecked">
        <template v-slot:checkedContent>开</template>
        <template v-slot:uncheckedContent>关</template>
        </d-switch>
      `,
      setup() {
        return {
          isChecked,
        };
      },
    });

    expect(wrapper.text()).toBe('关');

    isChecked.value = true;
    await nextTick();

    expect(wrapper.text()).toBe('开');

    wrapper.unmount();
  });

  it('switch active-value inactive-value work', async () => {
    const checked = ref('打开');
    const wrapper = mount({
      components: { DSwitch },
      template: `
        <d-switch v-model="checked" active-value="打开" inactive-value="关闭"></d-switch>
      `,
      setup() {
        return {
          checked,
        };
      },
    });

    const container = wrapper.find(containerClass);
    expect(container.classes()).toContain(checkedClass);

    checked.value = '关闭';
    await nextTick();

    expect(container.classes()).not.toContain(checkedClass);

    wrapper.unmount();
  });

  it('switch color work', async () => {
    const checked = ref(false);
    const wrapper = mount({
      components: { DSwitch },
      template: `
        <d-switch v-model="checked" color="pink"></d-switch>
      `,
      setup() {
        return {
          checked,
        };
      },
    });

    expect(wrapper.classes()).toContain(baseClass);
    const container = wrapper.find(containerClass);

    const getContainerStyle = (key: string) => {
      return container.wrapperElement.__vnode.el.style.getPropertyValue(key);
    };

    expect(container.classes()).not.toContain(checkedClass);
    expect(getContainerStyle('background')).not.toBe('pink');
    expect(getContainerStyle('border-color')).not.toBe('pink');

    checked.value = true;

    await nextTick();

    expect(getContainerStyle('background')).toBe('pink');
    expect(getContainerStyle('border-color')).toBe('pink');

    await wrapper.setProps({
      color: 'green',
    });
    expect(getContainerStyle('background')).toBe('green');
    expect(getContainerStyle('border-color')).toBe('green');

    wrapper.unmount();
  });
});
