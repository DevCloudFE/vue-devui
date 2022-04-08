import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import DSwitch from '../src/switch';

describe('d-switch', () => {
  it('switch render work', async () => {
    const checked = ref(false);
    const wrapper = mount({
      components: { DSwitch },
      template: `
        <d-switch v-model:checked="checked"></d-switch>
      `,
      setup () {
        return {
          checked
        };
      }
    });

    expect(wrapper.classes()).toContain('devui-switch');
    expect(wrapper.classes()).not.toContain('devui-checked');

    checked.value = true;
    await nextTick();

    expect(wrapper.classes()).toContain('devui-checked');
  });

  it('switch disabled work', async () => {
    const onChange = jest.fn();
    const wrapper = mount(DSwitch, {
      props: {
        disabled: true,
        onChange
      }
    });

    expect(wrapper.classes()).toContain('devui-disabled');

    await wrapper.trigger('click');
    expect(onChange).toBeCalledTimes(0);

    await wrapper.setProps({
      disabled: false
    });
    await wrapper.trigger('click');

    expect(wrapper.classes()).not.toContain('devui-disabled');
    expect(onChange).toBeCalledTimes(1);
  });

  it('switch size work', async () => {
    const wrapper = mount(DSwitch, {
      props: {
        size: 'sm'
      }
    });

    expect(wrapper.classes()).toContain('devui-switch-sm');

    await wrapper.setProps({
      size: 'lg'
    });
    expect(wrapper.classes()).not.toContain('devui-switch-sm');
    expect(wrapper.classes()).toContain('devui-switch-lg');
  });

  it('switch beforeChange work', async () => {
    const beforeChange = jest.fn(() => false);
    const onChange = jest.fn();
    const wrapper = mount(DSwitch, {
      props: {
        beforeChange,
        onChange
      }
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
        <d-switch :checked="isChecked">
          <template v-slot:checkedContent>开</template>
          <template v-slot:uncheckedContent>关</template>
        </d-switch>
      `,
      setup () {
        return {
          isChecked
        };
      }
    });

    expect(wrapper.text()).toBe('关');

    isChecked.value = true;
    await nextTick();

    expect(wrapper.text()).toBe('开');
  });
});
