import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DSwitch from '../src/switch';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('switch', false);
const baseClass = ns.b();
const disabledClass = ns.m('disabled');
const checkedClass = ns.m('checked');
const smSizeClass = ns.m('sm');
const lgSizeClass = ns.m('lg');

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
    expect(wrapper.classes()).not.toContain(checkedClass);

    checked.value = true;
    await nextTick();

    expect(wrapper.classes()).toContain(checkedClass);
  });

  it('switch disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DSwitch, {
      props: {
        disabled: true,
        onChange,
      },
    });

    expect(wrapper.classes()).toContain(disabledClass);

    await wrapper.trigger('click');
    expect(onChange).toBeCalledTimes(0);

    await wrapper.setProps({
      disabled: false,
    });
    await wrapper.trigger('click');

    expect(wrapper.classes()).not.toContain(disabledClass);
    expect(onChange).toBeCalledTimes(1);
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

    await wrapper.trigger('click');
    expect(beforeChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(0);

    beforeChange.mockReturnValue(true);
    await wrapper.trigger('click');
    expect(beforeChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledTimes(1);
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

    expect(wrapper.classes()).toContain(baseClass);
    expect(wrapper.classes()).toContain(checkedClass);

    checked.value = '关闭';
    await nextTick();

    expect(wrapper.classes()).not.toContain(checkedClass);
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
    expect(wrapper.classes()).not.toContain(checkedClass);
    expect(wrapper.vm.$el.style.getPropertyValue('background-color')).not.toBe('pink');
    expect(wrapper.vm.$el.style.getPropertyValue('border-color')).not.toBe('pink');

    checked.value = true;

    await nextTick();

    expect(wrapper.vm.$el.style.getPropertyValue('background-color')).toBe('pink');
    expect(wrapper.vm.$el.style.getPropertyValue('border-color')).toBe('pink');

    await wrapper.setProps({
      color: 'green',
    });
    expect(wrapper.vm.$el.style.getPropertyValue('background-color')).toBe('green');
    expect(wrapper.vm.$el.style.getPropertyValue('border-color')).toBe('green');
  });
});
